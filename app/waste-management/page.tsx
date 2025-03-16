import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WasteManagementDashboard } from "@/components/waste-management-dashboard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Upload, FileBarChart, MapPin } from "lucide-react"

export default function WasteManagementPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Waste Management</h1>
          <p className="text-muted-foreground mt-1">
            Real-time monitoring and management of Mumbai's waste collection system
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
            <Link href="/waste-management/reports">
              <FileBarChart className="mr-2 h-4 w-4" />
              View Reports
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <WasteManagementDashboard />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Waste Collection Efficiency</CardTitle>
              <CardDescription>Efficiency metrics for waste collection across Mumbai</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Efficiency metrics visualization</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Waste Composition</CardTitle>
              <CardDescription>Breakdown of waste types collected in Mumbai</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Waste composition chart</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collection Schedule</CardTitle>
              <CardDescription>Upcoming waste collection schedule by area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <div className="font-medium">Dharavi</div>
                    <div className="text-sm text-muted-foreground">General Waste</div>
                  </div>
                  <div className="text-sm">Today, 10:00 AM</div>
                </div>

                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <div className="font-medium">Bandra East</div>
                    <div className="text-sm text-muted-foreground">Recyclables</div>
                  </div>
                  <div className="text-sm">Today, 2:00 PM</div>
                </div>

                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <div className="font-medium">Andheri West</div>
                    <div className="text-sm text-muted-foreground">General Waste</div>
                  </div>
                  <div className="text-sm">Tomorrow, 9:00 AM</div>
                </div>

                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/waste-management/schedule">
                    View Full Schedule
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Waste Processing Facilities</CardTitle>
            <CardDescription>Overview of waste processing facilities across Mumbai</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <h3 className="font-medium">Deonar Dumping Ground</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Capacity: 5,500 MT/day</p>
                  <div className="flex justify-between text-sm">
                    <span>Current Load:</span>
                    <span className="font-medium text-amber-600">82%</span>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <h3 className="font-medium">Kanjurmarg Landfill</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Capacity: 4,000 MT/day</p>
                  <div className="flex justify-between text-sm">
                    <span>Current Load:</span>
                    <span className="font-medium text-green-600">65%</span>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <h3 className="font-medium">Mulund Dumping Ground</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Capacity: 3,000 MT/day</p>
                  <div className="flex justify-between text-sm">
                    <span>Current Load:</span>
                    <span className="font-medium text-red-600">91%</span>
                  </div>
                </div>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link href="/waste-management/facilities">
                  View All Facilities
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

