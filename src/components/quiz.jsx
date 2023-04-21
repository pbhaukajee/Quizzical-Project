import React from "react";
import { nanoid } from "nanoid";
import { decode } from "he";

export default function Quiz(props) {
  //Part4- Creating buttons for answers
  const answerElement = props.answers.map((answer) => {
    //Part6a
    //Styling correct & incorrect answers
    let styles = "";
    if (props.checked) {
      if (answer === props.selected && answer === props.correctAnswer) {
        styles = { backgroundColor: "#94D7A2" };
      } else if (answer === props.correctAnswer) {
        styles = { backgroundColor: "#94D7A2" };
      } else if (answer === props.selected && answer !== props.correctAnswer) {
        styles = { backgroundColor: "#F8BCBC" };
      } else {
        styles = { backgroundColor: "" };
      }
    } else {
      styles = { backgroundColor: answer === props.selected ? "#D6DBF5" : "" };
    }

    return (
      <button
        className="btn-answer"
        key={answer}
        style={styles}
        onClick={() => props.selectAnswer(props.id, answer)}
      >
        {decode(answer)}
      </button>
    );
  });

  return (
    <div className="quiz">
      <div>
        <h1 className="quiz-question">{decode(props.question)}</h1>
        <div className="answer-element">{answerElement}</div>
        <div className="line"></div>
      </div>
    </div>
  );
}
