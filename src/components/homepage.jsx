export default function Homepage(props) {
  return (
    <div className="quizzical">
      <h1 className="quizzical-title">Quizzical</h1>
      <p className="quizzical-description">Test your knowledge🤓</p>
      <button className="quizzical-button" onClick={props.handleClick}>
        Start quiz
      </button>
    </div>
  );
}
