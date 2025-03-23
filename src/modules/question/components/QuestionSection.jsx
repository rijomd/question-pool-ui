import React from "react";

export const QuestionSection = ({
  question = {},
  selectItem = () => {},
  selectedAnswer = [],
}) => {
  const renderOptions = (options) => {
    const optionsArray = [];
    for (const item in options) {
      const isExist = selectedAnswer.some(
        (x) => x.id === question?.id && x.answer === item
      );
      optionsArray.push(
        <div className="p-1 w-full flex items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="1em"
            height="1em"
          >
            <path
              fill="currentColor"
              d="M7 5a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 6a1 1 0 1 0 0-2a1 1 0 0 0 0 2m1 5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m5-11a1 1 0 1 0 0-2a1 1 0 0 0 0 2m1 5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-1 7a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
            ></path>
          </svg>
          <p className="p-2 uppercase"> {item}</p>
          <div
            className={`flex cursor-pointer justify-between  w-full p-2 dark:bg-black rounded-lg  ${
              isExist ? "bg-success text-white dark:text-success" : "bg-white"
            }`}
            onClick={() => selectItem(question?.id, item)}
          >
            <p className="text-xs">{options?.[item]}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M7.326 18.092c-.327.275-.61.41-.906.408c-.68-.007-1.247-.703-2.38-2.094l-1.515-1.86c-.624-.766-.7-1.907-.185-2.767c.588-.984 1.717-1.259 2.596-.766M10.922 8.5a52 52 0 0 1 2.556-2.513A1.77 1.77 0 0 1 15 5.527m-.894 10.784c2.26-2.62 4.441-4.396 7.182-6.913c.82-.753.947-2.073.303-3.009c-.684-.994-1.983-1.193-2.863-.402c-2.51 2.255-4.463 4.427-6.315 6.748c-.098.122-.146.183-.197.217a.37.37 0 0 1-.416.003c-.051-.034-.1-.094-.197-.213l-.987-1.21c-.9-1.106-2.516-.983-3.268.246c-.527.861-.449 2.002.189 2.768l1.548 1.86c1.157 1.391 1.736 2.087 2.431 2.094s1.327-.725 2.59-2.189"
                color="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      );
    }
    return optionsArray;
  };

  return (
    <div className="flex justify-center items-center p-2 m-2 bg-blue-50 dark:bg-boxdark">
      <div className=" min-w-[300px] w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex p-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="1em"
            height="1em"
          >
            <path
              fill="currentColor"
              d="M5.25 4a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0m12 12a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M16 11.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5M17.25 4a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M10 17.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5M11.25 10a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M10 5.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5M5.25 16a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M4 11.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5"
            ></path>
          </svg>
          <p className="font-bold text-title-xs pl-2">{question?.jobName}</p>
        </div>
        {/* options */}
        <div className="p-1">
          <div className="bg-white w-full mb-2 dark:bg-black">
            <p className="text-xs p-3">{question?.question_name}</p>
          </div>
          {Object.keys(question?.mcq_options)?.length > 0 &&
            renderOptions(question?.mcq_options)}
        </div>
        {/* options */}
      </div>
    </div>
  );
};
