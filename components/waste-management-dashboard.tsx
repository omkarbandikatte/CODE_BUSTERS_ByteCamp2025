"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues
const WasteMap = dynamic(() => import("@/components/waste-map"), {
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center bg-gray-100">Loading map...</div>,
})

export function WasteManagementDashboard() {
  const [wasteData, setWasteData] = useState({
    dailyTotal: 7500,
    unprocessed: 3000,
    recycled: 2250,
    composted: 1500,
    landfill: 750,
  })

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      area: "Dharavi",
      issue: "Unprocessed waste accumulation",
      severity: "high",
      timestamp: "2025-03-15T10:30:00",
    },
    {
      id: 2,
      area: "Bandra East",
      issue: "Collection delay",
      severity: "medium",
      timestamp: "2025-03-15T09:45:00",
    },
    {
      id: 3,
      area: "Andheri West",
      issue: "Drain blockage risk",
      severity: "high",
      timestamp: "2025-03-15T08:15:00",
    },
  ])

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly fluctuate waste data to simulate real-time changes
      setWasteData((prev) => ({
        ...prev,
        dailyTotal: prev.dailyTotal + Math.floor(Math.random() * 21) - 10,
        unprocessed: prev.unprocessed + Math.floor(Math.random() * 11) - 5,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Daily Waste Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wasteData.dailyTotal.toLocaleString()} MT</div>
            <p className="text-xs text-muted-foreground">Updated in real-time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unprocessed Waste</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wasteData.unprocessed.toLocaleString()} MT</div>
            <p className="text-xs text-muted-foreground">
              {((wasteData.unprocessed / wasteData.dailyTotal) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recycled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wasteData.recycled.toLocaleString()} MT</div>
            <p className="text-xs text-muted-foreground">
              {((wasteData.recycled / wasteData.dailyTotal) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Composted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wasteData.composted.toLocaleString()} MT</div>
            <p className="text-xs text-muted-foreground">
              {((wasteData.composted / wasteData.dailyTotal) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="map">
        <TabsList>
          <TabsTrigger value="map">Waste Map</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="routes">Collection Routes</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Mumbai Waste Hotspot Map</CardTitle>
              <CardDescription>Real-time visualization of waste hotspots across Mumbai</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-md overflow-hidden">
                <WasteMap />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Waste Management Alerts</CardTitle>
              <CardDescription>Critical alerts requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <Alert key={alert.id} variant={alert.severity === "high" ? "destructive" : "default"}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>
                      {alert.area}: {alert.issue}
                    </AlertTitle>
                    <AlertDescription>
                      Severity: {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                      <br />
                      Reported: {new Date(alert.timestamp).toLocaleString()}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Waste Collection Routes</CardTitle>
              <CardDescription>Active waste collection vehicles and their routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">Collection route visualization will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

