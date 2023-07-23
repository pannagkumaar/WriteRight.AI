import React from "react";

export default function Image(props) {
  if (props.url && props.url.length > 0) {
    return (
      <div>
        <image src={props.url} >  </image>
      </div>
    );
  } else {
    return null;
  }
}