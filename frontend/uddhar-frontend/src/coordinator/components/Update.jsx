const Update = () => {
  return (
    <>
      <p className="text-2xl text-center mt-3">Live Update</p>

      <div
        id="toast-simple"
        className="flex items-center w-full max-w-xs p-4 mt-3 space-x-4 rtl:space-x-reverse rounded-lg shadow-sm"
        role="alert"
      >
        <svg
          className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
          />
        </svg>
        <div className="ps-4 text-sm font-normal">
          Message sent successfully.
        </div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-800 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-300 inline-flex items-center justify-center h-8 w-8 "
          data-dismiss-target="#toast-success"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </>
  );
};
export default Update;
