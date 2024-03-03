 import React from 'react'
import SideBar from '../../components/sideBar/SideBar.jsx'
 import MessageContainer from '../../components/messages/MessageContainer.jsx'
 const Home = () => {
   return (
    <div className='flex sm:h-[450px] md:h-[550px] p-10  bg-white-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 border border-gray-100'>
        <SideBar />
        <MessageContainer />
    </div>
   )
 }
 
 export default Home