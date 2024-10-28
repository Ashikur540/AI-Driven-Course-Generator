import useWindowSize from "@/hooks/use-window-size";
import React from "react";

import Confetti from "react-confetti";

export const ConfettiExplosion = () => {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} recycle={false} />;
};
