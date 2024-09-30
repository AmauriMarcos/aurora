import Search from '../Search/Search'
import React from 'react'
import Temperature from '../Temperature/Temperature'
import AirPollution from '../AirPollution/AirPollution'

const Sidebar = () => {
  return (
    <div className='flex flex-col gap-[5rem] p-4 '>
      <Search/>
      <Temperature/>
      <AirPollution/>
    </div>
  )
}

export default Sidebar
