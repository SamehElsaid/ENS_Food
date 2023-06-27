import ShowOrderWithDate from '@/app/[lng]/components/Order/ShowOrderWithDate'
import React from 'react'

function page({params:{order}}) {
    
  return (
    <ShowOrderWithDate order={order}/>
  )
}

export default page