import React from "react";
import Modal from "react-modal";
import Login from "../login/Login";

type LoginModalProps = {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function LoginModal({
  modalIsOpen,
  setModalIsOpen,
}: LoginModalProps) {
  const closemodal = () => {
    setModalIsOpen(false);
  };

  return (
    <Modal
      closeTimeoutMS={200}
      isOpen={modalIsOpen}
      onRequestClose={closemodal}
      style={{
        overlay: {
          zIndex: "100",
        },
        content: {
          width: "400px",
          height: "500px",
          margin: "auto",
          padding: "0",
          borderRadius: "20px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Login />
    </Modal>
  );
}
