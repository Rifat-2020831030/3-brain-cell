const EmergencyMsg = () => {
  return (
    <form action="">
      <div className="flex flex-col">
        <label htmlFor="message">Send Emergency Message</label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="5"
          className="border-2 border-black p-[5px] rounded-md mt-5"
        ></textarea>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="bg-amber-300 text-black px-5 py-2 rounded-md my-2 hover:bg-amber-400 cursor-pointer"
        >
          Send
        </button>
      </div>
    </form>
  );
};
export default EmergencyMsg;
