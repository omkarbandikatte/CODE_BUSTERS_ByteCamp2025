"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserButton } from "@/components/user-button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Menu, Trash2, Sun, Droplets, Home, BarChart3 } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
    },
    {
      href: "/waste-management",
      label: "Waste Management",
      active: pathname.includes("/waste-management"),
      icon: <Trash2 className="h-4 w-4 mr-2" />,
    },
    {
      href: "/solar-energy",
      label: "Solar Energy",
      active: pathname.includes("/solar-energy"),
      icon: <Sun className="h-4 w-4 mr-2" />,
    },
    {
      href: "/flood-monitoring",
      label: "Flood Monitoring",
      active: pathname.includes("/flood-monitoring"),
      icon: <Droplets className="h-4 w-4 mr-2" />,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Mumbai Urban Management</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-50 to-blue-50 p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">Mumbai Urban Management</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Integrated platform for waste management, solar energy tracking, and flood monitoring
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <Link href="/waste-management" legacyBehavior passHref>
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">
                          <Trash2 className="h-4 w-4 inline-block mr-2" />
                          Waste Management
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          AI-powered waste classification and collection tracking
                        </p>
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/solar-energy" legacyBehavior passHref>
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">
                          <Sun className="h-4 w-4 inline-block mr-2" />
                          Solar Energy
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Monitor solar panel energy generation and consumption
                        </p>
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/flood-monitoring" legacyBehavior passHref>
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">
                          <Droplets className="h-4 w-4 inline-block mr-2" />
                          Flood Monitoring
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          AI-based flood prediction system for early warnings
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/rewards" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Rewards</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <span className="font-bold">Mumbai Urban Management</span>
            </Link>
            <div className="mt-6 flex flex-col gap-3">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  variant={route.active ? "default" : "ghost"}
                  className={cn("justify-start", route.active && "bg-primary text-primary-foreground")}
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link href={route.href}>
                    {route.icon}
                    {route.label}
                  </Link>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild variant="outline">
              <Link href="/upload">Upload Data</Link>
            </Button>
            <UserButton />
          </nav>
        </div>
      </div>
    </header>
  )
}

