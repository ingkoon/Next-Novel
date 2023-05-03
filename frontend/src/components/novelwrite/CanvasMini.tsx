import React from "react";

type CanvasMiniProps = {
  props: string;
};
export default function CanvasMini({ props }: CanvasMiniProps) {
  return (
    <>
      <img src={props} alt="dd" />
    </>
  );
}
