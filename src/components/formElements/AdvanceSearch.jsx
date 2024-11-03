import React, { useState } from 'react';

export const AdvanceSearch = ({ title = "Text", children = null, actions }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className='dark:bg-boxdark'>
            <div className='flex justify-between px-4 py-2'>
                <h6 className='font-bold p-2'>{title}</h6>
                <div className='flex items-center'>
                    {actions}
                    {children && <button type="button" onClick={() => setOpen(!open)}
                        className="flex items-center justify-between p-5 rtl:text-right gap-3 font-extrabold "
                    >
                        <svg
                            fill="currentColor"
                            viewBox="0 0 18 18"
                            height="1em"
                            width="1em"
                        >
                            <path d="M14 1a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1h12zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" />
                            <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
                        </svg>
                    </button>}
                </div>

            </div>
            <div className={open ? 'block' : 'hidden'} >
                {children}
            </div>
        </div>
    )
}
