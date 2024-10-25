import React from "react";

import { CourseLayoutHero } from "../_components/course-layout/course-layout-hero";
import { CourseLessonsList } from "../_components/course-layout/course-lessions-list";
import { CourseLearnings } from "../_components/course-layout/course-learnings";
import { CourseInfoBlockSidebar } from "../_components/course-layout/course-info-block-sidebar";
import { CourseImgFormProvider } from "../providers/course-Image-form-provider";
import { GenerateCourseButton } from "../_components/generate-course-btn";

export default function CourseLayoutDetailsPage({
  params,
}: {
  params: { courseId: string };
}) {
  // const [imageFile, setImageFile] = useState<File | null>(null);
  // console.log(imageFile);
  return (
    <section className="h-screen">
      <div className="container px-4 mx-auto">
        <h1 className="text-4xl font-bold text-center py-5 md:py-10">
          Design Your Course Layout Here
        </h1>

        {/*  wrapping a provider which contains the form functionaries for handling file course image file upload so can i can access it's value in the "Generate Course Button
        This prevents form making this component a client component and following the modular design pattern
        "*/}
        <CourseImgFormProvider>
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
                <GenerateCourseButton courseId={params?.courseId} />
              </div>
            </div>
          </div>
        </CourseImgFormProvider>
      </div>
    </section>
  );
}
// https://preview.themeforest.net/item/collab-online-courses-elementor-template-kit/full_screen_preview/37990286?_ga=2.17549425.950919114.1729439107-1814868062.1727614068
