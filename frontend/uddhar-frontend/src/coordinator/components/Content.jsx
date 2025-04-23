import { CalendarClock, MapPin } from "lucide-react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import AlertDialog from "../../shared/components/AlertDialog";
import { endDisaster } from "../data/DisasterMangement";
import { Toaster, toast } from "sonner";
import LoadingScreen from "../../shared/components/LoadingScreen";

const ContentSection = ({ currentEvent, onGoingDisasters }) => {
  const { disaster_id, title, startDate, location, description, type, status } = currentEvent;
  const [ onConfirm, setOnConfirm] = useState(status !== "Open");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);


  const endHandler = async () => {
    // close the disaster in db
    // show operation message
    // reset the onCofirm state based on the status of the disaster
    // filter the ongoing disasters to show only the open ones
    console.log("End event handler called for disaster ID: ", disaster_id);
    setLoading(true);
    const response = await endDisaster(disaster_id);
    if(response.status){
      toast.success("Disaster ended successfully");
      onGoingDisasters();
      setOnConfirm(status !== "Open");
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (onConfirm) {
      endHandler();
    }
    console.log("End event handler called: ", onConfirm);
  }, [onConfirm]);

  useEffect(() => {
    setOnConfirm(status !== "Open");
    console.log("onConfirm changed to : ", status);
  },[]);

  return (
    <>
      {showAlert && (
        <AlertDialog
          setOnConfirm={setOnConfirm}
          setShowAlert={setShowAlert}
        />
      )}
      {
        loading && (
          <LoadingScreen />
        )
      }
      <section className="w-full h-auto mx-auto p-6 relative border-2 rounded-lg">
        <Toaster position="top-center" richColors />
        <button className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white px-8 py-2 rounded cursor-pointer"
          onClick={() => setShowAlert(true)}
        >
          End
        </button>
        <h1 className="text-3xl font-bold mb-2">
          {title}
        </h1>
        <p className="text-lg bg-blue-400 w-26 px-2 rounded text-center my-3 py-1">{type}</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-4">
          {startDate && (
            <p className="flex justify-center gap-2">
              <CalendarClock /> {startDate}
            </p>
          )}
          {location && (
            <p className="flex justify-center gap-2">
              <MapPin /> {location}
            </p>
          )}
        </div>
        <p className="text-lg leading-relaxed">
          {description}
        </p>
      </section>
    </>
  );
};

export default ContentSection;

ContentSection.propTypes = {
  currentEvent: PropTypes.shape({
    disaster_id: PropTypes.number,
    title: PropTypes.string,
    startDate: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  onGoingDisasters: PropTypes.func,
};