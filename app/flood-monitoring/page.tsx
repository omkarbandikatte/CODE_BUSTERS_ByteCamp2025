import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FloodMonitoringDashboard } from "@/components/flood-monitoring-dashboard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, FileBarChart, Droplets, AlertTriangle } from "lucide-react"
import { RainfallForecastCard, DrainageSystemStatusCard } from "@/components/rainfall-drainage-cards"

export default function FloodMonitoringPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Flood Monitoring & Alerts</h1>
          <p className="text-muted-foreground mt-1">
            AI-based flood prediction system for early warnings and emergency response
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="destructive">
            <Link href="/flood-monitoring/alerts">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Active Alerts
            </Link>
          </Button>
          <Button asChild>
            <Link href="/flood-monitoring/reports">
              <FileBarChart className="mr-2 h-4 w-4" />
              View Reports
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <FloodMonitoringDashboard />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RainfallForecastCard />
          <DrainageSystemStatusCard />

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>Key emergency contacts for flood-related emergencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Rainfall forecast visualization</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Drainage System Status</CardTitle>
              <CardDescription>Current status of Mumbai's drainage system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Drainage system status visualization</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>Key emergency contacts for flood-related emergencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <div className="font-medium">Disaster Management Cell</div>
                    <div className="text-sm text-muted-foreground">24/7 Helpline</div>
                  </div>
                  <div className="font-bold">1916</div>
                </div>

                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <div className="font-medium">Mumbai Fire Brigade</div>
                    <div className="text-sm text-muted-foreground">Emergency</div>
                  </div>
                  <div className="font-bold">101</div>
                </div>

                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <div className="font-medium">Mumbai Police</div>
                    <div className="text-sm text-muted-foreground">Emergency</div>
                  </div>
                  <div className="font-bold">100</div>
                </div>

                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/flood-monitoring/emergency">
                    View All Emergency Contacts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Flood-Prone Areas</CardTitle>
            <CardDescription>Overview of high-risk flood-prone areas in Mumbai</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <h3 className="font-medium">Kurla</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Risk Level: High</p>
                  <div className="flex justify-between text-sm">
                    <span>Current Status:</span>
                    <span className="font-medium text-amber-600">Moderate Risk</span>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <h3 className="font-medium">Sion</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Risk Level: High</p>
                  <div className="flex justify-between text-sm">
                    <span>Current Status:</span>
                    <span className="font-medium text-red-600">High Risk</span>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <h3 className="font-medium">Hindmata</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Risk Level: High</p>
                  <div className="flex justify-between text-sm">
                    <span>Current Status:</span>
                    <span className="font-medium text-amber-600">Moderate Risk</span>
                  </div>
                </div>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link href="/flood-monitoring/risk-areas">
                  View All Risk Areas
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

