import React from "react";
import { Navbar } from "../_components/navbar";
import { Toaster } from "react-hot-toast";

export default function CreateCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      <Navbar />
      {children}
      {/* <Foot / */}
    </>
  );
}
