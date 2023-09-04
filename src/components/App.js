import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const url = 'http://localhost:4000/questions/';
  const [page, setPage] = useState("List");
  const [questions, setQuestion] = useState([]);

  useEffect(()=>{
    fetch(url)
      .then(r=>r.json())
      .then(data=>{
        setQuestion(data)
      })
  },[])

  const handleAddQuestion = (newQuestion) => {
    setQuestion([...questions,newQuestion])
  }

  const handleDeleteQuestion = (deleteQuestion) => {
    const updateQuestion = questions.filter((question)=>question.id !== deleteQuestion)
    setQuestion(updateQuestion);
  }

  const handleUpdateCorrectAnswer = (questionId, newCorrectIndex) => {
    const updateQuestion = questions.map((question)=>{
      if(question.id === questionId){
        return {...question, correctIndex: newCorrectIndex}
      }
      return questions
    });
    setQuestion(updateQuestion);
  };


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddSubmit={handleAddQuestion}/> : <QuestionList questions={questions} onDelete={handleDeleteQuestion} onUpdate={handleUpdateCorrectAnswer}/>}
    </main>
  );
}

export default App;
