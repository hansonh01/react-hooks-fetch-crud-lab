import React, { useEffect, useState } from "react";
import QuestionItem from './QuestionItem';

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
      .then(r=>r.json())
      .then(data=>setQuestions(data))
  },[])

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`,{
      method:'DELETE',
    })
      .then(r=>r.json())
      .then(()=>{
        const updateQuestions = questions.filter((question)=>question.id !== id);
        setQuestions(updateQuestions);
      })
  };

  const handleUpdateAnswer = (id,correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"PATCH",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({correctIndex}),
    })
      .then((r)=>r.json())
      .then((data)=>{
        const updateAnswer = questions.map((question)=>{
          if(question.id === id){
            return data;
          }
          return questions;
        })
        setQuestions(updateAnswer);
      })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questions.map((question)=>(
          <QuestionItem key={question.id} question={question} onDelete={handleDelete} onUpdateAnswer={handleUpdateAnswer}/>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;