import React from "react";
import { DashboardHeader } from "./_components/DashboardHeader";
import AllCoursesCardsGrid from "./_components/all-courses-cards-grid";

function Dashboard() {
  return (
    <div>
      <DashboardHeader />
      <AllCoursesCardsGrid />
    </div>
  );
}

export default Dashboard;
