import React, { useEffect, useState } from "react";
import {
  Button,
  InputBox,
  SelectBox,
} from "../../../components/formElements/FormElements";
import { roleCompo } from "../constants/UrlConstants";

export const Form = ({
  onSave = () => {},
  init,
  jobCompo = [],
  QuestionPoolCompo = [],
}) => {
  useEffect(() => {
    setFormData(init);
    return () => {};
  }, [init]);

  const [formData, setFormData] = useState(init);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="lg:col-span-2 p-4">
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-3">
        <div className="xs:col-span-1">
          <InputBox
            name="email"
            onChange={handleChange}
            value={formData["email"]}
            placeholder="Email"
          />
        </div>
        <div className="xs:col-span-1">
          <InputBox
            name="name"
            onChange={handleChange}
            value={formData["name"]}
            placeholder="Name"
          />
        </div>
        {formData?.role !== "CANDIDATES" && (
          <div className="xs:col-span-1">
            <InputBox
              name="password"
              onChange={handleChange}
              value={formData["password"]}
              placeholder="Password"
            />
          </div>
        )}
        <div className="xs:col-span-1">
          <InputBox
            name="yearOfExp"
            onChange={handleChange}
            value={formData["yearOfExp"]}
            placeholder="Year Of Exp"
          />
        </div>
        <div className="xs:col-span-2">
          <SelectBox
            label="Role"
            options={roleCompo}
            name="role"
            onChange={handleChange}
            value={formData["role"]}
          />
        </div>
        <div className="xs:col-span-2">
          <SelectBox
            label="Job Category"
            options={jobCompo}
            name="job_id"
            onChange={handleChange}
            value={formData["job_id"]}
          />
        </div>
        <div className="xs:col-span-2">
          <SelectBox
            label="Question Pool"
            options={QuestionPoolCompo}
            name="question_pool_id"
            onChange={handleChange}
            value={formData["question_pool_id"]}
          />
        </div>
        <div className="xs:col-span-1 flex items-center p-1">
          <Button
            className="mr-1"
            label="Save"
            onClick={() => onSave(formData)}
          />
        </div>
      </div>
    </div>
  );
};
