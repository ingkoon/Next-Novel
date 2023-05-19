import React from "react";
import Modal from "react-modal";
import style from "./LoadingModal.module.css";

type LoadingModalProps = {
  state: boolean;
};
export default function LoadingModal({ state }: LoadingModalProps) {
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
            padding: "0",
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
