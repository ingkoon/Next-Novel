import React from "react";
import Modal from "react-modal";
import style from "./LoadingModal.module.css";

export default function LoadingModal({ state }) {
  return (
    <>
      <Modal
        isOpen={state}
        style={{
          overlay: {
            zIndex: "100",
          },
          content: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            inset: "0",
            background: "none",
          },
        }}
      >
        <div className={style["lds-grid"]}>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </Modal>
    </>
  );
}
