import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchQuestionList,
  fetchQuestionPool,
} from "../reducer/QuestionActions";
import { getUser } from "../../../service/AuthMethods";
import { SUBMIT_ANSWERS } from "../components/mutation";
import { QuestionSection } from "../components/QuestionSection";
import { Button } from "../../../components/formElements/FormElements";

const AnswerPool = () => {
  const dispatch = useDispatch();
  const { QuestionList, QuestionPool, isLoadQuestionList, loading } =
    useSelector((state) => state.question);
  const [submitAnswers, { data: mutationData }] = useMutation(SUBMIT_ANSWERS);
  const [selectedAnswer, setSelectedAnswer] = useState([]);

  useEffect(() => {
    const user = getUser();
    if (user?.questionPoolId) {
      dispatch(
        fetchQuestionPool({ limit: 1, page: 1, pool_id: user?.questionPoolId })
      );
    }
  }, []);

  useEffect(() => {
    if (QuestionPool?.list?.[0].questionList?.length > 0) {
      dispatch(
        fetchQuestionList({
          id_list: QuestionPool?.list?.[0].questionList,
          limit: 20,
          page: 1,
        })
      );
    }
  }, [isLoadQuestionList]);

  const handleSubmit = () => {
    submitAnswers({
      variables: {
        answers: selectedAnswer,
        userName: getUser()?.email,
      },
    });
  };

  const selectItem = (id, item) => {
    const array = [...selectedAnswer];
    if (array?.length > 0) {
      const index = array.findIndex((x) => x.id == id);
      if (index !== -1) {
        if (array[index].answer === item) {
          return null;
        } else {
          array[index].answer = item;
        }
      } else {
        array.push({ id, answer: item });
      }
      setSelectedAnswer(array);
    } else {
      array.push({ id: id, answer: item });
      setSelectedAnswer(array);
    }
  };

  return (
    <div className="p-4">
      {!loading && (
        <>
          <h3 className="font-bold text-3xl pb-2 uppercase">
            {QuestionPool?.list?.[0]?.question_name}
          </h3>
          <p className="pb-2">
            You can practice these MCQs chapter by chapter starting from the 1st
            chapter or you can jump to any chapter of your choice.
          </p>
          <hr className="mb-6 " />
          {QuestionList?.list?.length > 0 &&
            QuestionList?.list?.map((x, i) => {
              return (
                <QuestionSection
                  key={i}
                  question={x}
                  selectItem={selectItem}
                  selectedAnswer={selectedAnswer}
                />
              );
            })}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-primary text-white mt-4"
              label="Submit"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AnswerPool;
