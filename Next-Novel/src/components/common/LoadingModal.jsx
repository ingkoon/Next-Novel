import React, { useEffect } from "react"
import Modal from "react-modal"

import Snakegame from "../game/Snakegame.jsx"

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
            width: "700px",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#090909",
            margin: "auto",
            overflowX : 'hidden'
          },
        }}
      >
        {/* <img src={process.env.PUBLIC_URL + `/img/loading.gif`} alt="loading" /> */}
        <Snakegame />
      </Modal>
    </>
  )
}
