import React from "react";
import OverlapeCard from "../../public/components/OverlapedCard";
import { ongoingDisaster } from "../../public/data/Data";
function DisasterCard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-10">Ongoing Disaster</h1>
      <div className="grid md:flex max-sm:grid-cols-1 max-md:grid-cols-2 gap-10 justify-center items-center mx-10">
        {ongoingDisaster.map((data, index) => (
          <OverlapeCard data={data} key={index} />
        ))}
      </div>
    </div>
  );
}

export default DisasterCard;
