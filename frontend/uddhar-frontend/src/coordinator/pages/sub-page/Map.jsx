import { useEffect, useState } from 'react';
import OSMMap from '../../../public/components/DisasterMap'; 
import { getTeamDetails, getCoordinates } from '../../data/MapStat';
import PropTypes from 'prop-types';

const MapComponent = ({currentEvent}) => {
  const [teamData, setTeamData] = useState([]);
  const [disasterCenter, setDisasterCenter] = useState([90.3710408, 23.8202931]); // Default coordinates

  useEffect(() => {
    if(!currentEvent?.disaster_id) return;
    
    async function getTeamData() {
      const response = await getTeamDetails(currentEvent.disaster_id);
      if(response.status) {
        setTeamData(response.response);
      }
    }
    async function getDisasterCenter() {
      const response = await getCoordinates(currentEvent.location);
      setDisasterCenter([response.lon, response.lat]);
      // console.log("Disaster center coordinates: ", response);
    }
    getDisasterCenter();
    getTeamData();
  }, [currentEvent]);

  return (
    <div className="h-full w-full">
      <OSMMap teamData={teamData} disasterCenter={disasterCenter} currentEvent={currentEvent}/>
    </div>
  );
};

export default MapComponent;

MapComponent.propTypes = {
  currentEvent: PropTypes.shape({
    disaster_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    location: PropTypes.string,
    title: PropTypes.string,
    startDate: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
  }),
};