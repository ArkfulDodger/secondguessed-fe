import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";

function Footer(props) {
  return (
    <div className="footer grid-item8">
      <p>
        Designed & built by Jasmine Elkins&nbsp;
        <a
          href="https://github.com/jasmineelkins"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="icon" />
        </a>
        &nbsp;& Noah Reece&nbsp;
        <a
          href="https://github.com/ArkfulDodger/secondguessed-fe"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="icon" />
        </a>
        &nbsp; | &nbsp; April 2022 &nbsp;&nbsp;
      </p>
    </div>
  );
}

export default Footer;
