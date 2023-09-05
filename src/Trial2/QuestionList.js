import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, onDeleteChange}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questions.map((question)=>(
          <QuestionItem 
          question={question} 
          key={question.id}
          onDeleteChange={onDeleteChange}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;