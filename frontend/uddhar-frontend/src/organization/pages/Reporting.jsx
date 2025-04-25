import { useEffect, useState } from "react";
import ReportingForm from "./sub_pages/ReportingForm";
import Sidebar from "../components/Sidebar";
import { getRegisteredDisaster } from '../data/data';
import JoinedDisaster from "./sub_pages/JoinedDisaster";

function Reporting() {
  const [ activeSection, setActiveSection ] = useState('');
  const [ongoingDisasters, setOngoingDisasters] = useState([]);
  const [selectedDisaster, setSelectedDisaster] = useState(null);

  useEffect(() => {
    const getOngoinDisaster = async () => {
      const response = await getRegisteredDisaster();
      setOngoingDisasters(response);
      console.log(response);
    }
    getOngoinDisaster();
  },[]);

  return (
    <div className="flex overflow-hidden w-full">
      <Sidebar activeSection={activeSection} setStep={activeSection} />
      <div className="flex-1 overflow-hidden m-10">
        {activeSection === '' && <JoinedDisaster ongoingDisasters={ongoingDisasters} setActiveSection={setActiveSection} setSelectedDisaster={setSelectedDisaster} />}
        {activeSection === 'report' && <ReportingForm setActiveSection={setActiveSection} selectedDisaster={selectedDisaster} />}
      </div>
      
    </div>
  );
}
export default Reporting;
