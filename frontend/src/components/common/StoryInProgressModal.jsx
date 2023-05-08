import React from "react";
import Modal from "react-modal";
import StoryInProgress from "../novelwrite/StoryInProgress";

export default function LoadingModal({ modalIsOpen, setModalIsOpen }) {
  const closemodal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closemodal}
        style={{
          overlay: {},
          content: {
            width: "80%",
            maxWidth: "608px",
            height: "380px",
            margin: "auto",
            padding: "0",
            borderRadius: "20px",
            border: "none",
            background: "none",
          },
        }}
      >
        <StoryInProgress closemodal={closemodal} />
      </Modal>
    </>
  );
}
