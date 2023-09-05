import React from "react";

function QuestionItem({ question, onDelete, onUpdate}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:'DELETE',
    })
      .then(()=>{
        onDelete(question.id)
      })
  };

  const handleUpdate = (newCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex
      })
    })
      .then(r=>r.json())
      .then(()=>{
        onUpdate(question.id,newCorrectIndex)
      })
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
        defaultValue={correctIndex}
        onChange={(e)=>{
          const newCorrectIndex = parseInt(e.target.value,10);
          handleUpdate(newCorrectIndex);
        }}
        >
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
