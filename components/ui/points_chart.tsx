"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Weekly data points for each plan
const WEEKLY_DATA = {
  "Plan A": [2953.03, 2768.47, 2583.90, 2399.34, 2214.77, 2030.21, 1845.64, 1661.08, 1476.52, 1291.95, 1107.39, 922.82, 738.26, 553.69, 369.13, 184.56, 0.00],
  "Plan B": [3538.90, 3317.72, 3096.54, 2875.36, 2654.18, 2432.99, 2211.81, 1990.63, 1769.45, 1548.27, 1327.09, 1105.91, 884.72, 663.54, 442.36, 221.18, 0.00],
  "Plan C": [3918.38, 3673.48, 3428.58, 3183.68, 2938.79, 2693.89, 2448.99, 2204.09, 1959.19, 1714.29, 1469.39, 1224.49, 979.60, 734.70, 489.80, 244.90, 0.00],
  "Plan D": [4205.40, 3942.56, 3679.73, 3416.89, 3154.05, 2891.21, 2628.38, 2365.54, 2102.70, 1839.86, 1577.03, 1314.19, 1051.35, 788.51, 525.67, 262.84, 0.00],
  "Plan E": [4587.03, 4300.34, 4013.65, 3726.96, 3440.27, 3153.58, 2866.89, 2580.20, 2293.52, 2006.83, 1720.14, 1433.45, 1146.76, 860.07, 573.38, 286.69, 0.00],
  "Plan F": [967.50, 907.03, 846.56, 786.09, 725.63, 665.16, 604.69, 544.22, 483.75, 423.28, 362.81, 302.34, 241.88, 181.41, 120.94, 60.47, 0.00],
  "Plan I": [1016.95, 953.39, 889.83, 826.27, 762.71, 699.15, 635.59, 572.03, 508.48, 444.92, 381.36, 317.80, 254.24, 190.68, 127.12, 63.56, 0.00],
  "Plan J": [2088.73, 1958.18, 1827.64, 1697.09, 1566.55, 1436.00, 1305.46, 1174.91, 1044.37, 913.82, 783.27, 652.73, 522.18, 391.64, 261.09, 130.55, 0.00],
}

const WEEKS = [
  "Aug 26", "Sep 2", "Sep 9", "Sep 16", "Sep 23", "Sep 30",
  "Oct 7", "Oct 14", "Oct 21", "Oct 28",
  "Nov 4", "Nov 11", "Nov 18", "Nov 25",
  "Dec 2", "Dec 9", "Dec 16"
]

interface PointsChartProps {
  selectedPlan: keyof typeof WEEKLY_DATA | ""
}

export function PointsChart({ selectedPlan }: PointsChartProps) {
  if (!selectedPlan) return null

  const getCurrentWeekIndex = () => {
    const today = new Date()
    const startDate = new Date('2024-08-26')
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