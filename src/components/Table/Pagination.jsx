import { useState } from "react";

export const Pagination = ({ page, total, onPageChange, limit }) => {
    const [currentPage, setCurrentPage] = useState(page);
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="flex items-center justify-between  bg-white px-4 py-3 sm:px-6 dark:bg-meta-4">
            <div className=" sm:flex sm:flex-1 sm:items-center sm:justify-between   border border-indigo-600">
                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        {Array.from({ length: totalPages }, (_, i) => {
                            return <a
                                aria-current="page"
                                className={`border border-gray-200  cursor-pointer relative z-10 inline-flex items-center ${currentPage == i + 1 ? 'bg-indigo-600 text-bodydark1' : ''} 
                                px-4 py-2 text-sm font-semiboldtext-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                                onClick={() => {
                                    setCurrentPage(i + 1);
                                    onPageChange(i + 1);
                                }}
                            >
                                {i + 1}
                            </a>
                        })}
                    </nav>
                </div>
            </div>
        </div>
    )
}
