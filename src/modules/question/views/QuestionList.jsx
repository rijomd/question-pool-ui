import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table } from '../../../components/Table/Table';
import { HoverText } from '../../../components/utils/UtilsComponent';
import { AdvanceSearch } from '../../../components/formElements/AdvanceSearch';
import { Toaster } from '../../../components/modals/Toaster';
import { Button } from '../../../components/formElements/FormElements';
import { Modal } from '../../../components/modals/Modal';

import { Form } from '../components/Form';

import { addQuestionAction, fetchQuestionList, updateQuestionAction } from '../reducer/QuestionActions';
import { fetchJobList } from '../../job/reducer/JobActions';
import { alphabetToNumber } from '../../../service/Utils';
import { Filter } from '../components/Filter';

const question = { type: "", answerOption: "", question_name: "", question_answer: "", job_id: "", mcq_options: { 1: "" }, level: "" };

const QuestionList = ({ }) => {
    const { QuestionList, error, message } = useSelector((state) => state.question);
    const { jobCompo } = useSelector((state) => state.job);
    const dispatch = useDispatch();

    const [filter, setFilter] = useState({ limit: 10, page: 1 });
    const [isOpen, setIsOpen] = useState(false);
    const [init, setInit] = useState(question);

    const header = [
        {
            name: "question_name",
            label: "Name",
            type: "component",
            component: (data) => <HoverText data={data?.["question_name"]} />
        },
        {
            name: "createdAt",
            label: "Date",
            type: "date"
        },
        {
            name: "updatedAt",
            label: "Modified Date",
            type: "date"
        },
        {
            name: "type",
            label: "Type",
            type: "text"
        },
        {
            name: "jobName",
            label: "Job",
            type: "text"
        },
        {
            label: "Actions",
            type: "actions",
            rowActions: [
                {
                    name: 'update',
                    action: (data) => {
                        const options = Object.keys(data?.mcq_options)?.length > 0 ? alphabetToNumber({ ...data?.mcq_options }, 'object') : { 1: "" };
                        setInit(prev => {
                            return { ...data, mcq_options: options }
                        });
                        setIsOpen(true);
                    }
                }
            ]
        },
    ];

    useEffect(() => {
        dispatch(fetchJobList());
    }, []);

    useEffect(() => {
        dispatch(fetchQuestionList(filter));
    }, [filter]);

    const buttons = () => {
        return <>
            <Button label="Add" onClick={() => { setIsOpen(true) }} />
        </>
    }

    const onSave = (data) => {
        if (data.id) {
            dispatch(updateQuestionAction(data));
        }
        else {
            dispatch(addQuestionAction(data));
        }
        setInit({ ...question });
        setIsOpen(false);
    }


    return (
        <>
            <AdvanceSearch title="Questions List" actions={buttons()}>
                <Filter onSearch={(data) => setFilter({ ...filter, ...data })} />
            </AdvanceSearch>
            <Table
                tableData={QuestionList.list}
                header={header}
                total={QuestionList.total}
                page={filter.page}
                limit={filter.limit}
                onPageChange={(page) => { setFilter({ ...filter, page: page }); }}
            />
            <Toaster isOpen={error != ""} message={message || "Authorization error"} error={error === "error"} />
            <Modal isOpen={isOpen} title="Questions" onClose={() => { setIsOpen(false); setInit({ ...question }) }} >
                <Form onSave={onSave} init={init} jobCompo={jobCompo} />
            </Modal>
        </>
    )
}

export default QuestionList