"use client"

import { useState } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { WasteManagementDashboard } from "@/components/waste-management-dashboard"
import { SolarEnergyDashboard } from "@/components/solar-energy-dashboard"
import { FloodMonitoringDashboard } from "@/components/flood-monitoring-dashboard"
import { Trash2, Sun, Droplets, Award, Bell, ArrowRight, Upload } from "lucide-react"

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'waste' | 'solar' | 'flood';
}

export default function DashboardPage() {
  const [rewardPoints] = useState(0)
  const [notifications] = useState<Notification[]>([])

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case "waste":
        return <Trash2 className="h-4 w-4 text-green-600" />
      case "solar":
        return <Sun className="h-4 w-4 text-yellow-500" />
      case "flood":
        return <Droplets className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of Mumbai's urban management systems.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Data
            </Link>
          </Button>
          <Button asChild>
            <Link href="/rewards">
              <Award className="mr-2 h-4 w-4" />
              My Rewards
            </Link>
          </Button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Award className="mr-2 h-4 w-4 text-yellow-500" />
              Reward Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rewardPoints} pts</div>
            <Progress value={rewardPoints % 100} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {100 - (rewardPoints % 100)} points until next reward level
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Trash2 className="mr-2 h-4 w-4 text-green-600" />
              Waste Contributions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Waste uploads this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Sun className="mr-2 h-4 w-4 text-yellow-500" />
              Solar Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">Community solar program member</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Droplets className="mr-2 h-4 w-4 text-blue-500" />
              Flood Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                Moderate
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">In your area for next 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Recent Notifications
          </CardTitle>
          <CardDescription>Stay updated with the latest alerts and information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg ${notification.read ? "bg-background" : "bg-primary/5 border-primary/20"}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link href="/notifications">
                View All Notifications
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="waste" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="waste">
            <Trash2 className="mr-2 h-4 w-4" />
            Waste Management
          </TabsTrigger>
          <TabsTrigger value="solar">
            <Sun className="mr-2 h-4 w-4" />
            Solar Energy
          </TabsTrigger>
          <TabsTrigger value="flood">
            <Droplets className="mr-2 h-4 w-4" />
            Flood Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="waste" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Waste Management Overview</CardTitle>
                  <CardDescription>
                    Real-time visualization of waste collection routes and high-waste zones
                  </CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/waste-management">
                    Full Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <WasteManagementDashboard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solar" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Solar Energy Tracking</CardTitle>
                  <CardDescription>Monitor solar panel energy generation and consumption</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/solar-energy">
                    Full Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <SolarEnergyDashboard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flood" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Flood Monitoring & Alerts</CardTitle>
                  <CardDescription>AI-based flood prediction system for early warnings</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/flood-monitoring">
                    Full Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <FloodMonitoringDashboard />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

