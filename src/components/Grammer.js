import React from 'react';

import "../styles/Grammar.css"


export default function Grammar({ grammar }) {
    
  if (!grammar) {
    return null;
  }
  return (<section className="Grammar">
      <h3>Grammar Check Result</h3>
      <hr />
      <div className="result">
      {grammar.correctness &&<div className="definitions"><span>Correctness: </span>The grammar you have used is {grammar.correctness}</div>}
      {grammar.wrongness &&<div className="definitions"><span>Why is it wrong? :</span>{grammar.wrongness}</div>}
      {grammar.suggestions &&<div className="definitions"><span>Suggestions: </span>{grammar.suggestions}</div>}
      {grammar.formal && <div className="definitions"><span> Formal version:</span> {grammar.formal}</div>}
      {grammar.casual && <div className="definitions"><span> Casual version:</span> {grammar.casual}</div>}
      {grammar.simple && <div className="definitions"><span> Simple version:</span> {grammar.simple}</div>}

      </div>
    </section>
);
}