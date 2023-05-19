import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import Snakegame from "../game/Snakegame.jsx";

type LoadingGameModalProps = {
  state: boolean;
};
export default function LoadingGameModal({ state }: LoadingGameModalProps) {
  return (
    <>
      <Modal
        isOpen={state}
        style={{
          overlay: {
            zIndex: "100",
          },
          content: {
            width: "700px",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#090909",
            margin: "auto",
            overflowX: "hidden",
            inset: "0",
          },
        }}
      >
        <Snakegame state="" />
      </Modal>
    </>
  );
}
