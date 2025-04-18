import { useCallback, useEffect, useRef, useState } from "react";
import { initialTeams, ongoingDisaster } from "../../public/data/Data";
import ReportingForm from "../components/ReportingForm";
import Sidebar from "../components/Sidebar";
import TeamCard from "../components/TeamCard";

// Ensure ongoingDisaster is not empty or undefined
if (!ongoingDisaster || ongoingDisaster.length === 0) {
  console.error("ongoingDisaster array is empty or undefined");
}

function Reporting() {
  const [step, setStep] = useState(1);

  const handleNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      card.addEventListener("click", handleNext);
    }
    return () => {
      if (card) {
        card.removeEventListener("click", handleNext);
      }
    };
  }, [handleNext]);

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex flex-wrap justify-center">
        {step === 1 && (
          <>
            {ongoingDisaster.map((disaster) => (
              <div
                key={`${disaster.title}-${disaster.description}`}
                className="bg-white shadow-lg rounded-lg p-6 m-10 relative overflow-hidden bg-cover bg-center text-white transform hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage: `url(${disaster.image})`,
                  width: "350px",
                  height: "260px",
                }}
                ref={cardRef}
              >
                <div className="mt-25 bg-gradient-to-b from-transparent to-black bg-opacity-70 p-4 rounded-lg h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl text-white text-wrap font-bold mb-2">
                      {disaster.title}
                    </h2>
                    <p className="mb-2 text-gray-200">
                      <strong>Location:</strong> {disaster.location}
                    </p>
                    <p className="mb-4 text-gray-300">{disaster.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {step === 2 && (
          <TeamCard initialTeams={initialTeams} handleNext={handleNext} />
        )}
        {step === 3 && <ReportingForm handleNext={handleNext} />}
      </div>
    </div>
  );
}
export default Reporting;
