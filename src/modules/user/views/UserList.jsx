import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table } from "../../../components/Table/Table";
import { Status } from "../../../components/utils/UtilsComponent";
import { AdvanceSearch } from "../../../components/formElements/AdvanceSearch";
import { Filter } from "../components/Filter";
import { Toaster } from "../../../components/modals/Toaster";
import { Button } from "../../../components/formElements/FormElements";
import { Modal } from "../../../components/modals/Modal";

import { fetchJobList } from "../../job/reducer/JobActions";
import {
  addUserAction,
  fetchUserData,
  updateUserAction,
} from "../reducer/UserActions";
import { Form } from "../components/Form";
import { fetchQuestionPool } from "../../question/reducer/QuestionActions";

const user = {
  name: "",
  email: "",
  yearOfExp: "",
  role: "",
  job_id: "",
  password: "",
  question_pool_id: "",
};
const UserList = ({}) => {
  const { userData, total, error, message } = useSelector(
    (state) => state.user
  );
  const { jobCompo } = useSelector((state) => state.job);
  const { QuestionPoolCompo } = useSelector((state) => state.question);

  const dispatch = useDispatch();

  const [filter, setFilter] = useState({ limit: 10, page: 1 });
  const [isOpen, setIsOpen] = useState(false);
  const [init, setInit] = useState(user);

  const header = [
    {
      name: "name",
      label: "Name",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "text",
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
      name: "role",
      label: "Role",
      type: "text",
    },
    {
      name: "score",
      label: "Score",
      type: "component",
      component: (data) => <span>{data?.["score"] || "-"}</span>,
    },
    {
      name: "status",
      label: "Status",
      type: "component",
      component: (data) => (
        <Status
          data={data?.["status"]}
          enableAction
          onClick={() => {
            dispatch(
              updateUserAction({
                id: data.id,
                status: data?.["status"] === "ACTIVE" ? "INACTIVE" : "ACTIVE",
              })
            );
            return true;
          }}
        />
      ),
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
    dispatch(fetchJobList());
    dispatch(fetchQuestionPool({ limit: 1000, page: 1 }));
  }, []);

  useEffect(() => {
    dispatch(fetchUserData(filter));
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
      dispatch(updateUserAction(formdata));
    } else {
      dispatch(addUserAction(formdata));
    }
    setInit(user);
    setIsOpen(false);
  };

  return (
    <>
      <AdvanceSearch title="User List" actions={buttons()}>
        <Filter onSearch={(data) => setFilter({ ...filter, ...data })} />
      </AdvanceSearch>
      <Table
        tableData={userData}
        header={header}
        total={total}
        page={filter.page}
        limit={filter.limit}
        onPageChange={(page) => {
          setFilter({ ...filter, page: page });
        }}
      />
      <Toaster
        isOpen={error !== ""}
        message={message || "Authorization error"}
        error={error === "error"}
      />
      <Modal
        isOpen={isOpen}
        title="User Info"
        onClose={() => {
          setIsOpen(false);
          setInit(user);
        }}
      >
        <Form
          onSave={onSave}
          init={init}
          jobCompo={jobCompo}
          QuestionPoolCompo={QuestionPoolCompo}
        />
      </Modal>
    </>
  );
};

export default UserList;
