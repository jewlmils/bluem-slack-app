import React from "react";
import { ChatUserList } from "@";
import { Channels } from "@pages";

function CSidebar() {
  return (
    <>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ height: "50%", overflowY: "auto" }}>
          <ChatUserList />
        </div>
        <div style={{ height: "50%", overflowY: "auto" }}>
          <Channels />
        </div>
      </div>
    </>
  );
}

export default CSidebar;
