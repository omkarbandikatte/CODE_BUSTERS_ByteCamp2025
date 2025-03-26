"use client"

import { useEffect, useRef } from "react"
import L, { Map, LatLngExpression } from "leaflet"
import "leaflet/dist/leaflet.css"
import { useTheme } from "next-themes"

// Mumbai waste hotspot data (simulated)
const wasteHotspots = [
  { lat: 19.076, lng: 72.8777, intensity: 0.9, name: "Dharavi" },
  { lat: 19.0596, lng: 72.8295, intensity: 0.7, name: "Bandra East" },
  { lat: 19.1136, lng: 72.8697, intensity: 0.8, name: "Andheri West" },
  { lat: 19.033, lng: 72.8656, intensity: 0.6, name: "Worli" },
  { lat: 18.9548, lng: 72.835, intensity: 0.5, name: "Colaba" },
  { lat: 19.0821, lng: 72.9482, intensity: 0.75, name: "Ghatkopar" },
  { lat: 19.1663, lng: 72.8526, intensity: 0.65, name: "Borivali" },
]

// Collection truck routes (simulated)
const truckRoutes = [
  {
    id: "truck-1",
    path: [
      [19.076, 72.8777],
      [19.07, 72.87],
      [19.065, 72.86],
      [19.0596, 72.8295],
    ],
    status: "active",
  },
  {
    id: "truck-2",
    path: [
      [19.1136, 72.8697],
      [19.1, 72.86],
      [19.09, 72.85],
      [19.0821, 72.9482],
    ],
    status: "active",
  },
]

export default function WasteMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<Map | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
      // Initialize map
      const map = L.map(mapRef.current).setView([19.076, 72.8777], 12)
      mapInstanceRef.current = map

      // Add tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      // Add waste hotspots as heat circles
      wasteHotspots.forEach((spot) => {
        const radius = spot.intensity * 1000 // Scale intensity to radius in meters
        const color = getIntensityColor(spot.intensity)

        L.circle([spot.lat, spot.lng] as LatLngExpression, {
          radius,
          color,
          fillColor: color,
          fillOpacity: 0.5,
        })
          .addTo(map)
          .bindPopup(`
          <strong>${spot.name}</strong><br>
          Waste Intensity: ${(spot.intensity * 100).toFixed(0)}%<br>
          Action Required: ${spot.intensity > 0.7 ? "Immediate" : "Scheduled"}
        `)
      })

      // Add collection truck routes
      truckRoutes.forEach((route) => {
        L.polyline(route.path as LatLngExpression[], {
          color: "#3b82f6",
          weight: 3,
          dashArray: "5, 10",
        })
          .addTo(map)
          .bindPopup(`Collection Truck ID: ${route.id}<br>Status: ${route.status}`)
      })

      // Add truck markers
      truckRoutes.forEach((route) => {
        const truckIcon = L.divIcon({
          html: `<div class="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white">🚚</div>`,
          className: "truck-icon",
          iconSize: [32, 32],
        })

        // Add marker at the first position of the route
        L.marker(route.path[0] as LatLngExpression, { icon: truckIcon })
          .addTo(map)
          .bindPopup(`Collection Truck ID: ${route.id}<br>Status: ${route.status}`)
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

  // Helper function to get color based on intensity
  function getIntensityColor(intensity: number): string {
    if (intensity > 0.8) return "#ef4444" // Red for high intensity
    if (intensity > 0.6) return "#f97316" // Orange for medium-high intensity
    if (intensity > 0.4) return "#eab308" // Yellow for medium intensity
    return "#22c55e" // Green for low intensity
  }

  return <div ref={mapRef} className="h-full w-full" />
}