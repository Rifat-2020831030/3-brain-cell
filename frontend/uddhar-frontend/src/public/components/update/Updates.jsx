import { Bell } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import UpdatesContainer from "./UpdatesContainer";
import { toast } from "sonner";

const Updates = ({ haveUpdates = false }) => {
  const [updates, setUpdates] = useState([
    {
      id: 1,
      message: (
        <div className="flex justify-center items-center gap-x-2">
          <Bell className="text-red-700 w-5 h-5" />
          Get overview of the <b>Coordinator</b>. Email:{" "}
          <button 
            onClick={() => {
              navigator.clipboard.writeText("muhammadhasan31416@gmail.com");
              toast.success("Copied to clipboard!");
            }}
            className="cursor-pointer"
          >
            <b>muhammadhasan31416@gmail.com</b> 📋
          </button>
          , Pass:{" "}
          <button 
            onClick={() => {
              navigator.clipboard.writeText("Qwerty1!");
              toast.success("Copied to clipboard!");
            }}
            className="cursor-pointer"
          >
            <b>Qwerty1!</b> 📋
          </button>
          <Bell className="text-red-700 w-5 h-5" /> Get overview of the{" "}
          <b>Organization</b>. Email:{" "}
          <button 
            onClick={() => {
              navigator.clipboard.writeText("hasan151872@gmail.com");
              toast.success("Copied to clipboard!");
            }}
            className="cursor-pointer"
          >
            <b>hasan151872@gmail.com</b> 📋
          </button>
          , Pass:{" "}
          <button 
            onClick={() => {
              navigator.clipboard.writeText("Qwerty1!");
              toast.success("Copied to clipboard!");
            }}
            className="cursor-pointer"
          >
            <b>Qwerty1!</b> 📋
          </button>
        </div>
      ),
    },
  ]);

  if (!haveUpdates) {
    setUpdates([]);
    return null;
  }

  return (
    <div className="w-full relative z-10">
      {updates.map((update) => (
        <UpdatesContainer
          key={update.id}
          message={update.message}
          bgColor={update.bgColor}
          textColor={update.textColor}
        />
      ))}
    </div>
  );
};

export default Updates;

Updates.propTypes = {
  haveUpdates: PropTypes.bool,
};
