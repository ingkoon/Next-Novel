import React from "react";
import Modal from "react-modal";
import StoryInProgress from "../novelwrite/StoryInProgress";

type StoryInProgressModalProps = {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function StoryInProgressModal({
  modalIsOpen,
  setModalIsOpen,
}: StoryInProgressModalProps) {
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
        <StoryInProgress />
      </Modal>
    </>
  );
}
