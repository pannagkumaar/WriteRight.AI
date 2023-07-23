import React from 'react';

import "../styles/WordSearch.css"


export default function WordSearch({words}) {
    
  if (words==='') {
    return null;
  }
  return (<section className="Grammar">
      <h3>Word Search Results</h3>
      <hr />
      <div className="result">
      {words &&<div className="definitions"><span>Suggestions : </span> {words}</div>}
      

      </div>
    </section>
);
}