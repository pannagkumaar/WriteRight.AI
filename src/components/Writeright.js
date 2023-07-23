import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import Grammer from "./Grammer";
import "../styles/Writeright.css";
import { process } from "./env.js";
import WordSearch from "./WordSearch";

export default function Writeright(props) {
  const [keyword, setKeyword] = useState(props.defaultKeyword);
  const [grammar, setGrammar] = useState("");
  const [check, setCheck] = useState("");
  const [english, setEnglish] = useState('');

  const [results, setResults] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [grammarCheckResult, setGrammarCheckResult] = useState(null);
  const [wordSearchResult, setwordSearchResult] = useState("");

  function handleOpenAIResponse(response) {
    // Extract the response content from OpenAI API's structure
    const responseData = JSON.parse(response.data.choices[0].message.content);
    setResults(responseData);
    console.log(responseData);

    searchPhotos();
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }
  function handleGrammarChange(event) {
    setGrammar(event.target.value);
  }
  function handleCheckChange(event) {
    setCheck(event.target.value);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    if (keyword.trim() !== "") {
      // Perform the search only if the keyword is not empty
      search();
    }
  }

  function search() {
    // Your OpenAI API key and URL
    const apiKey = process.OpenAI_key;
    const openAIUrl = "https://api.openai.com/v1/chat/completions";

    const systemMessage = `you are a dictionary application. When a user provides a word, respond with information about that word in this format: {"word": "${keyword}", "phonetic": "həˈləʊ", "phonetics": [{"text": "həˈləʊ", "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3"}, {"text": "hɛˈləʊ"}], "origin": "early 19th century: variant of earlier hollo ; related to holla.", "meanings": [{"partOfSpeech": "exclamation","definitions": [{"definition": "used as a greeting or to begin a phone conversation.","example": "hello there, Katie!","synonyms": [],"antonyms": []}]},{"partOfSpeech": "noun","definitions": [{"definition": "an utterance of ‘hello’; a greeting.","example": "she was getting polite nods and hellos from people","synonyms": [],"antonyms": []}]},{"partOfSpeech": "verb","definitions": [{"definition": "say or shout ‘hello’.","example": "I pressed the phone button and helloed","synonyms": [],"antonyms": []}]}]}`;
    axios
      .post(
        openAIUrl,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: systemMessage,
            },
            {
              role: "user",
              content: keyword,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(handleOpenAIResponse);
  }

  function searchPhotos() {
    // const pexelsApiKey =
    const pexelsApiKey = process.PexelsApi_key;
    const pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;

    axios
      .get(pexelsApiUrl, {
        headers: {
          Authorization: pexelsApiKey,
        },
      })
      .then(handlePexelsResponse);
  }

  function handlePexelsResponse(response) {
    console.log(response.data.photos)
    setPhotos(response.data.photos);
  }

  function handleGrammarCheck() {
    //OpenAI API key and URL
    const apiKey = process.OpenAI_key;
    const openAIUrl = "https://api.openai.com/v1/chat/completions";

    const systemMessage = `You are a grammar checker application operating in the ${english} english . When a user provides a sentence, respond with information about the grammar correctness in this format '{"correctness":"tell if the sentence is correct or not correct here","wrongness":"here tell why the given sentence is not correct if it is not correct","suggestions":"suggest what all changes can be made to the sentence to correct it or make it more fluent","formal":"here give the formal version of the sentence","casual":"here give the casual version of the sentence ","simple":"a simpler way to use the sentence"}' ### example:i want to go to bed response: '{"correctness":"correct","wrongness":"","suggestions":"","formal":"I want to go to bed.","casual":"I wanna go to bed.","simple":"I want to sleep."}'   `;

    axios
      .post(
        openAIUrl,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: systemMessage,
            },
            {
              role: "user",
              content: grammar,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(handleGrammarCheckResponse);
  }

  function handleGrammarCheckResponse(response) {
    // Extracting the response content from OpenAI
    // console.log(response.data.choices[0].message.content);
    let responseData = JSON.parse(response.data.choices[0].message.content);
    setGrammarCheckResult(responseData);
  }

  function handleWordSearch() {
    //OpenAI API key and URL
    const apiKey = process.OpenAI_key;
    const openAIUrl = "https://api.openai.com/v1/chat/completions";

    const systemMessage = `when prompted with a description you are to try to figure out what the user is trying to say and you are going to take the context and you are gonna give a set of words that are relavant to be used as the user intends to use and keep then in order of priority of the prompt by user  ### for example if user says a word for greeting a person which is neither too casual nor too formal you are to give in this format "Hello!, Hi, or Hey!, Howdy!, Greetings!, Hey there!, Good day!, Salutations!" ### and if the user asks for a word which is rhyming with sky and the word is sad you are supposed to give "Cry, Die, Sigh, Why, Goodbye"  `;

    axios
      .post(
        openAIUrl,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: systemMessage,
            },
            {
              role: "user",
              content: check,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(handleWordSearchResponse);
  }
  function handleWordSearchResponse(response) {
    // Extracting the response content from OpenAI

    let responseData = response.data.choices[0].message.content;
    setwordSearchResult(responseData);
    console.log(responseData);
    console.log(typeof responseData);
  }
  function handleWordSearchSubmit(event) {
    event.preventDefault();
    if (check.trim() !== "") {
      // Perform the grammar check only if the keyword is not empty
      handleWordSearch();
    }
  }
  function handleGrammarCheckSubmit(event) {
    event.preventDefault();
    if (grammar.trim() !== "") {
      // Perform the grammar check only if the keyword is not empty
      setEnglish(document.getElementById("language").value);
      // console.log(english)
      handleGrammarCheck();
    }
  }

  return (
    <div className="Writeright">
      <section>
        <div className="subheading">Search a word</div>
        <form onSubmit={handleSearchSubmit}>
          <input
            className="search"
            type="search"
            onChange={handleKeywordChange}
            placeholder=" Enter the word that you want to search"
          />
          <input
            type="submit"
            value="Search"
            className="search-button"
            onClick={handleSearchSubmit}
          />
        </form>
        <div className="suggestions">
          Suggestions : electrolysis, pneumonia, dystopia...
        </div>
      </section>

      {/* Displaying the results and photos below when available */}
      {results && <Results results={results} />}
      {photos && <Photos photos={photos} />}

      <section>
        <div className="subheading">Check the grammar</div>
        <form onSubmit={handleGrammarCheckSubmit}>
          <input
            className="search"
            type="search"
            placeholder=" Enter a sentence to check the grammar"
            onChange={handleGrammarChange}
          />
          <input type="submit" value="Check" className="search-button" />
        <div className="suggestions">
          <select id="language">
            <option value="American">en-US</option>
            <option value="British">en-UK</option>
            <option value="Austrailan">en-AU</option>

          </select>
          Suggested "I am the strongest man alive"
        </div>
        </form>
      </section>

      {grammarCheckResult && <Grammer grammar={grammarCheckResult} />}

      <section>
        <div className="subheading">Search for a word</div>
        <form onSubmit={handleWordSearchSubmit}>
          <input
            className="search"
            type="search"
            placeholder=" Enter a sentence to check the grammar"
            onChange={handleCheckChange}
          />
          <input type="submit" value="Check" className="search-button" />
        </form>
        <div className="suggestions">
          words that rhyme with 'moon' and have a mysterious or enchanting
          connotation
        </div>
      </section>
      {wordSearchResult && <WordSearch words={wordSearchResult} />}
    </div>
  );
}
