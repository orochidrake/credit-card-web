import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
:root{
    --font-size-1: 1rem;
    --font-size-2: 1.2rem;
    --font-size-3: 1.4rem;
    --font-size-4: 1.6rem;
    --font-size-5: 2rem;

    --primary-color: #00A786;
    --primary-color-darker: #008465;
    --primary-color-lighter: rgba(155, 236, 195, .4);
    --danger-color: #e52e4d;
    --danger-color-lighter: rgba(229, 46, 77, .6);

    --background: #FFFFFF;
    --red:#e52e4d;
    --blue: #1563ff;
    --text: #324A6D;
    --border-color: #324A6D;
    --yellow: #ead62e;
    --dark-grey:#3c3c3c;
    --light-grey: #c0c0c0;
    --green: #00A786;
    --dark-green: #008465;
    --green-light: #9becc3;

    --select-border: var-(--light-grey);
    --select-focus: var(--text);
    --select-arrow: var(--select-border);
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    @media(max-width:1080px){
      font-size: 93.75%;
    }

    @media(max-width:71.25rem){
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;

  }

  body, input, textarea, button{
    font-family: "Poppins", sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4,h5, h6, strong {
    font-weight: 600;
  }

  button{
    cursor: pointer;
  }

  [disabled]{
    opacity:0.6;
    cursor: not-allowed;
  }

  .error-container {
    color: var(--red);
  }

  .errors-container {
    display: grid;
    grid-template-columns: 200px 1fr;
    text-align: left;
    color: var(--red);
  }

`

export default GlobalStyles
