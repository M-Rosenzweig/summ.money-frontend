import React from "react";
import TopInfoBoxes from "@/components/TopInfoBoxes";

function ActiveOffers({ summary, account }) {
  console.log(summary);
  console.log(account);

  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="h-1/5 w-screen flexChild bg-red-500">
          {Object.entries(summary).map(([key, value]) => {
            if (value !== false && key !== "termsStatus") {
              // return <p>{`${key}:${value}`}</p>;
              return <TopInfoBoxes key={key} termKey={key} value={value.toString()} />;
            }
            return null;
          })}
        </div>
        <div className="h-4/5 w-screen bg-blue-500">hello bottom</div>
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
