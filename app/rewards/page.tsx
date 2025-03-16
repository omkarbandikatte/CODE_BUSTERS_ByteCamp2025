"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Award, Gift, Zap, ShoppingBag, Trash2, Sun, Droplets, Users, CheckCircle, Clock } from "lucide-react"

export default function RewardsPage() {
  const { toast } = useToast()
  const [rewardPoints, setRewardPoints] = useState(250)
  const [rewardLevel, setRewardLevel] = useState("Silver")
  const [rewardHistory, setRewardHistory] = useState([
    {
      id: 1,
      type: "Waste Upload",
      points: 25,
      date: "2025-03-15",
      status: "credited",
    },
    {
      id: 2,
      type: "Solar Program Signup",
      points: 100,
      date: "2025-03-10",
      status: "credited",
    },
    {
      id: 3,
      type: "Flood Report",
      points: 50,
      date: "2025-03-05",
      status: "credited",
    },
    {
      id: 4,
      type: "Referral Bonus",
      points: 50,
      date: "2025-03-01",
      status: "credited",
    },
    {
      id: 5,
      type: "Discount Voucher Redemption",
      points: -75,
      date: "2025-02-25",
      status: "debited",
    },
  ])

  const handleRedeemReward = (points: number, name: string) => {
    if (rewardPoints >= points) {
      setRewardPoints((prev) => prev - points)

      // Add to reward history
      const newHistory = {
        id: rewardHistory.length + 1,
        type: `${name} Redemption`,
        points: -points,
        date: new Date().toISOString().split("T")[0],
        status: "debited",
      }
      setRewardHistory([newHistory, ...rewardHistory])

      toast({
        title: "Reward Redeemed Successfully",
        description: `You have redeemed ${name} for ${points} points.`,
      })
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${points - rewardPoints} more points to redeem this reward.`,
        variant: "destructive",
      })
    }
  }

  // Calculate next level threshold
  const getNextLevelThreshold = () => {
    if (rewardPoints < 500) return 500 // Silver to Gold
    if (rewardPoints < 1000) return 1000 // Gold to Platinum
    return 2000 // Platinum to Diamond
  }

  // Calculate progress to next level
  const getProgressToNextLevel = () => {
    if (rewardPoints < 500) return (rewardPoints / 500) * 100
    if (rewardPoints < 1000) return ((rewardPoints - 500) / 500) * 100
    if (rewardPoints < 2000) return ((rewardPoints - 1000) / 1000) * 100
    return 100
  }

  // Get next level name
  const getNextLevelName = () => {
    if (rewardPoints < 500) return "Gold"
    if (rewardPoints < 1000) return "Platinum"
    if (rewardPoints < 2000) return "Diamond"
    return "Diamond"
  }

  return (
    <div className="container mx-auto py-10 px-4 gradient-bg-rewards">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Rewards Program</h1>
          <p className="text-muted-foreground mt-1">
            Earn points for your contributions and redeem for exclusive rewards
          </p>
        </div>
      </div>

      {/* Rewards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Award className="mr-2 h-5 w-5 text-yellow-500" />
              Your Rewards Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-sm font-medium">Current Level</span>
                    <h3 className="text-2xl font-bold flex items-center">
                      {rewardLevel}
                      <Badge className="ml-2" variant="outline">
                        {rewardPoints} points
                      </Badge>
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">Next Level</span>
                    <h3 className="text-lg font-medium">{getNextLevelName()}</h3>
                  </div>
                </div>
                <Progress value={getProgressToNextLevel()} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {getNextLevelThreshold() - rewardPoints} more points needed to reach {getNextLevelName()} level
                </p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg min-w-[150px]">
                <Award className="h-10 w-10 text-yellow-500 mb-2" />
                <span className="text-sm font-medium">Lifetime Points</span>
                <span className="text-2xl font-bold">
                  {rewardPoints +
                    Math.abs(rewardHistory.filter((h) => h.status === "debited").reduce((sum, h) => sum + h.points, 0))}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Zap className="mr-2 h-5 w-5 text-blue-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" asChild>
                <a href="/upload">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Upload Waste Image
                </a>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <a href="/solar-energy/request">
                  <Sun className="mr-2 h-4 w-4" />
                  Request Solar Installation
                </a>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <a href="/rewards/refer">
                  <Users className="mr-2 h-4 w-4" />
                  Refer a Friend
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="redeem">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="redeem">
            <Gift className="mr-2 h-4 w-4" />
            Redeem Rewards
          </TabsTrigger>
          <TabsTrigger value="earn">
            <Zap className="mr-2 h-4 w-4" />
            Ways to Earn
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="mr-2 h-4 w-4" />
            Points History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="redeem" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-hover-effect">
              <CardHeader>
                <CardTitle>Discount Voucher</CardTitle>
                <CardDescription>10% off at participating recycling centers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    75 points
                  </Badge>
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a 10% discount on your next purchase at any participating recycling center in Mumbai.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={rewardPoints < 75}
                  onClick={() => handleRedeemReward(75, "Discount Voucher")}
                >
                  Redeem Now
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover-effect">
              <CardHeader>
                <CardTitle>Solar Power Bank</CardTitle>
                <CardDescription>Portable solar-powered charging device</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    200 points
                  </Badge>
                  <Sun className="h-6 w-6 text-yellow-500" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  A portable solar-powered power bank to charge your devices on the go using clean energy.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={rewardPoints < 200}
                  onClick={() => handleRedeemReward(200, "Solar Power Bank")}
                >
                  Redeem Now
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover-effect">
              <CardHeader>
                <CardTitle>Tree Planting</CardTitle>
                <CardDescription>Plant a tree in your name in Mumbai</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    150 points
                  </Badge>
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
                    className="h-6 w-6 text-green-600"
                  >
                    <path d="M12 22v-7l-2-2"></path>
                    <path d="M17 8v.8A6 6 0 0 1 13.8 20v0H10v0A6.5 6.5 0 0 1 7 8h0a5 5 0 0 1 10 0Z"></path>
                    <path d="m14 14-2 2-2-2"></path>
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  We'll plant a tree in your name in Mumbai to help increase the city's green cover.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={rewardPoints < 150}
                  onClick={() => handleRedeemReward(150, "Tree Planting")}
                >
                  Redeem Now
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover-effect">
              <CardHeader>
                <CardTitle>Flood Safety Kit</CardTitle>
                <CardDescription>Essential supplies for monsoon safety</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    250 points
                  </Badge>
                  <Droplets className="h-6 w-6 text-blue-500" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  A kit containing essential supplies to help you stay safe during the monsoon season.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={rewardPoints < 250}
                  onClick={() => handleRedeemReward(250, "Flood Safety Kit")}
                >
                  Redeem Now
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover-effect">
              <CardHeader>
                <CardTitle>Eco-Friendly Products</CardTitle>
                <CardDescription>Set of sustainable household items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    175 points
                  </Badge>
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  A set of eco-friendly household products including reusable bags, bamboo utensils, and more.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={rewardPoints < 175}
                  onClick={() => handleRedeemReward(175, "Eco-Friendly Products")}
                >
                  Redeem Now
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover-effect">
              <CardHeader>
                <CardTitle>Premium Membership</CardTitle>
                <CardDescription>1-month premium access to all platform features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    300 points
                  </Badge>
                  <Award className="h-6 w-6 text-purple-500" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Get premium access to all platform features, including advanced analytics and priority support.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={rewardPoints < 300}
                  onClick={() => handleRedeemReward(300, "Premium Membership")}
                >
                  Redeem Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="earn" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Ways to Earn Reward Points</CardTitle>
              <CardDescription>Contribute to Mumbai's sustainability and earn rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Trash2 className="h-6 w-6 text-green-600" />
                      <h3 className="font-semibold text-lg">Waste Management</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Upload waste image (verified)</span>
                        </div>
                        <Badge variant="outline">10-50 pts</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Report waste issue (verified)</span>
                        </div>
                        <Badge variant="outline">25 pts</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Organize community cleanup</span>
                        </div>
                        <Badge variant="outline">100 pts</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Waste reduction workshop</span>
                        </div>
                        <Badge variant="outline">75 pts</Badge>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Sun className="h-6 w-6 text-yellow-500" />
                      <h3 className="font-semibold text-lg">Solar Energy</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Join community solar program</span>
                        </div>
                        <Badge variant="outline">100 pts</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Refer solar installation</span>
                        </div>
                        <Badge variant="outline">75 pts</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Report solar opportunity</span>
                        </div>
                        <Badge variant="outline">25 pts</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Solar awareness workshop</span>
                        </div>
                        <Badge variant="outline">50 pts</Badge>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Droplets className="h-6 w-6 text-blue-500" />
                      <h3 className="font-semibold text-lg">Flood Monitoring</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Report flood condition</span>
                        </div>
                        <Badge variant="outline">25 pts</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Volunteer for flood relief</span>
                        </div>
                        <Badge variant="outline">150 pts</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Report blocked drain</span>
                        </div>
                        <Badge variant="outline">20 pts</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Flood safety workshop</span>
                        </div>
                        <Badge variant="outline">50 pts</Badge>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-6 w-6 text-purple-500" />
                    <h3 className="font-semibold text-lg">Community Engagement</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Refer a friend who joins</span>
                        </div>
                        <Badge variant="outline">50 pts</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Share verified report on social media</span>
                        </div>
                        <Badge variant="outline">10 pts</Badge>
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Participate in community event</span>
                        </div>
                        <Badge variant="outline">75 pts</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                          <span className="text-sm">Complete monthly challenges</span>
                        </div>
                        <Badge variant="outline">100 pts</Badge>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Points History</CardTitle>
              <CardDescription>Track your reward points activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-4 font-medium border-b">
                  <div>Activity</div>
                  <div>Date</div>
                  <div>Status</div>
                  <div>Points</div>
                </div>
                {rewardHistory.map((history) => (
                  <div key={history.id} className="grid grid-cols-4 p-4 border-b last:border-0 items-center">
                    <div className="font-medium">{history.type}</div>
                    <div className="text-sm">{history.date}</div>
                    <div>
                      {history.status === "credited" ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Credited
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          Debited
                        </Badge>
                      )}
                    </div>
                    <div className={`font-medium ${history.points > 0 ? "text-green-600" : "text-blue-600"}`}>
                      {history.points > 0 ? `+${history.points}` : history.points}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

