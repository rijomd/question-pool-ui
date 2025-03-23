import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";

import { Table } from "../../../components/Table/Table";
import { HoverText } from "../../../components/utils/UtilsComponent";
import { AdvanceSearch } from "../../../components/formElements/AdvanceSearch";
import { Toaster } from "../../../components/modals/Toaster";
import { Button } from "../../../components/formElements/FormElements";
import { Modal } from "../../../components/modals/Modal";

import { Form } from "../components/Form";

import {
  addQuestionAction,
  bulkInsertQuestionAction,
  fetchQuestionList,
  updateQuestionAction,
} from "../reducer/QuestionActions";
import { fetchJobList } from "../../job/reducer/JobActions";
import { alphabetToNumber } from "../../../service/Utils";
import { Filter } from "../components/Filter";

const question = {
  type: "",
  answerOption: "",
  question_name: "",
  question_answer: "",
  job_id: "",
  mcq_options: { 1: "" },
  level: "",
};

const QuestionList = ({}) => {
  const { QuestionList, error, message } = useSelector(
    (state) => state.question
  );
  const { jobCompo } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({ limit: 10, page: 1 });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBulk, setIsOpenBulk] = useState(false);
  const [init, setInit] = useState(question);
  const [xlsxData, setXlsxData] = useState([]);
  const [fileName, setFileName] = useState("No files selected");

  const header = [
    {
      name: "question_name",
      label: "Name",
      type: "component",
      component: (data) => <HoverText data={data?.["question_name"]} />,
    },
    {
      name: "createdAt",
      label: "Date",
      type: "date",
    },
    {
      name: "updatedAt",
      label: "Modified Date",
      type: "date",
    },
    {
      name: "type",
      label: "Type",
      type: "text",
    },
    {
      name: "jobName",
      label: "Job",
      type: "text",
    },
    {
      label: "Actions",
      type: "actions",
      rowActions: [
        {
          name: "update",
          action: (data) => {
            const options =
              Object.keys(data?.mcq_options)?.length > 0
                ? alphabetToNumber({ ...data?.mcq_options }, "object")
                : { 1: "" };
            setInit((prev) => {
              return { ...data, mcq_options: options };
            });
            setIsOpen(true);
          },
        },
      ],
    },
  ];

  useEffect(() => {
    dispatch(fetchJobList());
  }, []);

  useEffect(() => {
    dispatch(fetchQuestionList(filter));
  }, [filter]);

  const buttons = () => {
    return (
      <>
        <div className="flex">
          <Button
            label="Add"
            onClick={() => {
              setIsOpen(true);
            }}
            className="mr-1"
          />
          <Button
            label="Bulk Insert"
            onClick={() => {
              setIsOpenBulk(true);
            }}
          />
        </div>
      </>
    );
  };

  const onSave = (data) => {
    if (data.id) {
      dispatch(updateQuestionAction(data));
    } else {
      dispatch(addQuestionAction(data));
    }
    setInit({ ...question });
    setIsOpen(false);
  };

  const handleSubmit = () => {
    dispatch(bulkInsertQuestionAction(xlsxData));
    setIsOpenBulk(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const processedData = jsonData.map((row) => {
        if (row?.mcq_options) {
          const answerArray = row.mcq_options.split(",");
          const answerKeyValue = answerArray.reduce((acc, value, index) => {
            const key = String.fromCharCode(97 + index);
            acc[key] = value.trim();
            return acc;
          }, {});

          row.mcq_options = JSON.stringify(answerKeyValue);
        }
        return row;
      });
      setXlsxData(processedData);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <AdvanceSearch title="Questions List" actions={buttons()}>
        <Filter
          onSearch={(data) => setFilter({ ...filter, ...data })}
          jobCompo={jobCompo}
        />
      </AdvanceSearch>
      <Table
        tableData={QuestionList.list}
        header={header}
        total={QuestionList.total}
        page={filter.page}
        limit={filter.limit}
        onPageChange={(page) => {
          setFilter({ ...filter, page: page });
        }}
      />
      <Toaster
        isOpen={error != ""}
        message={message || "Authorization error"}
        error={error === "error"}
      />
      <Modal
        isOpen={isOpen}
        title="Questions"
        onClose={() => {
          setIsOpen(false);
          setInit({ ...question });
        }}
      >
        <Form onSave={onSave} init={init} jobCompo={jobCompo} />
      </Modal>
      <Modal
        isOpen={isOpenBulk}
        title="Bulk Insert"
        onClose={() => {
          setIsOpenBulk(false);
          setFileName("No files selected");
        }}
      >
        <div className=" min-h-25">
          <p className="mt-1 mb-1">FIle Name : {fileName}</p>
          <input type="file" accept=".xlsx" onChange={handleFileUpload} />
          <Button onClick={handleSubmit} label={"Submit"} />
        </div>
      </Modal>
    </>
  );
};

export default QuestionList;
