"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Camera,
  FileText,
  MapPin,
  Award,
  CheckCircle,
  XCircle,
  Trash2,
  Sun,
  Droplets,
} from "lucide-react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [wasteType, setWasteType] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)

  interface UploadResult {
    type: string;
    confidence: number;
    recommendations: string[];
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Create preview for images
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setPreview(event.target?.result as string)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setPreview(null)
      }

      // Reset results
      setResult(null)
      setWasteType(null)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !wasteType) return

    setUploading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      const result: UploadResult = {
        type: wasteType,
        confidence: 0.95,
        recommendations: ["Recycle", "Compost"]
      }
      setResult(JSON.stringify(result, null, 2))
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Waste Data Upload</h1>

      <Tabs defaultValue="image">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="image">
            <Camera className="mr-2 h-4 w-4" />
            Image Upload
          </TabsTrigger>
          <TabsTrigger value="report">
            <FileText className="mr-2 h-4 w-4" />
            Report Waste
          </TabsTrigger>
          <TabsTrigger value="data">
            <Upload className="mr-2 h-4 w-4" />
            Bulk Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="image" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upload Waste Image</CardTitle>
                <CardDescription>Upload an image of waste for AI-powered classification and analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="waste-image">Waste Image</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="waste-image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          disabled={uploading}
                        />
                      </div>
                    </div>

                    {preview && (
                      <div className="flex flex-col space-y-1.5">
                        <Label>Preview</Label>
                        <div className="border rounded-md overflow-hidden">
                          <Image
                            src={preview || "/placeholder.svg"}
                            alt="Waste preview"
                            width={500}
                            height={300}
                            className="w-full h-auto max-h-[300px] object-contain"
                          />
                        </div>
                      </div>
                    )}

                    <Button type="submit" disabled={!file || uploading} className="w-full">
                      {uploading ? "Uploading..." : "Upload & Analyze"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>AI-powered waste classification and disposal recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                {!file && !result && (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center text-gray-500">
                    <Upload className="h-12 w-12 mb-4 text-gray-400" />
                    <p>Upload an image to see waste analysis results</p>
                  </div>
                )}

                {uploading && (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                    <p>Uploading image...</p>
                  </div>
                )}

                {wasteType && result && (
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <h3 className="font-semibold text-lg mb-1">Waste Classification</h3>
                      <p className="text-2xl font-bold">{wasteType}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2">Detailed Analysis</h3>
                      <div className="prose max-w-none dark:prose-invert">
                        <p>{result}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>


        <TabsContent value="report" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Report Environmental Issue</CardTitle>
                <CardDescription>
                  Report waste-related issues, solar deployment opportunities, or flood risks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="issue-type">Issue Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="waste">
                          <div className="flex items-center">
                            <Trash2 className="h-4 w-4 mr-2 text-green-600" />
                            Waste Issue
                          </div>
                        </SelectItem>
                        <SelectItem value="solar">
                          <div className="flex items-center">
                            <Sun className="h-4 w-4 mr-2 text-yellow-500" />
                            Solar Deployment Opportunity
                          </div>
                        </SelectItem>
                        <SelectItem value="flood">
                          <div className="flex items-center">
                            <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                            Flood Risk
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Enter location or address" className="flex-1" />
                      <Button variant="outline" size="icon">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Use the pin button to automatically detect your current location
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea placeholder="Describe the issue in detail" rows={4} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="image">Image (Optional)</Label>
                    <Input type="file" accept="image/*" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Can be addressed within a week</SelectItem>
                        <SelectItem value="medium">Medium - Should be addressed within 48 hours</SelectItem>
                        <SelectItem value="high">High - Requires immediate attention</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Submit Report</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Guidelines</CardTitle>
                <CardDescription>How to submit effective reports and earn rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                      <Trash2 className="h-5 w-5 mr-2 text-green-600" />
                      Waste Issues
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                        <span>Report illegal dumping, overflowing bins, or unprocessed waste</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                        <span>Include clear photos showing the extent of the issue</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                        <span>Provide precise location details for quick response</span>
                      </li>
                      <li className="flex items-start">
                        <XCircle className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                        <span>Avoid submitting reports without verification</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                      <Sun className="h-5 w-5 mr-2 text-yellow-500" />
                      Solar Opportunities
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                        <span>Identify suitable locations for solar panel installation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                        <span>Report areas with energy poverty that could benefit from solar</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                        <span>Suggest locations for solar EV charging stations</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                      <Droplets className="h-5 w-5 mr-2 text-blue-500" />
                      Flood Risks
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                        <span>Report blocked drains or water logging</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                        <span>Document rising water levels in flood-prone areas</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                        <span>Provide real-time updates during heavy rainfall</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-yellow-500" />
                      Rewards
                    </h3>
                    <p className="text-sm mb-2">Earn points for verified reports that lead to action:</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span>Waste Issue (Verified)</span>
                        <Badge variant="outline">25 points</Badge>
                      </li>
                      <li className="flex justify-between">
                        <span>Solar Opportunity (Implemented)</span>
                        <Badge variant="outline">100 points</Badge>
                      </li>
                      <li className="flex justify-between">
                        <span>Flood Risk (Verified)</span>
                        <Badge variant="outline">50 points</Badge>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload History</CardTitle>
              <CardDescription>Track your contributions and earned rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 p-4 font-medium border-b">
                    <div className="col-span-2">Type & Location</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div>Points</div>
                    <div>Actions</div>
                  </div>
                  <div className="p-4 text-center text-muted-foreground">
                    No upload history available
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Total Uploads: 0</p>
                    <p className="text-sm text-muted-foreground">
                      0 verified, 0 rejected
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Points Earned:</p>
                    <p className="text-xl font-bold text-primary">0</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

