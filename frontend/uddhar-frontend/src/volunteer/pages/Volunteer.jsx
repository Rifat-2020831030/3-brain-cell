import React from 'react'
import LeftPanel from './sub-pages/LeftPanel'
import RightPanel from './sub-pages/RightPanel'

function Volunteer() {
  return (
    <div className='flex h-full w-full flex-row gap-4'>
      <LeftPanel />
      <RightPanel/>
    </div>
  )
}

export default Volunteer
