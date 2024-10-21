import React from "react";
import { Navbar } from "../_components/navbar";

export default function CreateCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      {/* <Foot / */}
    </>
  );
}
