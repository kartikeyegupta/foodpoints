"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Weekly data points for each plan - Fall 2025 semester
const WEEKLY_DATA = {
  "Plan A": [3071.28, 2879.33, 2687.37, 2495.42, 2303.46, 2111.51, 1919.55, 1727.60, 1535.64, 1343.69, 1151.73, 959.78, 767.82, 575.87, 383.91, 191.96, 0.00],
  "Plan B": [3680.80, 3450.75, 3220.70, 2990.65, 2760.60, 2530.55, 2300.50, 2070.45, 1840.40, 1610.35, 1380.30, 1150.25, 920.20, 690.15, 460.10, 230.05, 0.00],
  "Plan C": [4075.33, 3820.62, 3565.91, 3311.21, 3056.50, 2801.79, 2547.08, 2292.37, 2037.67, 1782.96, 1528.25, 1273.54, 1018.83, 764.12, 509.42, 254.71, 0.00],
  "Plan D": [4373.10, 4099.78, 3826.46, 3553.14, 3279.82, 3006.51, 2733.19, 2459.87, 2186.55, 1913.23, 1639.91, 1366.59, 1093.27, 819.95, 546.64, 273.32, 0.00],
  "Plan E": [4770.85, 4472.67, 4174.49, 3876.32, 3578.14, 3279.96, 2981.78, 2683.60, 2385.43, 2087.25, 1789.07, 1490.89, 1192.71, 894.53, 596.36, 298.18, 0.00],
  "Plan F": [1006.20, 943.31, 880.43, 817.54, 754.65, 691.76, 628.87, 565.98, 503.10, 440.21, 377.32, 314.44, 251.55, 188.66, 125.78, 62.89, 0.00],
  "Plan I": [1057.80, 991.69, 925.58, 859.47, 793.36, 727.25, 661.14, 595.03, 528.92, 462.81, 396.70, 330.59, 264.48, 198.37, 132.23, 66.11, 0.00],
  "Plan J": [2172.58, 2036.79, 1901.01, 1765.22, 1629.43, 1493.64, 1357.85, 1222.06, 1086.29, 950.50, 814.71, 678.93, 543.14, 407.35, 271.57, 135.79, 0.00],
}


const WEEKS = [
  "Aug 25", "Sep 1", "Sep 8", "Sep 15", "Sep 22", "Sep 29",
  "Oct 6", "Oct 13", "Oct 20", "Oct 27",
  "Nov 3", "Nov 10", "Nov 17", "Nov 24",
  "Dec 1", "Dec 8", "Dec 15"
]

interface PointsChartProps {
  selectedPlan: keyof typeof WEEKLY_DATA | ""
}

export function PointsChart({ selectedPlan }: PointsChartProps) {
  if (!selectedPlan) return null

  const getCurrentWeekIndex = () => {
    const today = new Date()
    const startDate = new Date('2025-08-25')  // Fall semester start
    const weeksPassed = Math.floor((today.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000))
    return Math.min(Math.max(0, weeksPassed), WEEKS.length - 1)
  }

  const currentWeekIndex = getCurrentWeekIndex()

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-sky-600">
          {selectedPlan} Balance Progression
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Week</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {WEEKS.map((week, index) => (
                <TableRow 
                  key={week} 
                  className={index === currentWeekIndex ? "bg-sky-100 dark:bg-sky-900 font-bold" : ""}
                >
                  <TableCell className="font-medium">{week}</TableCell>
                  <TableCell>${WEEKLY_DATA[selectedPlan][index].toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}