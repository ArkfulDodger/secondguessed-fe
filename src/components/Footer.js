import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";

function Footer(props) {
  return (
    <div className="footer">
      <p>
        Designed & built by Jasmine Elkins&nbsp;
        <a href="https://github.com/jasmineelkins">
          <FaGithub />
        </a>
        &nbsp;& Noah Reece&nbsp;
        <a href="https://github.com/ArkfulDodger/secondguessed-fe">
          <FaGithub />
        </a>
        &nbsp; | &nbsp; April 2022 &nbsp;&nbsp;
      </p>
    </div>
  );
}

export default Footer;
