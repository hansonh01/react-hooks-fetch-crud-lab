import React from "react";

function QuestionItem({ question, onDelete, onUpdateAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDeleteClick = () => {
    onDelete(id)
  };

  const handleUpdateAnswer = (e) => {
    onUpdateAnswer(id, parseInt(e.target.value,10));
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
        defaultValue={correctIndex} 
        onChange={handleUpdateAnswer}
        >{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;