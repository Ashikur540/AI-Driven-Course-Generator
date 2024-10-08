import React from "react";
import {
  Code,
  Paintbrush,
  BarChart3,
  Briefcase,
  DollarSign,
  HeartPulse,
  Music,
  Camera,
  User,
  Coffee,
  Monitor,
  BookOpen,
  Languages,
} from "lucide-react";

export const onboardingStepsData = [
  {
    title: "Select Category",
    description: "Select a category form below for your course",
    isCompleted: false,
  },
  {
    title: "Topic and Description",
    description: "Enter the topic and description for your course",
    isCompleted: false,
  },
  {
    title: "Course Options",
    description: "Select the options for your course",
    isCompleted: false,
  },
];

export const courseCategoryData = [
  {
    name: "Development",
    icon: <Code className="h-5 w-5 me-1" />,
  },
  {
    name: "Design",
    icon: <Paintbrush className="h-5 w-5 me-1" />,
  },
  {
    name: "Marketing",
    icon: <BarChart3 className="h-5 w-5 me-1" />,
  },
  {
    name: "Business",
    icon: <Briefcase className="h-5 w-5 me-1" />,
  },
  {
    name: "Finance",
    icon: <DollarSign className="h-5 w-5 me-1" />,
  },
  {
    name: "Health",
    icon: <HeartPulse className="h-5 w-5 me-1" />,
  },
  {
    name: "Music",
    icon: <Music className="h-5 w-5 me-1" />,
  },
  {
    name: "Photography",
    icon: <Camera className="h-5 w-5 me-1" />,
  },
  {
    name: "Personal Development",
    icon: <User className="h-5 w-5 me-1" />,
  },
  {
    name: "Lifestyle",
    icon: <Coffee className="h-5 w-5 me-1" />,
  },
  {
    name: "IT & Software",
    icon: <Monitor className="h-5 w-5 me-1" />,
  },
  {
    name: "Teaching & Academics",
    icon: <BookOpen className="h-5 w-5 me-1" />,
  },
  {
    name: "Language",
    icon: <Languages className="h-5 w-5 me-1" />,
  },
];
