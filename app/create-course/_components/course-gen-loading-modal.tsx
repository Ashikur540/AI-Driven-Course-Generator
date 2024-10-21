import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { outfit } from "@/app/fonts";

export const CourseGenLoadingModal = ({
  isLoadingCourseGen,
}: {
  isLoadingCourseGen: boolean;
}) => {
  return (
    <AlertDialog open={isLoadingCourseGen}>
      <AlertDialogContent className={outfit.className}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Course Generation in Progress
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base font-medium">
            <Image
              src="/load-time.gif"
              alt="loading"
              width={100}
              height={100}
              className="mx-auto my-2.5"
            />
            {/* TODO: Make this more intuitive */}
            This may take a few minutes. Please do not close this page.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
