"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export const DashboardHeader = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-wrap justify-between items-center gap-8">
      <div>
        <h1 className="text-2xl font-medium">
          Hello, <b>{user?.fullName}</b>
        </h1>
        <p className="text-muted-foreground">
          Create new courses with AI and share them with your students.
        </p>
      </div>
      <Link href={`/create-course`}>
        <Button>
          <Plus className="h-5 w-5 mr-2" />
          Create Course
        </Button>
      </Link>
    </div>
  );
};
