import React from "react";
import { User2, Send } from "lucide-react";
import melody from '@assets/myMelodyIcon.jpg'
import penguin from '@assets/penguin.jpg'
import HashLoader from "react-spinners/HashLoader";

export const MessageBox = ({
  selectedChat,
  errorMsg,
  loadingMessages,
  messages,
  handleSubmit,
  handleChange,
  messageBody,
  currentUserEmail
}) => {

  function formatMessageTime(timestamp) {
    const formattedTime = new Date(timestamp).toLocaleTimeString();
    return formattedTime;
  }

  return (
    <div className="boxContainer">
      <div className="boxUsernameUp">
        <div className="boxUsername">
          <span>
            {" "}
            <div className="circle">
              <img src={penguin} />
            </div> {" "}
          </span>
          <h1>
            {selectedChat.label.charAt(0).toUpperCase() +
              selectedChat.label.slice(1).split("@")[0]}
          </h1>
        </div>
      </div>

      <div className="boxBody">
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

        {loadingMessages ? (
          <HashLoader
            loading={loadingMessages}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
            color="#7ca2d6"
          />
        ) : (
          messages.map((message, index) => (
            <div className="boxMessageContainers" key={index}>
              <div className="circle">
                <img src={message.sender.email === currentUserEmail ? melody : penguin} />
              </div>
              <div className="boxMessages" >
                <div className="boxMessageContent"
                  style={{ display: "flex", flexDirection: "flex-col" }}>
                  <div className="boxNameandTime">
                    <span style={{ fontWeight: "800", fontSize: "0.7rem" }}>
                      {message.sender.email.charAt(0).toUpperCase() +
                        message.sender.email.slice(1).split("@")[0]}
                    </span>
                    <span style={{ fontSize: "0.7rem" }}>
                      {formatMessageTime(message.created_at)}
                    </span>
                  </div>
                  <span className="boxMessage">
                    {message.body}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <form className="boxForm" onSubmit={handleSubmit}>
        <div className="boxFormGroup">
          <input
            type="text"
            name="messageBody"
            value={messageBody}
            onChange={handleChange}
            placeholder="Write a message..."
            className="boxInput"
          />
          <button type="submit" className="boxSubmit">
            < Send />
          </button>
        </div>
      </form>
    </div>
  );
};

