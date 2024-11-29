"use client"

import { useState, useEffect } from "react"
import { Calculator } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

export default function FoodPointsCalcnulator() {
    const [selectedPlan, setSelectedPlan] = useState<keyof typeof PLANS | "">("")
    const [currentBalance, setCurrentBalance] = useState("")
    const [result, setResult] = useState({
      difference: 0,
      dailyTarget: 0,
      hundredTarget: 0,
      twoWeekTarget: 0,
      isAhead: false,
      isAheadByHundred: false,
    })
  
    const calculatePoints = () => {
      if (!selectedPlan || !currentBalance) return
  
      const today = new Date()
      
      // Find expected balance for current date (using a simple linear calculation for demo)
      const daysFromStart = Math.floor((today.getTime() - new Date('2024-08-26').getTime()) / (1000 * 60 * 60 * 24))
      const expectedBalance = Math.max((PLANS[selectedPlan].total - (PLANS[selectedPlan].daily * daysFromStart)), 0)
      
      const actualBalance = parseFloat(currentBalance)
      const difference = actualBalance - expectedBalance
      const daysInTwoWeeks = 14
      const twoWeekEnd = (expectedBalance - (PLANS[selectedPlan].daily * daysInTwoWeeks))
      const twoWeekTarget = (actualBalance - twoWeekEnd) / 14

      setResult({
        difference: Math.abs(difference),
        dailyTarget: Math.abs(difference) / 7,
        hundredTarget: Math.abs(difference) / 14,
        twoWeekTarget: Math.max(0, twoWeekTarget),
        isAhead: difference > 0,
        isAheadByHundred: difference > 100,
      })
    }
  447.88
    useEffect(() => {
      calculatePoints()
    }, [selectedPlan, currentBalance])

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-b from-sky-50 to-white">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <Calculator className="w-6 h-6 text-sky-600" />
          <CardTitle className="text-2xl font-bold text-sky-600">Food Points Calculator</CardTitle>
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

        {selectedPlan && currentBalance && (
          <div className="mt-6 p-4 rounded-lg bg-sky-100 space-y-2">
            <p className="font-medium text-sky-900">
              You are {result.isAhead ? "ahead" : "behind"} by:{" "}
              <span className="font-bold">${result.difference.toFixed(2)}</span>
            </p>
            {result.isAhead ? (
                result.isAheadByHundred ? (
                    <p className="text-sky-800">
                    You can spend extra per day for the next two weeks:
                  </p>
                ) : (
                <p className="text-sky-800">
                    You can spend extra per day for the next week:
                </p>
                )
            ) : (
              <p className="text-sky-800">
                You can only spend this amount per day for the next 2 weeks to catch up:
              </p>
            )}
            <p className="text-2xl font-bold text-sky-600">
              ${result.isAhead ? (result.isAheadByHundred ? result.hundredTarget.toFixed(2) : result.dailyTarget.toFixed(2)) : result.twoWeekTarget.toFixed(2)}/day
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

