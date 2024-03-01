import React, { useEffect, useRef, useState } from "react";

function DoubleAuthPage() {
  const [code, setCodeState] = useState(['', '', '', '', '', '']);
  const [focusedInputIndex, setFocusedInputIndex] = useState(0);

  const inputRefs = useRef([]);

  const handleChange = (event, index) => {
    const newCode = code.map((digit, index2) => {
      return index2 === index ? event.target.value : digit;
    });

    setCodeState(newCode);
    setFocusedInputIndex(prevIndex => prevIndex + 1);
  }

  useEffect(() => {
    const checkCodeIsValidAsync = async () => {
      const response = await fetch("http://localhost:3300/double-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code.join('') }),
      });
  
      const codeIsValid = await response.json();
  
      if (codeIsValid) {
        window.location = "https://dribbble.com";
      } else {
        setCodeState(['', '', '', '', '', '']);
        setFocusedInputIndex(0);
        inputRefs.current.forEach(input => {
          input.className = 'buzz';
        });
  
        setTimeout(() => {
          inputRefs.current.forEach(input => {
            input.className = '';
          });
        }, 550)
      }
    };

    if (focusedInputIndex === 6) {
      checkCodeIsValidAsync();
    } else if (inputRefs.current[focusedInputIndex]) {
        inputRefs.current[focusedInputIndex].focus();
    }
  }, [code, focusedInputIndex])

  return (
    <>
      <div id="db-auth-container">
        <div id="db-auth-text">
          Please enter the code you received by email at the following address :
          t********n@g*****.com.
        </div>
        <div id="db-auth-code-container">
          {code.map((char, index) => (
            <input
              id={`db-auth-code-input-${index}`}
              type="number"
              ref={(ref) => inputRefs.current[index] = ref}
              key={index}
              value={code[index] ?? ''}
              className=""
              onChange={(event) => handleChange(event, index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default DoubleAuthPage;
