import React from "react";
import TopInfoBoxes from "@/components/TopInfoBoxes";

function ActiveOffers({ summary, account }) {


  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="h-1/5 w-screen flexChild overflow-x-auto">
          {Object.entries(summary).map(([key, value]) => {
            if (value !== false && key !== "termsStatus") {
              return <TopInfoBoxes key={key} termKey={key} value={value.toString()} />;
            }
            return null;
          })}
        </div>
        <div className="h-4/5 w-screen bg-blue-50">hello bottom</div>
      </div>
    </>
  );
}

export default ActiveOffers;

{
  /* {Object.entries(summary).map(([key, value]) => {
            if (value !== false) {
              return <TermCard
                key={key}
                value={value.toString()}
                termKey={key}
                requirementText={false}

              />;
            }
            return null;
          })} */
}
