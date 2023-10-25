import { memo, useCallback, useMemo, useState } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

export default function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);

  //useMemo is like memo, but memo is for component functions (ie. functions that return a component) and
  //useMemo is for "normal" functions that are executed within component functions.
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount],
  );

  const [counter, setCounter] = useState(initialCount);

  //Using "useCallback" here as the functions handleDecrement and handleIncrement are nested
  //within the counter function, which is re-evaluated every time initialCount changes.
  //Once the Counter function is re-evaluated then the "handle" functions are also re-created.
  //These functions are passed to the IconButton as props (onClick).
  //This means that the IconButtons are re-rendered whenever the initial count is changed
  //UseCallback memoizes the function unless the dependencies change.
  //In this case there are no dependencies.
  //The setCounter method is guaranteed by React never to change (since it is created using "useState").
  const handleDecrement = useCallback(function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
}
