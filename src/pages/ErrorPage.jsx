import React from "react";
import { error } from "@assets";

function ErrorPage() {
  return (
    <>
      <img
        src={error}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "100vh",
          objectFit: "contain",
        }}
      />
    </>
  );
}

export default ErrorPage;
