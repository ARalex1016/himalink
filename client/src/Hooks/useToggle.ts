import { useState } from "react";

const UseToggle = (initialState: boolean = false) => {
  const [state, setState] = useState(initialState);

  const toggle = () => setState((pre) => !pre);

  const open = () => {
    setState(true);
  };

  const close = () => {
    setState(false);
  };

  return { state, toggle, open, close };
};

export default UseToggle;
