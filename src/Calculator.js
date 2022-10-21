import React, { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperatorButton from "./OperatorButton";


// action types
export const ACTIONS = {
  ALL_CLEAR: "all-clear",
  DELETE: "delete",
  SET_OPERATOR: "set-operator",
  APPEND_DIGIT: "append-digit",
  EVALUATE: "evaluate",
};


// reducer function to manage the state
function reducer(state, { type, payload }) {
  // console.log("inside reducer func");
  switch (type) {
    case ACTIONS.APPEND_DIGIT:
      if (state.overWrite) {
        return {
          ...state,
          currOperand: payload.digit,
          overWrite: false,
        };
      }

      if (state.currOperand === "0" && payload.digit === "0") return state;

      if (state.currOperand === "0") {
        return {
          ...state,
          currOperand: payload.digit,
        };
      }

      if(payload.digit === "." && state.currOperand.includes("."))
      {return state;}

      return {
        ...state,
        currOperand: `${state.currOperand || ""}${payload.digit}`,
      };

    case ACTIONS.DELETE:
      if (!state.currOperand && !state.prevOperand) {
        return state;
      }

      if (!state.currOperand && state.prevOperand && state.operator) {
        return {
          operator: undefined,
          currOperand: state.prevOperand,
          prevOperand: "",
        };
      }

      if (state.currOperand) {
        return {
          ...state,
          currOperand: state.currOperand.toString().slice(0, -1),
        };
      }

    case ACTIONS.ALL_CLEAR:
      return {};

    case ACTIONS.SET_OPERATOR:
      if (!state.currOperand && !state.prevOperand) return state;

      if (state.prevOperand && !state.currOperand) {
        // console.log("ins set oper");
        return {
          ...state,
          operator: payload.operator,
        };
      }

      if (state.prevOperand && state.currOperand) {
        return {
          prevOperand: evaluate(state),
          currOperand: "",
          operator: payload.operator,
        };
      }

      return {
        prevOperand: state.currOperand,
        operator: payload.operator,
        currOperand: "",
      };

    case ACTIONS.EVALUATE:
      if (!state.currOperand || !state.prevOperand || !state.operator) {
        return state;
      }

      return {
        currOperand: "",
        operator: null,
        currOperand: evaluate(state),
        overWrite: true,
      };

    default:
      return state;
  }
}


// to make computation based on the input
function evaluate({ prevOperand, currOperand, operator }) {
  const prev = parseFloat(prevOperand);
  const curr = parseFloat(currOperand);

  let computation;
  if (isNaN(prev) || isNaN(curr)) {
    return "";
  }

  switch (operator) {
    case "+":
       (computation = prev + curr);
       break

    case "-":
       (computation = prev - curr);
       break

    case "/":
       (computation = prev / curr);
       break

    case "*":
       (computation = prev * curr);
       break;
      }
      return computation.toString()
}

function Calculator() {

  // v r using useReducer react hook to manage state
  const [{ currOperand, prevOperand, operator }, dispatch] = useReducer(
    reducer,
    {}
  );
  // console.log(
  //   "currOperand:",
  //   currOperand,
  //   "prevOperand:",
  //   prevOperand,
  //   "operator:",
  //   operator
  // );
   
  // ui of the app
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="prev-operand">
          {prevOperand} {operator}
        </div>
        <div className="curr-operand">{currOperand}</div>
      </div>

      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.ALL_CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>

      <OperatorButton operator="/" dispatch={dispatch} />

      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />

      <OperatorButton operator="*" dispatch={dispatch} />

      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />

      <OperatorButton operator="+" dispatch={dispatch} />

      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />

      <OperatorButton operator="-" dispatch={dispatch} />

      <DigitButton digit="0" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />

      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default Calculator;
