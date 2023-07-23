import React from "react";
import Synonyms from "./Synonyms";
import "../styles/Meaning.css";
import Antonyms from "./Antonyms";
// import { Configuration, OpenAIApi } from "openai";
import  { useState } from 'react';
// import Image from "./Image";
export default function Meaning(props) {
  const { partOfSpeech, definitions } = props.meanings;


  // const [prompt, setPrompt] = useState("");
  // const [imgresults, setImgResult] = useState("");
  // const [loading, setLoading] = useState(false);
  // const configuration = new Configuration({
  //   apiKey: "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",
  // });
  // const openai = new OpenAIApi(configuration);
  // const generateImage = async (prompt) => {
  //   // setPlaceholder(`Search ${prompt}..`);
  //   setLoading(true);
  //   const res = await openai.createImage({
  //     prompt: prompt,
  //     n: 1,
  //     size: "512x512",
  //   });
  //   setLoading(false);
  //   setImgResult(res.data.data[0].url);
  // };
  return (
    <div className="Meaning">
      <section>
        <h3>{partOfSpeech}</h3>
        <hr />
        {definitions.map(({ definition, example, synonyms, antonyms }, index) => (
          <div key={index}>
            <div className="definition"><span>Def: </span>{definition}</div>
            {example && <div className="example"><em>{example}</em> </div>}
           {/* {imgresults && <div className="image"><Image url={imgresults}/></div> } */}
            {synonyms && <div className="synonyms"><Synonyms synonyms={synonyms} /></div>}
            {antonyms && <div className="antonyms"><Antonyms antonyms={antonyms}/></div>}
          </div>
        ))}
      </section>
    </div>
  );
}
