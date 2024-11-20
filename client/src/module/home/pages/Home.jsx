import React, { useState } from 'react'
import Header from '../../../global/components/header/header';
import Footer from '../../../global/components/footer/footer';
import Loading from '../../../global/components/loading/Loading';
import { Outlet } from "react-router-dom";

const Home = () => {

    let [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
    }, 2000)

  return (

    <>
      {
        isLoading === true && <div className='loader'>
          <Loading />
        </div>
      }
      <div className='main-container flex flex-col justify-start w-full min-h-[100vh]'>
          <Header/>
          <div className="w-full py-4 px-4 overflow-y-auto">
              <Outlet className="outlet-cont" />  
          </div>
          <Footer/>

      </div>
    </>
  )
}

export default Home