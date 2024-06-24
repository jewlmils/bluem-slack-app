import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { useFetch } from "@utils";
import { MessageBox } from "./MessageBox";
import { ChatUserList } from "./ChatUserList";
import { logo } from "@assets";

function ChatList() {
  const apiHeaders = {
    "access-token": localStorage.getItem("access-token"),
    client: localStorage.getItem("client"),
    expiry: localStorage.getItem("expiry"),
    uid: localStorage.getItem("uid"),
  };

  const { users, loading, error } = useFetch(apiHeaders);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(
    JSON.parse(localStorage.getItem("userList") || "[]")
  );

  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  const currentUserEmail = userInfo?.data?.email || "";

  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(selectedUsers));
  }, [selectedUsers]);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);

  const getAuthHeaders = () => {
    const accessToken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const expiry = localStorage.getItem("expiry");
    const uid = localStorage.getItem("uid");
    return { accessToken, client, expiry, uid };
  };

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const { accessToken, client, expiry, uid } = getAuthHeaders();
      const userInfo = JSON.parse(localStorage.getItem("user-info"));

      if (
        !accessToken ||
        !client ||
        !expiry ||
        !uid ||
        !userInfo?.data?.email
      ) {
        setErrorMsg(
          "Authentication headers or user info missing. Please log in."
        );
        return;
      }

      const url = `http://206.189.91.54/api/v1/messages?receiver_id=${selectedChat.value}&receiver_class=User`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "access-token": accessToken,
          client: client,
          expiry: expiry,
          uid: uid,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
      }

      const result = await response.json();
      setMessages(result.data || []);
      setErrorMsg("");
    } catch (err) {
      handleError(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoadingMessages(true);
      const { accessToken, client, expiry, uid } = getAuthHeaders();
      const userInfo = JSON.parse(localStorage.getItem("user-info"));

      if (!userInfo?.data?.email) {
        setErrorMsg("Sender info not available. Please log in.");
        return;
      }

      const newMessage = {
        receiver_id: selectedChat.value,
        receiver_class: "User",
        body: messageBody,
      };

      setTimeout(async () => {
        try {
          const response = await fetch("http://206.189.91.54/api/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "access-token": accessToken,
              client: client,
              expiry: expiry,
              uid: uid,
            },
            body: JSON.stringify(newMessage),
          });

          const result = await response.json();
          fetchMessages();
          setMessageBody("");
          console.log(result.data);
        } catch (err) {
          handleError(err);
        }
      }, 0);
    } catch (err) {
      handleError(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSelectChange = (selectedOption) => {
    const isAlreadySelected = selectedUsers.some(
      (arrayOfUsers) => arrayOfUsers.value === selectedOption.value
    );

    const updatedSelectedUsers = isAlreadySelected
      ? [
          selectedOption,
          ...selectedUsers.filter(
            (arrayOfUsers) => arrayOfUsers.value !== selectedOption.value
          ),
        ]
      : [selectedOption, ...selectedUsers];

    setSelectedUsers(updatedSelectedUsers);
    setSelectedUser(selectedOption.value);
    setSelectedChat(selectedOption);
  };

  const debouncedHandleSelectChange = debounce(handleSelectChange, 300);

  const handleSelectedUserClick = (selectedUser) => {
    setSelectedUser(selectedUser.value);
    setSelectedChat(selectedUser);
  };

  const handleInputChange = (inputValue) => {
    if (!inputValue) {
      setSelectedUser(null);
    }
  };

  const handleChatDelete = async (e, userId) => {
    e.preventDefault();
    try {
      const updatedSelectedUsers = selectedUsers.filter(
        (user) => user.value !== userId
      );
      setSelectedUsers(updatedSelectedUsers);
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleError = (err) => {
    setErrorMsg(err.message);
    console.error(err.message);
  };

  const handleChange = (event) => {
    setMessageBody(event.target.value);
  };

  return (
    <div className="chat">
      <ChatUserList
        users={users}
        selectedUser={selectedUser}
        debouncedHandleSelectChange={debouncedHandleSelectChange}
        handleInputChange={handleInputChange}
        errorMsg={errorMsg}
        error={error}
        loading={loading}
        selectedUsers={selectedUsers}
        handleSelectedUserClick={handleSelectedUserClick}
        handleChatDelete={handleChatDelete}
      />

      {selectedChat ? (
        <MessageBox
          selectedChat={selectedChat}
          errorMsg={errorMsg}
          loadingMessages={loadingMessages}
          messages={messages}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          messageBody={messageBody}
          currentUserEmail={currentUserEmail}
        />
      ) : (
        <div className="userWelcome">
          <img src={logo} alt="Welcome Image" />
        </div>
      )}
    </div>
  );
}

export default ChatList;
