import React, { useState } from "react";

export default function Toggle() {
  let [changeText, setChangeText] = useState(true);
  const handleChange = () => {
    return setChangeText(!changeText);
  };

  return (
    <div>
      <button onClick={() => handleChange()}>click me</button>
      {changeText ? "" : "Banana"}
    </div>
  );
}