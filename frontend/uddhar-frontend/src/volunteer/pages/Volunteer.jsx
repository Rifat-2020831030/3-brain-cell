import {useState, useEffect} from 'react'
import LeftPanel from './sub-pages/LeftPanel'
import RightPanel from './sub-pages/RightPanel'
import { Toaster, toast } from 'sonner'
import { ongoingDisasterForVolunteer } from '../data/data'

function Volunteer() {
  const [loading, setLoading] = useState(true)
  const [ongoingEventData, setOngoingEventData] = useState([]);

  useEffect(() => {
    const fetchOngoingDisasters = async () => {
      const response = await ongoingDisasterForVolunteer()
      if (response.status) {
        setOngoingEventData(response.data)
      } else {
        toast.error(response.message)
      }
    }
    setLoading(true)
    fetchOngoingDisasters()
    setLoading(false)
  },[]);

  return (
    <div className='flex h-full w-full flex-row'>
      <Toaster position="bottom-right" richColors closeButton />
      <LeftPanel />
      <RightPanel ongoingEventData={ongoingEventData} loading={loading}/>
    </div>
  )
}

export default Volunteer
