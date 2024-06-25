// Board.jsx
import React from "react";
import { CircleEllipsis } from "lucide-react";

function Board({ selectedChannel, selectedEmail, previewEmail }) {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200  mt-14">
          <div className="flex items-center justify-between px-4 h-[10vh] mb-4 rounded bg-gray-50 border-2 border-gray-200">
            <p className="text-2xl">
              {previewEmail || selectedEmail || "Select an email or channel"}
            </p>
            {selectedChannel && (
              <p className="text-lg">{selectedChannel.name}</p>
            )}
            <CircleEllipsis />
          </div>
          <div className="flex items-center justify-center h-[55vh] mb-4 rounded bg-gray-50 border-2 border-gray-200">
            <p className="text-2xl"></p>
          </div>
          <div className="flex items-center justify-center h-[15vh] rounded bg-gray-50 border-2 border-gray-200">
            <p className="text-2xl"></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
