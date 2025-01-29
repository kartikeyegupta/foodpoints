"use client"

import { useState, useEffect } from "react"
import { Calculator } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PointsChart } from '@/components/ui/points_chart'

const PLANS = {
  "Plan A": { total: 2953.03, daily: 26.37 },
  "Plan B": { total: 3538.90, daily: 31.60 },
  "Plan C": { total: 3918.38, daily: 34.99 },
  "Plan D": { total: 4205.40, daily: 37.55 },
  "Plan E": { total: 4587.03, daily: 40.96 },
  "Plan F": { total: 967.50, daily: 12.09 },
  "Plan I": { total: 1016.95, daily: 12.71 },
  "Plan J": { total: 2088.73, daily: 18.65 },
}

export default function FoodPointsCalculator() {
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof PLANS | "">("")
  const [currentBalance, setCurrentBalance] = useState("")
  const [leavingDate, setLeavingDate] = useState("04/28/2024")
  const [result, setResult] = useState({
    difference: 0,
    dailyTarget: 0,
    hundredTarget: 0,
    twoWeekTarget: 0,
    isAhead: false,
    isAheadByHundred: false,
    remainingDays: 0,
    daysInAWeek: 0,
    daysInTwoWeeks: 0,
    realDaily: 0,
  })

  const calculatePoints = () => {
    if (!selectedPlan || !currentBalance || !leavingDate) return
    
    const today = new Date()
    const startDate = new Date('2024-08-26')
    const endDate = new Date(leavingDate)
    const daysFromStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const remainingDays = Math.max(0, totalDays - daysFromStart)
    const realDaily = Math.max((PLANS[selectedPlan].total) / totalDays)
    const expectedBalance = Math.max((PLANS[selectedPlan].total - (realDaily * daysFromStart)), 0)
    const actualBalance = parseFloat(currentBalance)
    const difference = actualBalance - expectedBalance
    
    // Calculate optimal spending period
    let spendingDays = Math.min(14, remainingDays)
    let dailySpend = (difference / spendingDays) + realDaily
    
    // Keep extending the period by 7 days if daily spend is over $50 or under $17.50
    // and we haven't exceeded the remaining days
    while ((dailySpend > 50 || dailySpend < 17.50) && spendingDays + 7 <= remainingDays) {
      spendingDays += 7
      dailySpend = (difference / spendingDays) + realDaily
    }

    // If we've hit the remaining days limit, use that for final calculation
    if (spendingDays === remainingDays) {
      dailySpend = (difference / spendingDays) + realDaily
    }

    const daysInAWeek = Math.min(7, remainingDays)
    const daysInTwoWeeks = spendingDays // Use our calculated optimal period
    const twoWeekEnd = (expectedBalance - (realDaily * daysInTwoWeeks))
    const twoWeekTarget = (actualBalance - twoWeekEnd) / daysInTwoWeeks

    setResult({
      difference: Math.abs(difference),
      dailyTarget: Math.abs(difference) / daysInAWeek + realDaily,
      hundredTarget: Math.abs(difference) / daysInTwoWeeks + realDaily,
      twoWeekTarget: Math.max(0, twoWeekTarget),
      isAhead: difference > 0,
      isAheadByHundred: difference > 100,
      remainingDays: remainingDays,
      daysInTwoWeeks: daysInTwoWeeks,
      daysInAWeek: daysInAWeek,
      realDaily: realDaily,
    })
  }

  useEffect(() => {
    calculatePoints()
  }, [selectedPlan, currentBalance, leavingDate])

  let message;
  if (result.isAhead) {
    const weeks = Math.floor(result.daysInTwoWeeks/7);
    if (result.daysInTwoWeeks === result.remainingDays) {
      message = "You can spend this amount per day until you leave:";
    } else if (weeks === 1) {
      message = "You can spend this amount per day for the next week:";
    } else {
      message = `You can spend this amount per day for the next ${weeks} weeks:`;
    }
  } else {
    if (result.daysInTwoWeeks === result.remainingDays) {
      message = "You need to spend this amount per day until you leave to catch up:";
    } else {
      message = `You need to spend this amount per day for the next ${Math.floor(result.daysInTwoWeeks/7)} weeks to catch up:`;
    }
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto p-4 bg-blue-600 text-white font-bold rounded-lg mb-4 text-center">
        Updated for Spring 25 😄 - Tiki (01/28/2025)
      </div>
      <Card className="w-full max-w-md mx-auto bg-gradient-to-b from-sky-50 to-white">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <Calculator className="w-6 h-6 text-sky-600" />
            <CardTitle className="text-2xl font-bold text-sky-600">Duke Food Points Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate your food points balance and daily spending target
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="plan">Select Your Plan</Label>
            <Select
              value={selectedPlan}
              onValueChange={(value) => setSelectedPlan(value as keyof typeof PLANS)}
            >
              <SelectTrigger id="plan">
                <SelectValue placeholder="Choose your dining plan" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(PLANS).map((plan) => (
                  <SelectItem key={plan} value={plan}>
                    {plan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="balance">Current Balance</Label>
            <Input
              id="balance"
              type="number"
              placeholder="Enter your current balance"
              value={currentBalance}
              onChange={(e) => setCurrentBalance(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="leavingDate">Date Leaving Duke</Label>
            <Input
              id="leavingDate"
              type="date"
              placeholder="Select your leaving date (04/28 by default)"
              value={leavingDate}
              onChange={(e) => setLeavingDate(e.target.value)}
              min="2025-01-06"
              max="2025-06-01"
            />
          </div>

          {selectedPlan && currentBalance && leavingDate && (
              <>
                  <div className="mt-6 p-4 rounded-lg bg-sky-100 space-y-2">
                      <p className="font-medium text-sky-900">
                      You are {result.isAhead ? "ahead" : "behind"} by:{" "}
                      <span className="font-bold">${result.difference.toFixed(2)}</span>
                      </p>
                      <p className="text-sky-800">{message}</p>
                      <p className="text-2xl font-bold text-sky-600">
                      ${result.isAhead ? (result.isAheadByHundred ? result.hundredTarget.toFixed(2) : result.dailyTarget.toFixed(2)) : result.twoWeekTarget.toFixed(2)}/day
                      </p>
                      <p className="text-sm text-sky-700">
                      Remaining days: {result.remainingDays}
                      </p>
                      <p className="text-sm text-sky-700">
                      Usual Daily Allowance: {result.realDaily.toFixed(2)} (${result.isAhead ? (result.isAheadByHundred ? (result.hundredTarget - result.realDaily).toFixed(2) : (result.dailyTarget - result.realDaily).toFixed(2)) : (result.twoWeekTarget - result.realDaily).toFixed(2)}/day)
                      </p>
                  </div>
                  <PointsChart selectedPlan={selectedPlan} />
              </>
          )}
        </CardContent>
      </Card>
      <p className="w-full max-w-md mx-auto text-xs">  Developed by Kartikeye (Tiki) Gupta </p>
      <p className="w-full max-w-md mx-auto text-xs text-sky-800"> <a href="http://www.github.com/kartikeyegupta">GitHub</a> | <a href="mailto:kartikeye.gupta@duke.edu">Email</a> </p>
    </>
  )
}