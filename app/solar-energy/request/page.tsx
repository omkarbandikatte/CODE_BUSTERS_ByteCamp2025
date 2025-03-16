"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Sun, Home, Building, MapPin, Battery, Zap, Car, Users, ArrowRight, CheckCircle } from "lucide-react"

export default function SolarRequestPage() {
  const { toast } = useToast()
  const [requestType, setRequestType] = useState("home")
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [roofArea, setRoofArea] = useState("")
  const [energyConsumption, setEnergyConsumption] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Request Submitted Successfully",
        description: "Your solar deployment request has been submitted. We'll contact you soon.",
      })

      // Reset form
      setRequestType("home")
      setLocation("")
      setPropertyType("")
      setRoofArea("")
      setEnergyConsumption("")
      setName("")
      setEmail("")
      setPhone("")
      setDescription("")
      setStep(1)
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="container mx-auto py-10 px-4 gradient-bg-solar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Solar Deployment Request</h1>
          <p className="text-muted-foreground mt-1">
            Request solar panel installation for your home, business, or community
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Solar Installation Request</CardTitle>
              <CardDescription>Fill out the form below to request a solar installation</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={requestType} onValueChange={setRequestType}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="home">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </TabsTrigger>
                  <TabsTrigger value="business">
                    <Building className="mr-2 h-4 w-4" />
                    Business
                  </TabsTrigger>
                  <TabsTrigger value="community">
                    <Users className="mr-2 h-4 w-4" />
                    Community
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <form onSubmit={handleSubmit} className="mt-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="flex gap-2">
                        <Input
                          id="location"
                          placeholder="Enter address"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="property-type">Property Type</Label>
                      <Select value={propertyType} onValueChange={setPropertyType} required>
                        <SelectTrigger id="property-type">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          {requestType === "home" && (
                            <>
                              <SelectItem value="apartment">Apartment</SelectItem>
                              <SelectItem value="individual-house">Individual House</SelectItem>
                              <SelectItem value="villa">Villa</SelectItem>
                            </>
                          )}
                          {requestType === "business" && (
                            <>
                              <SelectItem value="office">Office</SelectItem>
                              <SelectItem value="retail">Retail Store</SelectItem>
                              <SelectItem value="warehouse">Warehouse</SelectItem>
                              <SelectItem value="factory">Factory</SelectItem>
                            </>
                          )}
                          {requestType === "community" && (
                            <>
                              <SelectItem value="slum-area">Slum Area</SelectItem>
                              <SelectItem value="residential-complex">Residential Complex</SelectItem>
                              <SelectItem value="public-space">Public Space</SelectItem>
                              <SelectItem value="school">School</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="roof-area">Approximate Roof Area (sq. ft.)</Label>
                      <Input
                        id="roof-area"
                        type="number"
                        placeholder="Enter roof area"
                        value={roofArea}
                        onChange={(e) => setRoofArea(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="energy-consumption">Average Monthly Energy Consumption (kWh)</Label>
                      <Input
                        id="energy-consumption"
                        type="number"
                        placeholder="Enter energy consumption"
                        value={energyConsumption}
                        onChange={(e) => setEnergyConsumption(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="button" onClick={nextStep}>
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base">Solar System Requirements</Label>
                      <RadioGroup defaultValue="grid-tied" className="mt-2">
                        <div className="flex items-start space-x-2 mb-2">
                          <RadioGroupItem value="grid-tied" id="grid-tied" />
                          <Label htmlFor="grid-tied" className="font-normal cursor-pointer">
                            <span className="font-medium">Grid-Tied System</span>
                            <p className="text-sm text-muted-foreground">
                              Connected to the electricity grid, no battery storage
                            </p>
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2 mb-2">
                          <RadioGroupItem value="hybrid" id="hybrid" />
                          <Label htmlFor="hybrid" className="font-normal cursor-pointer">
                            <span className="font-medium">Hybrid System</span>
                            <p className="text-sm text-muted-foreground">
                              Connected to the grid with battery backup for power outages
                            </p>
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="off-grid" id="off-grid" />
                          <Label htmlFor="off-grid" className="font-normal cursor-pointer">
                            <span className="font-medium">Off-Grid System</span>
                            <p className="text-sm text-muted-foreground">
                              Completely independent from the electricity grid
                            </p>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base">Additional Requirements</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="battery" />
                          <Label htmlFor="battery" className="font-normal cursor-pointer flex items-center">
                            <Battery className="h-4 w-4 mr-2 text-green-600" />
                            Battery Storage
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="ev-charger" />
                          <Label htmlFor="ev-charger" className="font-normal cursor-pointer flex items-center">
                            <Car className="h-4 w-4 mr-2 text-blue-600" />
                            EV Charging Point
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="monitoring" />
                          <Label htmlFor="monitoring" className="font-normal cursor-pointer flex items-center">
                            <Zap className="h-4 w-4 mr-2 text-yellow-600" />
                            Energy Monitoring System
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">Additional Information</Label>
                      <Textarea
                        id="description"
                        placeholder="Any specific requirements or questions?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Previous Step
                      </Button>
                      <Button type="button" onClick={nextStep}>
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex items-start space-x-2 mt-4">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="font-normal cursor-pointer text-sm">
                        I agree to the terms and conditions and consent to the processing of my personal data for the
                        purpose of this solar installation request.
                      </Label>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Previous Step
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Benefits of Solar Energy</CardTitle>
              <CardDescription>Why you should consider solar installation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Sun className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Reduce Electricity Bills</h4>
                    <p className="text-sm text-muted-foreground">
                      Save up to 70% on your monthly electricity bills with solar power.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Battery className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Energy Independence</h4>
                    <p className="text-sm text-muted-foreground">
                      Reduce dependence on the grid and avoid power outages with battery storage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Environmental Impact</h4>
                    <p className="text-sm text-muted-foreground">
                      Reduce your carbon footprint and contribute to a cleaner environment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Government Incentives</h4>
                    <p className="text-sm text-muted-foreground">
                      Take advantage of subsidies and tax benefits for solar installations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium flex items-center">
                  <Users className="h-5 w-5 mr-2 text-yellow-600" />
                  Community Solar Program
                </h4>
                <p className="text-sm text-muted-foreground mt-2">
                  For slum areas and low-income communities, we offer special community solar programs with affordable
                  microgrids and battery rental options.
                </p>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <a href="/solar-energy/community">Learn More About Community Solar</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Request Process</CardTitle>
              <CardDescription>What happens after you submit your request</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Initial Assessment</h4>
                    <p className="text-sm text-muted-foreground">
                      Our team reviews your request and conducts a preliminary assessment.
                    </p>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Site Survey</h4>
                    <p className="text-sm text-muted-foreground">
                      A technical team visits your location to assess feasibility and requirements.
                    </p>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Proposal & Quotation</h4>
                    <p className="text-sm text-muted-foreground">
                      We provide a detailed proposal with system specifications and costs.
                    </p>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium">Installation</h4>
                    <p className="text-sm text-muted-foreground">
                      Once approved, our team installs the solar system at your location.
                    </p>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    5
                  </div>
                  <div>
                    <h4 className="font-medium">Commissioning & Training</h4>
                    <p className="text-sm text-muted-foreground">
                      We set up the system, test it, and train you on its operation and maintenance.
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

