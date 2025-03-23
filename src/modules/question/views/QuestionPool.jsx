import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AdvanceSearch } from "../../../components/formElements/AdvanceSearch";
import { Button } from "../../../components/formElements/FormElements";
import { Filter } from "../components/Filter";
import { Table } from "../../../components/Table/Table";
import { HoverText } from "../../../components/utils/UtilsComponent";

import {
  addQuestionPoolAction,
  fetchQuestionPool,
  updateQuestionPoolAction,
} from "../reducer/QuestionActions";
import { Modal } from "../../../components/modals/Modal";
import PoolForm from "../components/PoolForm";

const pool = { question_name: "", questionList: [] };
const QuestionPool = () => {
  const { QuestionPool } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({ limit: 10, page: 1 });
  const [isOpen, setIsOpen] = useState(false);
  const [init, setInit] = useState(pool);

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
      label: "Actions",
      type: "actions",
      rowActions: [
        {
          name: "update",
          action: (data) => {
            setInit(data);
            setIsOpen(true);
          },
        },
      ],
    },
  ];

  useEffect(() => {
    dispatch(fetchQuestionPool(filter));
  }, [filter]);

  const buttons = () => {
    return (
      <>
        <Button
          label="Add"
          onClick={() => {
            setIsOpen(true);
          }}
        />
      </>
    );
  };

  const onSave = (formdata) => {
    if (formdata.id) {
      dispatch(updateQuestionPoolAction(formdata));
    } else {
      dispatch(addQuestionPoolAction(formdata));
    }
    setInit(pool);
    setIsOpen(false);
  };

  return (
    <div>
      <AdvanceSearch title="Question Pool" actions={buttons()}>
        <Filter
          onSearch={(data) => setFilter({ ...filter, ...data })}
          type="pool"
        />
      </AdvanceSearch>
      <Table
        tableData={QuestionPool.list}
        header={header}
        total={QuestionPool.total}
        page={filter.page}
        limit={filter.limit}
        onPageChange={(page) => {
          setFilter({ ...filter, page: page });
        }}
      />
      <Modal
        isOpen={isOpen}
        title="Info"
        onClose={() => {
          setIsOpen(false);
          setInit(pool);
        }}
      >
        <PoolForm onSave={onSave} init={init} />
      </Modal>
    </div>
  );
};

export default QuestionPool;
