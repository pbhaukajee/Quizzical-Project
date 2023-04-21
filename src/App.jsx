import React from "react";
import { nanoid } from "nanoid";
import BlobLeft from "./images/blob-left.png";
import BlobRight from "./images/blob-right.png";
import arrayShuffle from "array-shuffle";
import Homepage from "./components/homepage";
import Quiz from "./components/quiz";

export default function App() {
  const [screen, setScreen] = React.useState(false);
  const [quiz, setQuiz] = React.useState([]);
  const [allChecked, setAllChecked] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [newQuiz, setNewQuiz] = React.useState(false);

  //Part2 fetching data from API and mapped necessary data to set it to quiz
  React.useEffect(() => {
    async function getQuiz() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple"
      );
      const data = await res.json();
      setQuiz(
        data.results.map((q) => {
          return {
            id: nanoid(),
            question: q.question,
            answers: arrayShuffle([...q.incorrect_answers, q.correct_answer]),
            correctAnswer: q.correct_answer,
            selected: "",
            checked: false,
          };
        })
      );
    }
    getQuiz();
  }, [newQuiz]);

  //Part3- Mapping quiz data and setting it to quiz component
  const quizElements = quiz.map((q) => {
    return (
      <Quiz
        id={q.id}
        key={q.id}
        question={q.question}
        answers={q.answers}
        selected={q.selected}
        selectAnswer={selectAnswer}
        correctAnswer={q.correctAnswer}
        checked={q.checked}
        checkAnswer={q.checkAnswer}
      />
    );
  });

  //Part 5 Select Answer
  function selectAnswer(id, answer) {
    setQuiz((prevQuiz) =>
      prevQuiz.map((quiz) => {
        return quiz.id === id ? { ...quiz, selected: answer } : quiz;
      })
    );
  }

  //Part6b Check Answer
  function checkAnswer() {
    setQuiz((prevQuiz) =>
      prevQuiz.map((quiz) => {
        return { ...quiz, checked: true };
      })
    );
    let correct = 0;
    quiz.forEach((q) => {
      if (q.selected === q.correctAnswer) {
        correct += 1;
      }
    });
    setScore(correct);
    setAllChecked(true);
  }

  //Part8 Play Again
  function playAgain() {
    setScore(null);
    setNewQuiz((prevQuiz) => !prevQuiz);
    setAllChecked(false);
  }

  //Part9 setting display style
  const scoreStyle = { display: score === null ? "none" : "block" };
  const playAgainStyle = { display: score === null ? "none" : "block" };

  //Part1- Switching screen
  function switchScreen() {
    setScreen(!screen);
  }

  return (
    <main className="main-container">
      <img className="blob-left" src={BlobLeft} alt="Blob left" />
      <img className="blob-right" src={BlobRight} alt="Blob right" />
      {screen ? (
        <div>
          <div>{quizElements}</div>
          <div className="game-end">
            {allChecked ? (
              <div className="results">
                <span className="score" style={scoreStyle}>
                  You scored {score}/5 correct answers
                </span>
                <button
                  className="btn-playAgain"
                  style={playAgainStyle}
                  onClick={playAgain}
                >
                  {" "}
                  Play Again
                </button>
              </div>
            ) : (
              <button className="btn-checkAns" onClick={checkAnswer}>
                Check Answers
              </button>
            )}
          </div>
        </div>
      ) : (
        <Homepage handleClick={switchScreen} />
      )}
    </main>
  );
}
