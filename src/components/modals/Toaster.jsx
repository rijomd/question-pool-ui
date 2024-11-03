import React, { useEffect, useState } from 'react';

export const Toaster = ({ message, isOpen = false, error = false }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen])

    return (
        open ?
            <div id="toast-success" className={`flex items-center w-full max-w-xs p-4 mb-4  rounded-lg shadow dark:text-gray-400
             dark:bg-gray-800  absolute z-999 top-1 left-0 text-pink-50 ${error ? 'bg-meta-1' : 'bg-success'}`} role="alert">
                <div className={`ms-3 text-sm font-normal `}>{message}</div>
                <button onClick={() => { setOpen(false) }} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div> : <></>
    )
}
