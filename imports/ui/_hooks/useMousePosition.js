import { useEffect, useState } from "react";

const useMousePosition = (defaultPosition) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const setFromEvent = e => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);
    window.addEventListener("touchmove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
      window.removeEventListener("touchmove", setFromEvent);
    };
  }, []);
  return position;
};

export default useMousePosition;
