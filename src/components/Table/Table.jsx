import React, { useState } from 'react';
import dayjs from 'dayjs';

import { DeleteIcon, EditIcon, ViewIcon } from './TableIcons';
import { Modal } from '../modals/Modal';
import { Pagination } from './Pagination';

export const Table = ({ tableData, header, total = 1, onPageChange, page, limit }) => {

    return (
        <div className="bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto min-h-20s">
                    <TableHead header={header} />
                    <tbody>
                        {tableData?.length > 0 && tableData.map((tableItem, tableIndex) => {
                            return <TableRow tableRow={tableItem} header={header} key={tableIndex} />
                        })}
                        {tableData?.length === 0 && <td className='text-center' colSpan={header?.length}>No Records </td>}
                    </tbody>
                </table>
            </div>
            {total > limit && <div className="flex overflow-x-auto sm:justify-center">
                <Pagination total={total} onPageChange={onPageChange} page={page} limit={limit} />
            </div>}
        </div>
    )
}


const TableHead = ({ header }) => {
    return (<thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
            {header?.length > 0 && header.map((item, index) => {
                return <th key={index} className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                    {item.label}
                </th>
            })}
        </tr>
    </thead>)
}

const TableRow = ({ tableRow, header }) => {
    const [isDelete, setDelete] = useState(false);

    return (
        <tr>
            {header?.length > 0 && header.map((headItem, headIndex) => {
                let component = null;
                let rowActions = headItem?.rowActions || [];
                if (headItem.type === "text") { component = <p> {tableRow[headItem?.name]}</p> }
                if (headItem.type === "component") {
                    component = headItem?.component(tableRow);
                }
                if (headItem.type === "date") {
                    component = dayjs(tableRow[headItem?.name]).format('DD/MM/YYYY')
                }
                if (headItem.type === "actions" && rowActions.length > 0) {
                    let newArray = [];
                    rowActions.map((item) => {
                        if (item.name === "update") {
                            newArray.push(<EditIcon onclick={() => { item.action(tableRow) }} />);
                        }
                        if (item.name === "delete") {
                            newArray.push(<Modal isOpen={isDelete} title="Delete Table Data" onClose={() => { setDelete(false) }} >
                                <div className='flex place-items-center justify-between min-h-10'>
                                    <span>Are you sure, Do you want to continue ?</span>
                                    <span className='cursor-pointer'
                                        onClick={() => { const res = item.action(tableRow); if (res) setDelete(false) }}>
                                        Yes
                                    </span>
                                </div>
                            </Modal>);
                            newArray.push(<DeleteIcon onclick={() => { setDelete(true) }} />);
                        }
                        if (item.name === "view") {
                            newArray.push(<ViewIcon onclick={() => { item.action(tableRow) }} />);
                        }
                    });
                    component = <div className="flex items-center space-x-3.5">
                        {newArray}
                    </div>;
                }
                return <td key={headIndex} className="border-b border-[#eee] py-4 px-4 dark:border-strokedark ">
                    {component}
                </td>
            })}
        </tr>
    )
}

