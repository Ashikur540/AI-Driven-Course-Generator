import { CourseDetailsNavbar } from "@/app/(course-details)/_components/course-details-navbar";
import { CourseDetailsSidebar } from "@/app/(course-details)/_components/course-details-sidebar";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr]">
        <CourseDetailsSidebar />
        <div className="flex flex-col">
          <CourseDetailsNavbar />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
