import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount);
  }

  //Setting the key of a component to the value that changes causes the
  //component to be re-evaluated when the value changes
  //This is a nice alternative to using useEffect to execute some code when some dependency changes
  //To use useEffect you'd have chosenCount as a dependency and then the function would calls setCounterChanges
  //(this would live in the Counter component (I've added it there, but commented it out
  //...but wouldn't there be another way of doing exactly this with useState or useReducer?
  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />

        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
