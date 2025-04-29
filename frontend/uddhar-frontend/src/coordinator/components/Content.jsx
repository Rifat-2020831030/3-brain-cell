import { CalendarClock, MapPin, Pencil } from "lucide-react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import AlertDialog from "../../shared/components/AlertDialog";
import { endDisaster } from "../data/DisasterMangement";
import { Toaster, toast } from "sonner";
import LoadingScreen from "../../shared/components/LoadingScreen";
import DisasEditDialog from "./DisasterEditDialog";

const ContentSection = ({ currentEvent, onGoingDisasters }) => {
  const { disaster_id, title, startDate, location, description, type, status } = currentEvent;
  const [ onConfirm, setOnConfirm] = useState(status !== "Open");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);


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
      setShowAlert(false);
      setOnConfirm(status !== "Open");
    } 
    !response.status && toast.error(response.message);
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
      {showEditDialog && (
        <DisasEditDialog
          initialData={currentEvent}
          onClose={() => setShowEditDialog(false)}
        />
      )}
      <section className="w-full h-auto mx-auto p-6 relative border-2 rounded-lg">
        <Toaster position="top-center" richColors />
        <div className="flex justify-end items-center gap-x-5 absolute top-4 right-4">
          <button className="border-1 border-gray-300 p-1 rounded cursor-pointer hover:bg-gray-400/70" onClick={()=> setShowEditDialog(true)}><Pencil className="w-5 h-5"/></button>
          <button className="bg-red-500 hover:bg-red-700 text-white px-8 py-2 rounded cursor-pointer"
            onClick={() => setShowAlert(true)}
          >
            End
          </button>
        </div>
        <h1 className="text-3xl mb-2 font-serif">
          Heading: {<span className=" font-bold">{title}</span>}
        </h1>
        <p className="text-lg bg-blue-400 w-26 px-1 rounded text-center my-3 py-1">{type}</p>
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
        <h2 className="text-xl font-semibold mb-2">Description:</h2>
        <hr className="mb-4" />
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