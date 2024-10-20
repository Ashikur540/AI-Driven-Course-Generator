"use client";

import {
  Bell,
  Home,
  Layers3,
  LogOutIcon,
  Package2,
  Shield,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function Sidebar() {
  const path = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {dashboardLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  path === link.href ? "text-primary bg-slate-100" : ""
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card className="p-2">
            <Progress value={50} />
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

export const dashboardLinks = [
  {
    href: "/dashboard",
    icon: <Home className="h-4 w-4" />,
    label: "Dashboard",
  },
  {
    href: "/dashboard/explore",
    icon: <Layers3 className="h-4 w-4" />,
    label: "Explore",
  },
  {
    href: "/dashboard/upgrade",
    icon: <Shield className="h-4 w-4" />,
    label: "Upgrade",
  },
  {
    href: "/dashboard/logout",
    icon: <LogOutIcon className="h-4 w-4" />,
    label: "Logout",
  },
];
