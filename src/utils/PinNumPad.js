import React, {useState} from 'react';
import '../Common/NumPadStyle/NumPadStyle.css';
import AnimateButton from 'components/@extended/AnimateButton';
import Button from "@mui/material/Button";


const PinNumPad = () => {
  const [value, setValue] = useState('');

  const handleClick = (e) => {
    if (value.length < 4) {
      setValue(value + e.target.innerText);
    }
  };

  const handleClearClick = () => {
    setValue('');
  }

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      setValue(value.slice(0, -1));
    }
    else if (value.length < 4) {
      if (e.key >= '0' && e.key <= '9') {
        setValue(value + e.key);
      }
    }
  };

  const handleSubmit = async () => {
    console.log(value);
  }

  const handleBack = () => {
    setValue(value.slice(0, -1));
  };

  return (
    <div className="numpad-wrapper">
      <div className="display">
        <input placeholder="Enter user Pin" type="text" defaultValue={value} onKeyDown={handleKeyDown} tabIndex={0}/>
      </div>
      <div className="numpad-container">
        <div className="numpad-row">
          <button className="numpad-btn" onClick={handleClick}>7</button>
          <button className="numpad-btn" onClick={handleClick}>8</button>
          <button className="numpad-btn" onClick={handleClick}>9</button>
        </div>
        <div className="numpad-row">
          <button className="numpad-btn" onClick={handleClick}>4</button>
          <button className="numpad-btn" onClick={handleClick}>5</button>
          <button className="numpad-btn" onClick={handleClick}>6</button>
        </div>
        <div className="numpad-row">
          <button className="numpad-btn" onClick={handleClick}>1</button>
          <button className="numpad-btn" onClick={handleClick}>2</button>
          <button className="numpad-btn" onClick={handleClick}>3</button>
        </div>
        <div className="numpad-row">
          <button className="numpad-btn" onClick={handleClick}>0</button>
          <button className="action-button" onClick={handleBack}>&lt;</button>
          <button className="action-button" onClick={handleClearClick}>C</button>
        </div>

      </div>
          <AnimateButton>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color = 'info'
              sx={{ background: '#32beb9' }}
              onClick={handleSubmit}
              className="numpad-submit-btn"
            >
              Login
            </Button>
          </AnimateButton>

    </div>
  );
};

export default PinNumPad;