import React, { useEffect, useRef } from 'react';

export const Modal = ({ isOpen, title = "TItle", children, onClose = () => { } }) => {

    const outerDivRef = useRef(null);
    const innerDivRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            outerDivRef.current &&
            !innerDivRef.current.contains(event.target)
        ) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <>
                <div
                    id="modal"
                    ref={outerDivRef}
                    className={`left-0 flex items-center justify-center h-screen w-full fixed top-0 bg-black bg-opacity-60  ${isOpen ? "" : "hidden"}`}
                    onClick={handleClickOutside}
                >
                    <div ref={innerDivRef} className="bg-white dark:bg-boxdark max-w-4xl w-full rounded-md">
                        <div className="p-3 flex items-center justify-between border-b border-b-gray-300">
                            <h3 className="font-medium text-xl">{title}</h3>
                            <span className="modal-close cursor-pointer" onClick={() => { onClose(); }}>X</span>{" "}
                        </div>
                        <div className="p-3 border-b border-b-gray-300">
                            {children}
                        </div>
                    </div>
                </div>
            </>

        </>
    )
}
