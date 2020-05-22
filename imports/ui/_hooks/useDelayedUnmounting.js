import React from "react";

const useDelayedUnmounting = (time = 110) => {
  const [state, setState] = React.useState("mounted");
  const show = () => {
    if (state === "unmounting") {
      return;
    }
    setState("mounting");
  };
  const hide = () => {
    if (state === "mounting") {
      return;
    }
    setState("unmounting");
  };

  React.useEffect(() => {
    let timeoutId;
    if (state === "unmounting") {
      timeoutId = setTimeout(() => {
        setState("unmounted");
      }, time);
    } else if (state === "mounting") {
      timeoutId = setTimeout(() => {
        setState("mounted");
      }, time);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [state, time]);

  return [state, show, hide];
}

export default useDelayedUnmounting;
