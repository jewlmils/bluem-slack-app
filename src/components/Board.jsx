import React from "react";

function Board() {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex items-center justify-center h-[10vh] mb-4 rounded bg-gray-50 border-2 border-black">
            <p className="text-2xl"></p>
          </div>
          <div className="flex items-center justify-center h-[55vh] mb-4 rounded bg-gray-50 border-2 border-black">
            <p className="text-2xl"></p>
          </div>
          <div className="flex items-center justify-center h-[15vh] rounded bg-gray-50 border-2 border-black">
            <p className="text-2xl"></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
