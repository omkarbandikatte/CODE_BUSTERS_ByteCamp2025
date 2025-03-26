"use client"

import React from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Rainfall Forecast Data
const rainfallData = [
  { day: 'Mon', rainfall: 25 },
  { day: 'Tue', rainfall: 30 },
  { day: 'Wed', rainfall: 20 },
  { day: 'Thu', rainfall: 45 },
  { day: 'Fri', rainfall: 35 },
  { day: 'Sat', rainfall: 50 },
  { day: 'Sun', rainfall: 40 }
]

// Drainage System Status Data
const drainageData = [
  { hour: '12am', capacity: 60 },
  { hour: '6am', capacity: 75 },
  { hour: '12pm', capacity: 50 },
  { hour: '6pm', capacity: 80 }
]

export function RainfallForecastCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rainfall Forecast</CardTitle>
        <CardDescription>7-day rainfall forecast for Mumbai</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={rainfallData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis 
              dataKey="day" 
              tick={{ fill: 'hsl(var(--foreground))' }} 
              axisLine={{ stroke: 'hsl(var(--foreground))' }}
            />
            <YAxis 
              label={{ 
                value: 'Rainfall (mm)', 
                angle: -90, 
                position: 'insideLeft',
                fill: 'hsl(var(--foreground))'
              }}
              tick={{ fill: 'hsl(var(--foreground))' }}
              axisLine={{ stroke: 'hsl(var(--foreground))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                borderColor: 'hsl(var(--border))' 
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Line 
              type="monotone" 
              dataKey="rainfall" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function DrainageSystemStatusCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Drainage System Status</CardTitle>
        <CardDescription>Current capacity of Mumbai's drainage system</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={drainageData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis 
              dataKey="hour" 
              tick={{ fill: 'hsl(var(--foreground))' }} 
              axisLine={{ stroke: 'hsl(var(--foreground))' }}
            />
            <YAxis 
              label={{ 
                value: 'Capacity (%)', 
                angle: -90, 
                position: 'insideLeft',
                fill: 'hsl(var(--foreground))'
              }}
              tick={{ fill: 'hsl(var(--foreground))' }}
              axisLine={{ stroke: 'hsl(var(--foreground))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                borderColor: 'hsl(var(--border))' 
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Line 
              type="monotone" 
              dataKey="capacity" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}