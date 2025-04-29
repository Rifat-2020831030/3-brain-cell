import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AlertDialog = ({ setOnConfirm, setShowAlert, message }) => {
  const [isOpen, setIsOpen] = useState(true); // used to off the scrolling
  
  const onClickHandler = (e) => {
    if (e.target.innerText === "Confirm") {
      setOnConfirm(true);
      return;
    }
    setOnConfirm(false);
    setShowAlert(false);
    setIsOpen(false); 
  };
  
  // used to off the scrolling when the alert dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 bg-gray-700/60 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-black text-lg font-medium mb-2">
          Are you absolutely sure?
        </h2>
        <p className="text-black mb-6">
          {message || "This action cannot be undone. This will permanently stop the event."}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClickHandler}
            className="px-4 py-2 rounded-md bg-transparent text-black hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onClickHandler}
            className="px-4 py-2 rounded-md bg-white text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
AlertDialog.propTypes = {
    setOnConfirm: PropTypes.func.isRequired,
    setShowAlert: PropTypes.func.isRequired,
    message: PropTypes.string,
};
