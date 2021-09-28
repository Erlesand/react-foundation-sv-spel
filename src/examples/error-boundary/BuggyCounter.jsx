import { useEffect, useState } from "react";

const BuggyCounter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (counter === 5) {
      throw new Error("Oh my god, I crashed the app!");
    }
  }, [counter]);

  return <h3 onClick={() => setCounter(counter + 1)}>{counter}</h3>;
};

export default BuggyCounter;
