import React, { useState } from "react";
import { Navbar, CCSidebar, Board } from "@";

function Dashboard() {
  const [selectedEmail, setSelectedEmail] = useState("");
  const [previewEmail, setPreviewEmail] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");

  return (
    <div>
      <Navbar />
      <CCSidebar
        setSelectedEmail={setSelectedEmail}
        setPreviewEmail={setPreviewEmail}
        setSelectedChannel={setSelectedChannel}
      />
      <Board
        previewEmail={previewEmail}
        selectedEmail={selectedEmail}
        selectedChannel={selectedChannel}
      />
    </div>
  );
}

export default Dashboard;
