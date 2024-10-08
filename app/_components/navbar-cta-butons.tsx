"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export const NavbarCTAButton = () => {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) {
    return (
      <div className="flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0">
        <li>
          <div className="block h-10 w-20 bg-slate-200 animate-pulse text-center border rounded-lg md:border-none"></div>
        </li>
      </div>
    );
  }
  return (
    <div className="flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0">
      {!isSignedIn ? (
        <>
          <li>
            <Link
              href="/sign-in"
              className="block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none"
            >
              Log in
            </Link>
          </li>
          <li>
            <Link
              href={`/sign-up`}
              className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline"
            >
              Sign up
            </Link>
          </li>
        </>
      ) : (
        <li>
          <Link
            href={`/dashboard`}
            className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline"
          >
            Dashboard
          </Link>
        </li>
      )}
    </div>
  );
};
