import ShowOrderWithDate from '@/app/[lng]/components/Order/ShowOrderWithDate'
import React from 'react'

function page({params:{order,lng}}) {
    
  return (
    <ShowOrderWithDate lng={lng} order={order}/>
  )
}

export default page