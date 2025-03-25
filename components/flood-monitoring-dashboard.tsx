"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Droplets, AlertTriangle, MapPin, Clock } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues
const FloodMap = dynamic(() => import("@/components/flood-map"), {
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center bg-gray-100">Loading map...</div>,
})

interface Alert {
  id: number;
  area: string;
  issue: string;
  severity: 'low' | 'moderate' | 'high';
  timestamp: string;
}

interface FloodData {
  currentRainfall: number;
  waterLevels: {
    mithi: number;
    dahisar: number;
    poisar: number;
    oshiwara: number;
  };
  alertLevel: 'low' | 'moderate' | 'high' | 'severe';
  affectedAreas: number;
  evacuationRoutes: number;
  predictionAccuracy: number;
}

export function FloodMonitoringDashboard() {
  const [floodData, setFloodData] = useState<FloodData>({
    currentRainfall: 12.5, // mm
    waterLevels: {
      mithi: 78, // percentage of danger level
      dahisar: 45,
      poisar: 62,
      oshiwara: 55,
    },
    alertLevel: "moderate", // low, moderate, high, severe
    affectedAreas: 8,
    evacuationRoutes: 12,
    predictionAccuracy: 92, // percentage
  })

  const [alerts] = useState<Alert[]>([])

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly fluctuate flood data to simulate real-time changes
      setFloodData((prev) => ({
        ...prev,
        currentRainfall: Number((Math.max(0, prev.currentRainfall + (Math.random() * 2 - 0.5))).toFixed(1)),
        waterLevels: {
          mithi: Math.min(100, Math.max(0, prev.waterLevels.mithi + (Math.random() * 4 - 1.5))),
          dahisar: Math.min(100, Math.max(0, prev.waterLevels.dahisar + (Math.random() * 3 - 1))),
          poisar: Math.min(100, Math.max(0, prev.waterLevels.poisar + (Math.random() * 3 - 1))),
          oshiwara: Math.min(100, Math.max(0, prev.waterLevels.oshiwara + (Math.random() * 3 - 1))),
        },
      }))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Get alert level color
  const getAlertColor = (level: FloodData['alertLevel']) => {
    switch (level) {
      case "low":
        return "bg-green-500"
      case "moderate":
        return "bg-yellow-500"
      case "high":
        return "bg-orange-500"
      case "severe":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get water level status
  const getWaterLevelStatus = (level: number) => {
    if (level > 80) return "Critical"
    if (level > 60) return "Warning"
    if (level > 40) return "Elevated"
    return "Normal"
  }

  const getSeverityColor = (level: Alert['severity']) => {
    switch (level) {
      case "high":
        return "text-red-500"
      case "moderate":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getSeverityBadge = (level: Alert['severity']) => {
    switch (level) {
      case "high":
        return "destructive"
      case "moderate":
        return "outline"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Droplets className="mr-2 h-4 w-4 text-blue-500" />
              Current Rainfall
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{floodData.currentRainfall.toFixed(1)} mm</div>
            <p className="text-xs text-muted-foreground">Last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4 text-orange-500" />
              Alert Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${getAlertColor(floodData.alertLevel)}`}></div>
              <div className="text-2xl font-bold capitalize">{floodData.alertLevel}</div>
            </div>
            <p className="text-xs text-muted-foreground">{floodData.affectedAreas} areas affected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-red-500" />
              Evacuation Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{floodData.evacuationRoutes}</div>
            <p className="text-xs text-muted-foreground">Active routes available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-purple-500" />
              Prediction Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{floodData.predictionAccuracy}%</div>
            <p className="text-xs text-muted-foreground">Based on historical data</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="map">
        <TabsList>
          <TabsTrigger value="map">Flood Risk Map</TabsTrigger>
          <TabsTrigger value="waterLevels">Water Levels</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Mumbai Flood Risk Map</CardTitle>
              <CardDescription>Real-time visualization of flood risk areas across Mumbai</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-md overflow-hidden">
                <FloodMap />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waterLevels" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>River Water Levels</CardTitle>
              <CardDescription>Current water levels in major rivers and water bodies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Mithi River</span>
                    <Badge variant={floodData.waterLevels.mithi > 60 ? "destructive" : "outline"}>
                      {getWaterLevelStatus(floodData.waterLevels.mithi)}
                    </Badge>
                  </div>
                  <Progress value={floodData.waterLevels.mithi} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {floodData.waterLevels.mithi.toFixed(1)}% of danger level
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Dahisar River</span>
                    <Badge variant={floodData.waterLevels.dahisar > 60 ? "destructive" : "outline"}>
                      {getWaterLevelStatus(floodData.waterLevels.dahisar)}
                    </Badge>
                  </div>
                  <Progress value={floodData.waterLevels.dahisar} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {floodData.waterLevels.dahisar.toFixed(1)}% of danger level
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Poisar River</span>
                    <Badge variant={floodData.waterLevels.poisar > 60 ? "destructive" : "outline"}>
                      {getWaterLevelStatus(floodData.waterLevels.poisar)}
                    </Badge>
                  </div>
                  <Progress value={floodData.waterLevels.poisar} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {floodData.waterLevels.poisar.toFixed(1)}% of danger level
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Oshiwara River</span>
                    <Badge variant={floodData.waterLevels.oshiwara > 60 ? "destructive" : "outline"}>
                      {getWaterLevelStatus(floodData.waterLevels.oshiwara)}
                    </Badge>
                  </div>
                  <Progress value={floodData.waterLevels.oshiwara} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {floodData.waterLevels.oshiwara.toFixed(1)}% of danger level
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Flood Alerts</CardTitle>
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
      </Tabs>
    </div>
  )
}

