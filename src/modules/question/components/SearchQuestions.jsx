import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import apiClient from "../../../service/Axios";
import { QuestionList } from "../constants/UrlConstants";

export const SearchQuestions = forwardRef(({}, ref) => {
  const [text, setText] = useState("");
  const [options, setOptions] = useState([]);
  const [optionSelect, handleOptionSelect] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    getQuestions() {
      return optionSelect;
    },
    setOptionList(data) {
      const mappedArray = options
        .filter((obj) => data.includes(obj?.id))
        .map((obj) => ({ id: obj?.id, name: obj?.question_name }));
      handleOptionSelect(mappedArray || []);
    },
  }));

  const handleChange = async () => {
    try {
      const response = await apiClient.get(
        QuestionList + `?page=1&limit=5&question_name=${text}`
      );
      return response.data?.list || [];
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const time = setTimeout(async () => {
      setIsDropdownVisible(true);
      const data = await handleChange();
      setOptions(data);
    }, 300);
    return () => {
      clearTimeout(time);
    };
  }, [text]);

  return (
    <div
      className="p-4 min-h-100 border  border-bodydark1  bg-white
     dark:bg-form-input  dark:border-form-strokedark"
    >
      <p className="mb-4">
        Selected Questions :- {optionSelect?.length === 0 && "empty"}
      </p>
      {optionSelect?.length > 0 &&
        optionSelect.map((item, index) => {
          return (
            <div
              className="flex justify-between bg-bodydark1 p-2 dark:bg-body"
              key={index}
            >
              <p>{item?.name}</p>
              <span
                className="font-bold text-red-500 dark:text-white cursor-pointer text-title-xsm"
                onClick={() => {
                  const filteredOptions = optionSelect.filter(
                    (x) => x.id !== item?.id
                  );
                  handleOptionSelect(filteredOptions);
                }}
              >
                X
              </span>
            </div>
          );
        })}

      <input
        className="w-full dark:bg-form-input bg-transparent border-bodydark mt-4"
        type="text"
        value={text}
        onChange={(e) => setText(e.target?.value)}
        placeholder="Search here..."
      />

      {isDropdownVisible && (
        <ul className="relative w-full mt-1 bg-white dark:bg-bodydark2 rounded-lg shadow-lg z-10">
          {options.length > 0 ? (
            options.map((option, index) => (
              <li
                key={index}
                className="p-4 hover:bg-gray-100 cursor-pointer font-bold border-b-2"
                onClick={() => {
                  const newOptions = [...optionSelect];
                  const existingItem = newOptions.filter(
                    (x) => x.id === option.id
                  );
                  if (existingItem?.length > 0) {
                    console.log("already existing one");
                  } else {
                    newOptions.push({
                      id: option.id,
                      name: option.question_name,
                    });
                  }
                  handleOptionSelect(newOptions);
                }}
              >
                {option?.id} . {option.question_name}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
});
