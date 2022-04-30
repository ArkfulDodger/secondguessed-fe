import React from "react";
import QRCode from "react-qr-code";

function QR(props) {
  return (
    <div className="qr">
      <span>scan below to join the current game:</span>

      <div className="qrContainer">
        <QRCode value="https://dashing-paletas-01a643.netlify.app/" />
      </div>
    </div>
  );
}

export default QR;
