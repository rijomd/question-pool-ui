import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  InputBox,
} from "../../../components/formElements/FormElements";
import { SearchQuestions } from "./SearchQuestions";

const PoolForm = ({ onSave = () => {}, init }) => {
  const [formData, setFormData] = useState({});
  const searchRef = useRef(null);

  useEffect(() => {
    setFormData({ ...init });
    if (searchRef) {
      searchRef.current.setOptionList(init?.questionList || []);
    }
    return () => {};
  }, [init]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const lists = searchRef.current?.getQuestions();
    if (formData["question_name"] && lists?.length > 0) {
      const data = {
        ...formData,
        question_name: formData["question_name"],
        questionList: lists.map((x) => x.id),
      };
      onSave(data);
    }
  };

  return (
    <div className="lg:col-span-2 p-4">
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-1">
        <div className="xs:col-span-1">
          <InputBox
            name="question_name"
            onChange={handleChange}
            value={formData["question_name"]}
            placeholder="Question Pool Name"
          />
        </div>
        <div className="xs:col-span-1">
          <SearchQuestions ref={searchRef} />
        </div>
        <div className="">
          <Button onClick={handleSave} label="Save" />
        </div>
      </div>
    </div>
  );
};

export default PoolForm;
