import { gql } from "@apollo/client";

export const SUBMIT_ANSWERS = gql`
  mutation submitAnswers($answers: [AnswerDto!], $userName: String) {
    submitAnswers(answers: $answers, userName: $userName)
  }
`;
