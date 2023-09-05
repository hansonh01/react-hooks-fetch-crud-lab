import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
      .then(r=>r.json())
      .then(data => setQuestions(data))
  },[])

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions,newQuestion]);
  };

  const handleDeleteQuestion = (questionToBeDeleted) => {
    const updateQuestion = questions.filter((question)=> question.id !== questionToBeDeleted.id);

    setQuestions(updateQuestion);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onSubmitQuestion={handleAddQuestion} /> : <QuestionList questions={questions} onDeleteChange={handleDeleteQuestion} />}
    </main>
  );
}

export default App;