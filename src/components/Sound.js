import React from "react";
import "../styles/Sound.css";

export default function Audio(props) {
  function handleClick() {
    const audioElement = document.createElement('audio');
    audioElement.src = props.audioUrl;
    audioElement.play();
  }

  return (
    <div className="button">
      <button
        data-playing="false"
        role="switch"
        aria-checked="false"
        onClick={handleClick}
      >
        <i className="icon fas fa-volume-up"></i>
      </button>
    </div>
  );
}
