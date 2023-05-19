import React, { useState } from "react";
import Modal from "react-modal";
import Login from "../login/Login";
import Regist from "../login/Regist";

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
  const [loginOrRegist, setLoginOrRegist] = useState("login");

  return (
    <Modal
      closeTimeoutMS={200}
      isOpen={modalIsOpen}
      onRequestClose={() => {
        closemodal();
        setTimeout(function() {
          setLoginOrRegist("login");
        }, 500);
      }}
      style={{
        overlay: {
          zIndex: "100",
        },
        content: {
          width: "360px",
          height: "500px",
          margin: "auto",
          padding: "0",
          borderRadius: "20px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
          inset: "0",
          border: "none",
        },
      }}
    >
      {loginOrRegist === "login" && (
        <Login
          move={() => setLoginOrRegist("regist")}
          closemodal={closemodal}
        />
      )}
      {loginOrRegist === "regist" && (
        <Regist move={() => setLoginOrRegist("login")} />
      )}
    </Modal>
  );
}
