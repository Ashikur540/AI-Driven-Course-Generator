import { Badge } from "@/components/ui/badge";
import { CourseRes } from "@/types/courses.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function CourseCard({ course }: { course: CourseRes }) {
  const { category, title, createdAt, level, thumbnailImage, _id } =
    course ?? {};
  return (
    <>
      {/*<!-- Component: Basic image card --> */}
      <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
        {/*  <!--  Image --> */}
        <figure>
          <Image
            src={thumbnailImage || "/course-image-placeholder.svg"}
            alt="course-image"
            className="aspect-video w-full object-cover"
            height={200}
            width={200}
          />
        </figure>
        {/*  <!-- Body--> */}
        <div className="p-6 flex flex-col gap-2">
          <Badge variant="secondary" className="w-fit">
            {category}
          </Badge>

          <Link href={`/dashboard/courses/${_id}`}>
            <h3 className="text-xl font-medium text-slate-700">{title}</h3>
          </Link>
          <p className="text-sm text-slate-400">
            {" "}
            By You, {new Date(createdAt).toDateString()}
          </p>
        </div>
      </div>
      {/*<!-- End Basic image card --> */}
    </>
  );
}
