import React, { useState } from 'react';
import { Statuses } from '../../service/Status';
import { Modal } from '../modals/Modal';

export const Status = ({ data = '', enableAction, onClick = () => { } }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={` ${Statuses.find(x => x.name?.toLocaleUpperCase() === data.toLocaleUpperCase())?.color} 
        cursor-pointer p-2 text-bodydark1 rounded text-center flex max-w-fit px-4 `} >
                <span onClick={() => { enableAction && setOpen(true); }}>{data}</span>
            </div>

            <Modal isOpen={open} title="Update Status" onClose={() => { setOpen(false) }} >
                <div className='flex place-items-center justify-between min-h-10'>
                    <span>Are you sure, Do you want to continue ?</span>
                    <span className='cursor-pointer'
                        onClick={() => { const res = onClick(); if (res) setOpen(false) }}>
                        Yes
                    </span>
                </div>
            </Modal>
        </>
    )
}


export const HoverText = ({ data = '' }) => {
    return (<div className="relative group">
        <p className="truncate max-w-xs">{data}</p>
        <div className="absolute left-0 bottom-6 w-auto p-2 bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {data}
        </div>
    </div>)
}
