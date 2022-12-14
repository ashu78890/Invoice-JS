import React, { useState } from "react";
import styled from "styled-components"; 
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";

const Input = styled.input.attrs(props => {
    const {theme: {size,text,color,bordersize}} = props;

    return{
        size:size[props.size]|| size.ex4lg,
        bordersize: bordersize[props.bordersize]|| bordersize.md,
    }
})`
font-size: ${props => props.size};

height: 50px;
 width: 100%;
  border: 2px solid #aaa;
  border-radius: 4px;
  margin: 8px 0;
  padding: 8px;
  box-sizing: border-box;
  padding-left: 50px;

  :focus-visible {
      border-color: black;
      box-shadow: 0 0 8px 0 black;
    }

    
 

`
const StyleInput = styled.div`
   
    position: relative;
   
   .left-icon {
    position: absolute;
    left: 5px;
    top: 25%;
    svg {
      transition: 0.3s;
    }
  } 
    input:focus-visible  {
        ~.left-icon {
          color: green;
        }
      }
      input:focus-visible{
      color: blue;
    } 
   
 
`;


 const Temp = () => {

  return (
    <ThemeProvider theme={theme}>
      <h1>sbjbhsb</h1>
    <form>
      <StyleInput >
        <Input
          type="text"
          placeholder="Search"
        />
        <div className="left-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="36px"
            height="36px"
          >
            <path fill="currentColor" d="M 13.261719 14.867188 L 15.742188 17.347656 C 15.363281 18.070313 15.324219 18.789063 15.722656 19.1875 L 20.25 23.714844 C 20.820313 24.285156 22.0625 23.972656 23.015625 23.015625 C 23.972656 22.058594 24.285156 20.820313 23.714844 20.25 L 19.191406 15.722656 C 18.789063 15.324219 18.070313 15.363281 17.347656 15.738281 L 14.867188 13.261719 Z M 8.5 0 C 3.804688 0 0 3.804688 0 8.5 C 0 13.195313 3.804688 17 8.5 17 C 13.195313 17 17 13.195313 17 8.5 C 17 3.804688 13.195313 0 8.5 0 Z M 8.5 15 C 4.910156 15 2 12.089844 2 8.5 C 2 4.910156 4.910156 2 8.5 2 C 12.089844 2 15 4.910156 15 8.5 C 15 12.089844 12.089844 15 8.5 15 Z" />
          </svg>
        </div>

      </StyleInput>
    </form>
    </ThemeProvider>
  );
};

export default Temp
