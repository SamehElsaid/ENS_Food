import ShowOrderWithDate from '@/app/[lng]/components/Order/ShowOrderWithDate'
import React from 'react'

function page({params:{drivery}}) {
    
  return (
    <ShowOrderWithDate drivery={true} order={drivery}/>
  )
}

export default page