"use client"

import { useState, useEffect } from "react"
import { Calculator } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PointsChart } from '@/components/ui/points_chart'

const PLANS = {
  "Plan A": { total: 3071.28, daily: 27.42 },
  "Plan B": { total: 3680.80, daily: 32.86 },
  "Plan C": { total: 4075.33, daily: 36.39 },
  "Plan D": { total: 4373.10, daily: 39.05 },
  "Plan E": { total: 4770.85, daily: 42.60 },
  "Plan F": { total: 1006.20, daily: 12.58 },
  "Plan I": { total: 1057.80, daily: 13.22 },
  "Plan J": { total: 2172.58, daily: 19.40 },
}

export default function FoodPointsCalculator() {
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof PLANS | "">("")
  const [currentBalance, setCurrentBalance] = useState("")
  const [leavingDate, setLeavingDate] = useState("2025-12-15")
  const [result, setResult] = useState({
    difference: 0,
    dailyTarget: 0,
    hundredTarget: 0,
    twoWeekTarget: 0,
    untilLeaveTarget: 0,
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
    const startDate = new Date('2025-08-25')  // Fall semester start
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

    // Calculate the "until you leave" option
    const untilLeaveTarget = (actualBalance / remainingDays)

    setResult({
      difference: Math.abs(difference),
      dailyTarget: Math.abs(difference) / spendingDays + realDaily,
      hundredTarget: Math.abs(difference) / spendingDays + realDaily,
      twoWeekTarget: dailySpend,
      untilLeaveTarget: untilLeaveTarget,
      isAhead: difference > 0,
      isAheadByHundred: difference > 100,
      remainingDays: remainingDays,
      daysInTwoWeeks: spendingDays,
      daysInAWeek: Math.min(7, remainingDays),
      realDaily: realDaily,
    })
  }

  useEffect(() => {
    calculatePoints()
  }, [selectedPlan, currentBalance, leavingDate])

  let message;
  if (result.isAhead) {
    const weeks = Math.floor(result.daysInTwoWeeks/7);
    message = `You can spend this amount per day for the next ${weeks} weeks:`;
  } else {
    message = `You need to spend this amount per day for the next ${Math.floor(result.daysInTwoWeeks/7)} weeks to catch up:`;
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto p-4 bg-blue-600 text-white font-bold rounded-lg mb-4 text-center">
        Updated for Fall 25 😄 - Tiki (09/29/2025)
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
            <Label htmlFor="leavingDate">Date Leaving Duke (12/15 by default)</Label>
            <Input
              id="leavingDate"
              type="date"
              placeholder="12/15/2025"
              value={leavingDate}
              onChange={(e) => setLeavingDate(e.target.value)}
              min="2025-08-25"
              max="2025-12-31"
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
                      ${result.twoWeekTarget.toFixed(2)}/day
                      </p>
                      <p className="text-sm text-sky-700">
                      Usual Daily Allowance: ${result.realDaily.toFixed(2)} (+${(result.twoWeekTarget - result.realDaily).toFixed(2)}/day)
                      </p>
                      <div className="mt-4 pt-2">
                        <p className="text-sky-800 text-xl font-bold">OR</p>
                        <p className="text-sky-800 mt-2">You can spend this amount per day until you leave:</p>
                        <p className="text-2xl font-bold text-sky-600">
                          ${result.untilLeaveTarget.toFixed(2)}/day
                        </p>
                        <p className="text-sm text-sky-700">
                          Usual Daily Allowance: ${result.realDaily.toFixed(2)} (+${(result.untilLeaveTarget - result.realDaily).toFixed(2)}/day)
                        </p>
                      </div>
                      <p className="text-sm text-sky-700">
                      Remaining days: {result.remainingDays}
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