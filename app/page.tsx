import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Trash2, Sun, Droplets, Award, Building } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 gradient-bg-hero">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge className="px-3 py-1 text-sm" variant="secondary">
                Unified Urban Management
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Smart Solutions for a Resilient Mumbai
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                An integrated platform for waste management, solar energy tracking, and flood monitoring to build a
                sustainable future.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 gradient-bg-1">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Integrated Urban Solutions
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Our platform addresses Mumbai's most pressing urban challenges through technology and community
                engagement.
              </p>
            </div>
          </div>
          <div className="grid gap-6 mt-12 md:grid-cols-3 lg:gap-12">
            <Card className="card-hover-effect">
              <CardHeader>
                <Trash2 className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>AI-Powered Waste Management</CardTitle>
                <CardDescription>
                  Smart waste classification and collection tracking with rewards for community participation.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc list-inside space-y-2 text-gray-500 dark:text-gray-400">
                  <li>AI-based waste classification</li>
                  <li>Real-time collection tracking</li>
                  <li>Reward system for proper segregation</li>
                  <li>Fraud prevention mechanisms</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/waste-management">
                    Explore Waste Management <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover-effect">
              <CardHeader>
                <Sun className="h-10 w-10 text-yellow-500 mb-4" />
                <CardTitle>Solar Energy Solutions</CardTitle>
                <CardDescription>
                  Track solar energy generation and request deployments for homes and communities.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc list-inside space-y-2 text-gray-500 dark:text-gray-400">
                  <li>Real-time energy generation monitoring</li>
                  <li>Solar deployment request system</li>
                  <li>EV charging station locator</li>
                  <li>Community solar sharing model</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/solar-energy">
                    Explore Solar Energy <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover-effect">
              <CardHeader>
                <Droplets className="h-10 w-10 text-blue-500 mb-4" />
                <CardTitle>Flood Prediction & Alerts</CardTitle>
                <CardDescription>
                  AI-based flood prediction with personalized evacuation routes and emergency assistance.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc list-inside space-y-2 text-gray-500 dark:text-gray-400">
                  <li>Real-time flood risk assessment</li>
                  <li>Personalized evacuation routes</li>
                  <li>Emergency shelter locations</li>
                  <li>Panic management strategies</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/flood-monitoring">
                    Explore Flood Monitoring <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 gradient-bg-rewards">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Rewards Program</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get Rewarded for Your Contributions
              </h2>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                Earn points for proper waste segregation, solar energy adoption, and community engagement. Redeem for
                vouchers, discounts, and more.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild>
                  <Link href="/rewards">
                    <Award className="mr-2 h-4 w-4" />
                    Join Rewards Program
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="card-hover-effect">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Waste Segregation</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">Earn 10-50 points for each verified waste upload</p>
                </CardContent>
              </Card>
              <Card className="card-hover-effect">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Solar Adoption</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">Get 100 points for joining community solar programs</p>
                </CardContent>
              </Card>
              <Card className="card-hover-effect">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Flood Reporting</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">Earn 25 points for verified flood condition reports</p>
                </CardContent>
              </Card>
              <Card className="card-hover-effect">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Referrals</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">Get 50 points for each friend who joins the platform</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 gradient-bg-2">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Partners</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Working together with government agencies, businesses, and NGOs to build a sustainable Mumbai.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-12">
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
              <Building className="h-12 w-12 text-gray-400" />
            </div>
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
              <Building className="h-12 w-12 text-gray-400" />
            </div>
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
              <Building className="h-12 w-12 text-gray-400" />
            </div>
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
              <Building className="h-12 w-12 text-gray-400" />
            </div>
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
              <Building className="h-12 w-12 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 gradient-bg-3">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Impact at a Glance</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
              Our platform is making a real difference in Mumbai's urban environment.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md dark:bg-gray-950 card-hover-effect">
              <div className="text-4xl font-bold text-primary">3,500+</div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mt-2">
                Tons of waste properly segregated
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md dark:bg-gray-950 card-hover-effect">
              <div className="text-4xl font-bold text-secondary">250+</div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mt-2">
                Solar installations deployed
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md dark:bg-gray-950 card-hover-effect">
              <div className="text-4xl font-bold text-blue-500">850+</div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mt-2">
                Families protected from flooding
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md dark:bg-gray-950 card-hover-effect">
              <div className="text-4xl font-bold text-yellow-500">12,000+</div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mt-2">
                Active community members
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join the Movement for a Sustainable Mumbai
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Help us build a more resilient and sustainable future by contributing data and insights.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild variant="secondary" size="lg">
                <Link href="/register">
                  Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-black border-black hover:bg-black/10" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/waste-management" className="text-gray-500 hover:text-primary">
                    Waste Management
                  </Link>
                </li>
                <li>
                  <Link href="/solar-energy" className="text-gray-500 hover:text-primary">
                    Solar Energy
                  </Link>
                </li>
                <li>
                  <Link href="/flood-monitoring" className="text-gray-500 hover:text-primary">
                    Flood Monitoring
                  </Link>
                </li>
                <li>
                  <Link href="/rewards" className="text-gray-500 hover:text-primary">
                    Rewards Program
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-500 hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="text-gray-500 hover:text-primary">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-500 hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-500 hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-500 hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-gray-500 hover:text-primary">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-500 hover:text-primary">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-500 hover:text-primary">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-500 hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-500 hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-500 hover:text-primary">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="text-gray-500 hover:text-primary">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t">
            <p className="text-sm text-gray-500">© 2025 Mumbai Urban Management System. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

