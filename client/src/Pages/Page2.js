import React, { useContext, useEffect } from 'react'
import { RootLayoutContext } from './RootLayout/RootLayout'

const Page2 = () => {
  const {setTitle} = useContext(RootLayoutContext);
  useEffect(()=>{setTitle("Page2")},[])
  return (
    <div>Page2</div>
  )
}

export default Page2