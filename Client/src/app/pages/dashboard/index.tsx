import Sidebar from "@/app/components/sidebar";
import DashBoardSkeleton from "@/app/skeletons/DashBoardSkeleton";
import React, { Suspense, useState } from "react";

function DashboardLayout() {
  const [activeElement, setActiveElement] = useState<JSX.Element | null>(null);

  const handleRouteChange = (element: JSX.Element | null) => {
    setActiveElement(element);
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col overflowhidden">
        <div
          className={
            "w-full h-screen flex flex-row gap-x-4 bg-[#EDF3F7]"
          }
        >
          <Sidebar onRouteChange={handleRouteChange} />
          <Suspense fallback={<DashBoardSkeleton />}>
            <div className="flex flex-1">
              {/* Render activeElement here */}
              {activeElement}
            </div>
          </Suspense>
          <div className="absolute right-10"></div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
