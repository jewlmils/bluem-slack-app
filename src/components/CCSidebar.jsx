import React from "react";
import Chats from "@pages/chat/Chats";
import Channels from "@pages/channel/Channels";

function CCSidebar({ setSelectedEmail, setPreviewEmail, setSelectedChannel }) {
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-hidden bg-white">
          <div className="h-1/2 flex flex-col">
            <div className="px-3 flex-1 border-gray-200">
              <Chats
                setSelectedEmail={setSelectedEmail}
                setPreviewEmail={setPreviewEmail}
              />
            </div>
          </div>

          <div className="h-1/2 flex flex-col">
            <div className="px-3 flex-1 border-gray-200">
              <Channels setSelectedChannel={setSelectedChannel} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default CCSidebar;
