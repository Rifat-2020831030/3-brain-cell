import { Bell } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import UpdatesContainer from "./UpdatesContainer";

const Updates = ({ haveUpdates = false }) => {
  const [updates, setUpdates] = useState([
    {
      id: 1,
      message: (
        <div className="flex justify-center items-center gap-x-2">
          <Bell className="text-red-700 w-5 h-5" />
          Get overview of the <b>Coordinator</b>. Email:{" "}
          <b>muhammadhasan31416@gmail.com</b> , Pass: <b>Qwerty1!</b>
          <Bell className="text-red-700 w-5 h-5" /> Get overview of the{" "}
          <b>Organization</b>. Email: <b>hasan151872@gmail.com</b>, Pass:{" "}
          <b>Qwerty1!</b>
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
