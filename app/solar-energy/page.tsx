import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SolarEnergyDashboard } from "@/components/solar-energy-dashboard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, FileBarChart, Sun } from "lucide-react"

export default function SolarEnergyPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Solar Energy Tracking</h1>
          <p className="text-muted-foreground mt-1">
            Monitor solar panel energy generation and consumption across Mumbai
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/solar-energy/reports">
              <FileBarChart className="mr-2 h-4 w-4" />
              View Reports
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <SolarEnergyDashboard />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Energy Distribution</CardTitle>
              <CardDescription>Distribution of solar energy across different areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Energy distribution visualization</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Carbon Offset</CardTitle>
              <CardDescription>Environmental impact of solar energy usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Carbon offset metrics</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Energy Savings</CardTitle>
              <CardDescription>Financial impact of solar energy adoption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="font-medium">Monthly Savings</div>
                  <div className="font-bold text-green-600">₹ 12,45,000</div>
                </div>

                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="font-medium">Annual Savings</div>
                  <div className="font-bold text-green-600">₹ 1,49,40,000</div>
                </div>

                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="font-medium">ROI Period</div>
                  <div className="font-bold">4.2 years</div>
                </div>

                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/solar-energy/savings">
                    View Detailed Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Solar Installation Sites</CardTitle>
            <CardDescription>Overview of major solar installation sites across Mumbai</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <h3 className="font-medium">Dharavi Solar Farm</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Capacity: 2.5 MW</p>
                  <div className="flex justify-between text-sm">
                    <span>Current Output:</span>
                    <span className="font-medium text-green-600">1.8 MW</span>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <h3 className="font-medium">Bandra-Worli Sea Link</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Capacity: 1.8 MW</p>
                  <div className="flex justify-between text-sm">
                    <span>Current Output:</span>
                    <span className="font-medium text-amber-600">1.2 MW</span>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <h3 className="font-medium">Andheri Metro Station</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Capacity: 1.2 MW</p>
                  <div className="flex justify-between text-sm">
                    <span>Current Output:</span>
                    <span className="font-medium text-green-600">0.9 MW</span>
                  </div>
                </div>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link href="/solar-energy/installations">
                  View All Installations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

