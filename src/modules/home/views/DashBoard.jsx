import React from 'react';
import home from "../../../assets/logo/welcome.png"

const DashBoard = () => {
    return (
        <div className='justify-center items-center flex flex-col'>
            <h1 className='m-4 font-bold '>Welcome</h1>
            <img src={home} className='w-1/2 h-auto' />
        </div>
    )
}

export default DashBoard;