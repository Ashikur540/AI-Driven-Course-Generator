import React from "react";

import { CourseLayoutHero } from "../_components/course-layout/course-layout-hero";
import { CourseLessonsList } from "../_components/course-layout/course-lessions-list";
import { CourseLearnings } from "../_components/course-layout/course-learnings";
import { CourseInfoBlockSidebar } from "../_components/course-layout/course-info-block-sidebar";
import { Button } from "@/components/ui/button";

export default function page({ params }: { params: { courseId: string } }) {
  return (
    <section className="h-screen">
      <div className="container px-4 mx-auto">
        <h1 className="text-4xl font-bold text-center py-5 md:py-10">
          Design Your Course Layout Here
        </h1>

        <CourseLayoutHero courseId={params?.courseId} />
        <div className="md:max-w-screen-md xl:max-w-screen-xl mx-auto p-6 md:p-8 xl:p-12 mb-10 flex flex-col gap-6 lg:gap-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            {/* what you will learn */}
            <CourseLearnings courseId={params?.courseId} />

            {/*  course info card */}
            <CourseInfoBlockSidebar courseId={params?.courseId} />
          </div>
          {/* course content */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Course Content</h2>
            <CourseLessonsList courseId={params?.courseId} />
            <div className="flex justify-center">
              <Button>Generate Course</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// https://preview.themeforest.net/item/collab-online-courses-elementor-template-kit/full_screen_preview/37990286?_ga=2.17549425.950919114.1729439107-1814868062.1727614068
