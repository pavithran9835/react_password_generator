import { useState } from "react";
import "./App.css";
import { numbers, uppercase, lowercase, symbols } from "./characters";
import { ToastContainer, toast } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import { copy_msg } from "./message";

function App() {
  const [password, setpassword] = useState("");
  const [passwordLength, setpasswordLength] = useState(30);
  const [includeuppercase, setincludeuppercase] = useState(true);
  const [includelowercase, setincludelowercase] = useState(true);
  const [includenumbers, setincludenumbers] = useState(true);
  const [includesymbols, setincludesymbols] = useState(true);

  const passwordLengthHandler = (e) => {
    if (e.target.value > 30) {
      notify("Generate less than 30 letters", true);
    } else {
      setpasswordLength(e.target.value);
    }
  };

  const generatePasswordHandler = (e) => {
    if (
      !includelowercase &&
      !includeuppercase &&
      !includenumbers &&
      !includesymbols
    ) {
      notify("select atleast one option", true);
    }

    let characterList = "";

    if (includelowercase) {
      characterList = characterList + lowercase;
    }

    if (includeuppercase) {
      characterList = characterList + uppercase;
    }
    if (includenumbers) {
      characterList = characterList + numbers;
    }
    if (includesymbols) {
      characterList = characterList + symbols;
    }

    setpassword(createPassword(characterList));
  };

  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };

  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.info(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const copyPasswordHandler = (e) => {
    if (password === "") {
      notify("Generate Password to Copy", true);
    } else {
      copyToClipboard();
      notify(copy_msg);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator_header">Password Generator</h2>

          <div className="generator_password">
            <h3>{password}</h3>
            <button onClick={copyPasswordHandler} className="copy_btn">
              <i className="far fa-clipboard"></i>
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="password-strength">Password Length</label>
            <input
              type="number"
              id="password-strngth"
              name="password-strngth"
              max="30"
              min="6"
              value={passwordLength}
              onChange={passwordLengthHandler}
              className="inputlength"
            />
          </div>
          <div className="form-group">
            <label htmlFor="uppercase-letters">Uppercase Letters</label>
            <input
              type="checkbox"
              id="uppercase-letters"
              name="uppercase-letters"
              checked={includeuppercase}
              onChange={(e) => {
                setincludeuppercase(e.target.checked);
              }}
              className="checkbox"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lowercase-letters">LowerCase Letters</label>
            <input
              type="checkbox"
              id="lowercase-letters"
              name="lowercase-letters"
              checked={includelowercase}
              onChange={(e) => {
                setincludelowercase(e.target.checked);
              }}
              className="checkbox"
            />
          </div>
          <div className="form-group">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input
              type="checkbox"
              id="include-numbers"
              name="include-numbers"
              checked={includenumbers}
              onChange={(e) => {
                setincludenumbers(e.target.checked);
              }}
              className="checkbox"
            />
          </div>
          <div className="form-group">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input
              type="checkbox"
              id="include-symbols"
              name="include-symbols"
              checked={includesymbols}
              onChange={(e) => {
                setincludesymbols(e.target.checked);
              }}
              className="checkbox"
            />
          </div>
          <button
            onClick={generatePasswordHandler}
            className="generator_button"
          >
            Generate Password
          </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
