import EmergencyMsg from "../../components/EmergencyMsg";
import Update from "../../components/Update";

const RightPanel = () => {
  return (
    <>
      <div className="bg-gray-100 w-full min-w-60 px-10 py-5 h-screen border-gray-300 border-1 rounded-l-2xl shadow-2xl sticky top-0">
        <EmergencyMsg />
        <Update />
      </div>
    </>
  );
};
export default RightPanel;
