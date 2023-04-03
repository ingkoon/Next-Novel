import React from "react";
import Modal from "react-modal";

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
        <img src={process.env.PUBLIC_URL + `/img/loading.gif`} alt="loading" />
      </Modal>
    </>
  );
}
