"use client"

import { useEffect, useRef } from "react"
import L, { Map} from "leaflet"
import "leaflet/dist/leaflet.css"
import { useTheme } from "next-themes"

// Type definitions for flood risk areas and evacuation routes
interface FloodRiskArea {
  lat: number;
  lng: number;
  risk: number;
  name: string;
}

interface EvacuationRoute {
  id: string;
  path: [number, number][];
  status: string;
}

// Mumbai flood risk areas (simulated)
const floodRiskAreas: FloodRiskArea[] = [
  { lat: 19.076, lng: 72.8777, risk: 0.8, name: "Kurla" },
  { lat: 19.0596, lng: 72.8295, risk: 0.6, name: "Bandra East" },
  { lat: 19.1136, lng: 72.8697, risk: 0.7, name: "Andheri East" },
  { lat: 19.033, lng: 72.8656, risk: 0.5, name: "Worli" },
  { lat: 19.0438, lng: 72.8619, risk: 0.9, name: "Sion" },
  { lat: 19.0821, lng: 72.9482, risk: 0.4, name: "Ghatkopar" },
  { lat: 19.0469, lng: 72.8493, risk: 0.7, name: "Matunga" },
]

// Evacuation routes (simulated)
const evacuationRoutes: EvacuationRoute[] = [
  {
    id: "route-1",
    path: [
      [19.076, 72.8777], // Kurla
      [19.07, 72.88],
      [19.065, 72.885],
      [19.06, 72.89],
    ],
    status: "active",
  },
  {
    id: "route-2",
    path: [
      [19.0438, 72.8619], // Sion
      [19.045, 72.865],
      [19.047, 72.87],
      [19.05, 72.875],
    ],
    status: "active",
  },
]

export default function FloodMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<Map | null>(null)
  const { theme } = useTheme()

  // Helper function to get color based on risk
  function getRiskColor(risk: number): string {
    if (risk > 0.8) return "#ef4444" // Red for high risk
    if (risk > 0.6) return "#f97316" // Orange for medium-high risk
    if (risk > 0.4) return "#eab308" // Yellow for medium risk
    return "#22c55e" // Green for low risk
  }

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
      // Initialize map
      const map = L.map(mapRef.current).setView([19.076, 72.8777], 12)
      mapInstanceRef.current = map

      // Add tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      // Add flood risk areas as heat circles
      floodRiskAreas.forEach((area) => {
        const radius = area.risk * 1000 // Scale risk to radius in meters
        const color = getRiskColor(area.risk)

        L.circle([area.lat, area.lng], {
          radius,
          color,
          fillColor: color,
          fillOpacity: 0.5,
        })
          .addTo(map)
          .bindPopup(`
          <strong>${area.name}</strong><br>
          Flood Risk: ${(area.risk * 100).toFixed(0)}%<br>
          Status: ${area.risk > 0.7 ? "High Alert" : area.risk > 0.5 ? "Moderate Alert" : "Low Alert"}
        `)
      })

      // Add evacuation routes
      evacuationRoutes.forEach((route) => {
        L.polyline(route.path, {
          color: "#22c55e", // Green for evacuation routes
          weight: 4,
          opacity: 0.8,
        })
          .addTo(map)
          .bindPopup(`Evacuation Route ID: ${route.id}<br>Status: ${route.status}`)
      })

      // Add evacuation point markers
      evacuationRoutes.forEach((route) => {
        const safetyIcon = L.divIcon({
          html: `<div class="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full text-white">🏥</div>`,
          className: "safety-icon",
          iconSize: [32, 32],
        })

        // Add marker at the last position of the route (safe point)
        L.marker(route.path[route.path.length - 1], { icon: safetyIcon })
          .addTo(map)
          .bindPopup(`Evacuation Safe Point<br>Status: Active`)
      })
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Update map theme when theme changes
  useEffect(() => {
    // This would be used to switch map styles based on theme
    // For now, we'll just keep the default OSM style
  }, [theme])

  return <div ref={mapRef} className="h-full w-full" />
}