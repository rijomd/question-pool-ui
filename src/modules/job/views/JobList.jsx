import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addJobAction, deleteJobAction, fetchJobList, updateJobAction } from '../reducer/JobActions';
import { Table } from '../../../components/Table/Table';
import { Status } from '../../../components/utils/UtilsComponent';
import { Button } from '../../../components/formElements/FormElements';
import { AdvanceSearch } from '../../../components/formElements/AdvanceSearch';
import { Toaster } from '../../../components/modals/Toaster';
import { Modal } from '../../../components/modals/Modal';
import { Form } from '../components/Form';

const JobList = () => {
    const { jobList, error, message } = useSelector((state) => state.job);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [init, setInit] = useState({ job_name: "", description: "" });

    const header = [
        {
            name: "job_name",
            label: "Name",
            type: "text",
        },
        {
            name: "updatedAt",
            label: "Modified Date",
            type: "date"
        },
        {
            name: "status",
            label: "Status",
            type: "component",
            component: (data) => <Status data={data?.["status"]} enableAction
                onClick={() => {
                    dispatch(updateJobAction({ id: data.id, status: data?.["status"] === "ACTIVE" ? "INACTIVE" : "ACTIVE" }));
                    return true;
                }} />
        },
        {
            label: "Actions",
            type: "actions",
            rowActions: [
                {
                    name: 'update',
                    action: (data) => {
                        setInit(data);
                        setIsOpen(true);
                    }
                },
                {
                    name: 'delete',
                    action: (data) => {
                        dispatch(deleteJobAction(data.id));
                        return true;
                    }
                }
            ]
        },
    ];

    useEffect(() => {
        dispatch(fetchJobList());
    }, [dispatch]);

    const buttons = () => {
        return <>
            <Button label="Add" onClick={() => { setInit({ job_name: "", description: "" }); setIsOpen(true) }} />
        </>
    }

    const onSave = (data) => {
        if (data.id) {
            dispatch(updateJobAction(data));
        }
        else {
            dispatch(addJobAction(data));
        }
        setIsOpen(false);
        setInit({ job_name: "", description: "" })
    }

    return (
        <>
            <AdvanceSearch title="Job List" actions={buttons()}>
            </AdvanceSearch>
            <Table tableData={jobList} header={header} />
            <Toaster isOpen={error !== ""} message={message || "Authorization error"} error={error === "error"} />
            <Modal isOpen={isOpen} title="Job Category" onClose={() => { setIsOpen(false) }} >
                <Form onSave={onSave} init={init} />
            </Modal>
        </>
    )
}

export default JobList;