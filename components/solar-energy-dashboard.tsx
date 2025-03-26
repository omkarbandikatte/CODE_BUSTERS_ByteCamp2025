"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Sun, Battery, Zap, CloudSun } from "lucide-react"

export function SolarEnergyDashboard() {
  const [energyData, setEnergyData] = useState({
    currentGeneration: 42.5, // kW
    dailyGeneration: 285.7, // kWh
    monthlyGeneration: 8570, // kWh
    batteryLevel: 78, // percentage
    householdsServed: 1250,
    weatherCondition: "Partly Cloudy",
    efficiency: 87, // percentage
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly fluctuate energy data to simulate real-time changes
      setEnergyData((prev) => ({
        ...prev,
        currentGeneration: parseFloat((Math.max(0, prev.currentGeneration + (Math.random() * 2 - 1))).toFixed(1)),
        batteryLevel: parseFloat((Math.min(100, Math.max(0, prev.batteryLevel + (Math.random() * 2 - 0.5)))).toFixed(1)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Simulated hourly generation data for the chart
  const hourlyGeneration = [
    { hour: "6 AM", generation: 5.2 },
    { hour: "7 AM", generation: 12.8 },
    { hour: "8 AM", generation: 24.5 },
    { hour: "9 AM", generation: 35.7 },
    { hour: "10 AM", generation: 42.3 },
    { hour: "11 AM", generation: 46.8 },
    { hour: "12 PM", generation: 48.2 },
    { hour: "1 PM", generation: 47.5 },
    { hour: "2 PM", generation: 45.1 },
    { hour: "3 PM", generation: 38.6 },
    { hour: "4 PM", generation: 28.9 },
    { hour: "5 PM", generation: 18.4 },
    { hour: "6 PM", generation: 8.7 },
  ]

  // Calculate max generation for scaling
  const maxGeneration = Math.max(...hourlyGeneration.map((h) => h.generation))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Sun className="mr-2 h-4 w-4 text-yellow-500" />
              Current Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{energyData.currentGeneration.toFixed(1)} kW</div>
            <p className="text-xs text-muted-foreground">{energyData.efficiency}% efficiency</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Battery className="mr-2 h-4 w-4 text-green-500" />
              Battery Storage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{energyData.batteryLevel.toFixed(0)}%</div>
            <Progress value={energyData.batteryLevel} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Zap className="mr-2 h-4 w-4 text-blue-500" />
              Daily Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{energyData.dailyGeneration.toLocaleString()} kWh</div>
            <p className="text-xs text-muted-foreground">
              Powering {energyData.householdsServed.toLocaleString()} households
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CloudSun className="mr-2 h-4 w-4 text-orange-500" />
              Weather Condition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{energyData.weatherCondition}</div>
            <p className="text-xs text-muted-foreground">Updated in real-time</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="generation">
        <TabsList>
          <TabsTrigger value="generation">Generation</TabsTrigger>
          <TabsTrigger value="consumption">Consumption</TabsTrigger>
          <TabsTrigger value="forecast">Energy Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="generation" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Solar Generation</CardTitle>
              <CardDescription>Hourly energy generation throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <div className="flex h-full items-end space-x-2">
                  {hourlyGeneration.map((hour, i) => (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-yellow-500 rounded-t"
                        style={{
                          height: `${(hour.generation / maxGeneration) * 100}%`,
                          minHeight: "4px",
                        }}
                      />
                      <div className="text-xs mt-2 text-muted-foreground">{hour.hour}</div>
                      <div className="text-xs font-medium">{hour.generation}kW</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consumption" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Energy Consumption</CardTitle>
              <CardDescription>Distribution of energy usage across Mumbai</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-gray-500">Energy consumption visualization will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Energy Generation Forecast</CardTitle>
              <CardDescription>AI-powered prediction of energy generation for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-gray-500">Energy forecast visualization will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}