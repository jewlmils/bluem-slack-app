import React, { useState, useEffect } from "react";
import { PlusCircle, UserRoundPlus, Send, User2 } from "lucide-react";
import PropagateLoader from "react-spinners/PropagateLoader";
import Select from "react-select";
import { useFetch } from "@utils";
import { logo, totoro } from "@assets";

function ChannelList() {
  const { users, loading: usersLoading, error: usersError } = useFetch();
  const [channels, setChannels] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [errorChList, setErrorChList] = useState("");
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingChannel, setLoadingChannel] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [selectedAddMemberUser, setSelectedAddMemberUser] = useState(null);

  // const userInfo = JSON.parse(localStorage.getItem('user-info'));
  // const currentUserEmail = userInfo.data.email || '';

  const toggleAddMemberModal = () => {
    setAddMemberModal(!addMemberModal);
    setSelectedAddMemberUser(null);
  };

  const addMemberToChannel = async () => {
    if (!selectedAddMemberUser || !selectedChannelId) {
      return;
    }

    const requestBody = {
      id: selectedChannelId,
      member_id: selectedAddMemberUser.value,
    };

    try {
      const response = await fetch(
        "http://206.189.91.54/api/v1/channel/add_member",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access-token": localStorage.getItem("access-token"),
            client: localStorage.getItem("client"),
            expiry: localStorage.getItem("expiry"),
            uid: localStorage.getItem("uid"),
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const errorMessage = data ? data.message : "Unknown error";
        throw new Error(
          `Failed to add member to channel. Status: ${response.status}. ${errorMessage}`
        );
      }

      console.log("Member added to channel successfully!");
      toggleAddMemberModal();
    } catch (error) {
      console.error("Error adding member to channel:", error.message);
    }
  };

  const fetchChannelDetails = async (channelId) => {
    try {
      const response = await fetch(
        `http://206.189.91.54/api/v1/channels/${channelId}`,
        {
          method: "GET",
          headers: {
            "access-token": localStorage.getItem("access-token"),
            client: localStorage.getItem("client"),
            expiry: localStorage.getItem("expiry"),
            uid: localStorage.getItem("uid"),
          },
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const errorMessage = data ? data.message : "Unknown error";
        throw new Error(
          `Failed to fetch channel details. Status: ${response.status}. ${errorMessage}`
        );
      }

      const channelDetails = await response.json();
      console.log("Channel details:", channelDetails);
    } catch (error) {
      console.error("Error fetching channel details:", error.message);
    }
  };

  const createChannelModal = () => {
    setCreateModal(!createModal);
    setChannelName("");
    setSelectedUsers([]);
    setErrorChList("");
  };

  const changeChannelName = (e) => {
    setChannelName(e.target.value);
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedUsers(selectedOptions);
  };

  useEffect(() => {
    async function fetchChannels() {
      try {
        setLoadingChannel(true);
        const response = await fetch("http://206.189.91.54/api/v1/channels", {
          method: "GET",
          headers: {
            "access-token": localStorage.getItem("access-token"),
            client: localStorage.getItem("client"),
            expiry: localStorage.getItem("expiry"),
            uid: localStorage.getItem("uid"),
          },
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          const errorMessage = data ? data.message : "Unknown error";
          throw new Error(
            `Failed to fetch channels. Status: ${response.status}. ${errorMessage}`
          );
        }

        const data = await response.json();
        setChannels(data.data);
      } catch (error) {
        console.error("Error fetching channels:", error.message);
      } finally {
        setLoadingChannel(false);
      }
    }

    fetchChannels();
  }, []);

  async function createChannel(e) {
    e.preventDefault();
    const user_ids = selectedUsers.map((user) => user.value);
    const requestBody = {
      name: channelName,
      user_ids: user_ids,
    };

    try {
      const response = await fetch("http://206.189.91.54/api/v1/channels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": localStorage.getItem("access-token"),
          client: localStorage.getItem("client"),
          expiry: localStorage.getItem("expiry"),
          uid: localStorage.getItem("uid"),
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const errorMessage = data ? data.message : "Unknown error";
        throw new Error(
          `Failed to create channel. Status: ${response.status}. ${errorMessage}`
        );
      }

      const createdChannel = await response.json();
      console.log("Channel created successfully!");

      setChannels((prevChannels) => [
        ...prevChannels,
        ...(Array.isArray(createdChannel.data)
          ? createdChannel.data
          : [createdChannel.data]),
      ]);

      createChannelModal();
    } catch (error) {
      console.error("Error creating channel:", error.message);
      setErrorChList(`Failed to create channel. ${error.message}`);
    }
  }

  const fetchMessages = async (channelId) => {
    try {
      setLoadingMessages(true);
      const response = await fetch(
        `http://206.189.91.54/api/v1/messages?receiver_id=${channelId}&receiver_class=Channel`,
        {
          method: "GET",
          headers: {
            "access-token": localStorage.getItem("access-token"),
            client: localStorage.getItem("client"),
            expiry: localStorage.getItem("expiry"),
            uid: localStorage.getItem("uid"),
          },
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const errorMessage = data ? data.message : "Unknown error";
        throw new Error(
          `Failed to fetch messages. Status: ${response.status}. ${errorMessage}`
        );
      }

      const data = await response.json();
      setMessages(data.data);
    } catch (error) {
      console.error("Error fetching messages:", error.message);
      setErrorMsg(`Failed to fetch messages. ${error.message}`);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleChannelClick = (channelId) => {
    setSelectedChannelId(channelId);
    fetchMessages(channelId);
    fetchChannelDetails(channelId);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const requestBody = {
      receiver_id: selectedChannelId,
      receiver_class: "Channel",
      body: messageBody,
    };

    try {
      const response = await fetch("http://206.189.91.54/api/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": localStorage.getItem("access-token"),
          client: localStorage.getItem("client"),
          expiry: localStorage.getItem("expiry"),
          uid: localStorage.getItem("uid"),
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const errorMessage = data ? data.message : "Unknown error";
        throw new Error(
          `Failed to send message. Status: ${response.status}. ${errorMessage}`
        );
      }

      const sentMessage = await response.json();
      console.log("Message sent successfully!");

      // Update the local state with the new message
      setMessages((prevMessages) => [...prevMessages, sentMessage.data]);

      setMessageBody("");
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  function formatMessageTime(timestamp) {
    const formattedTime = new Date(timestamp).toLocaleTimeString();
    return formattedTime;
  }

  return (
    <>
      {createModal && (
        <div className="userModal">
          <div className="userModalContent">
            <h2>Create Channel</h2>
            <form onSubmit={createChannel}>
              <input
                type="text"
                placeholder="Name of your Group Chat"
                value={channelName}
                onChange={changeChannelName}
              />
              <Select
                options={users.map((user) => ({
                  value: user.id,
                  label: user.email,
                }))}
                value={selectedUsers}
                isSearchable
                onChange={handleSelectChange}
                placeholder="Search..."
                isMulti
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: "20rem",
                    padding: "0.3rem",
                  }),
                }}
              />
              {errorChList && <p>Error creating channel: {errorChList}</p>}
              <div className="userModalButtons">
                <button type="submit" className="userModalButton">
                  Add
                </button>
                <button
                  type="button"
                  onClick={createChannelModal}
                  className="userModalButton"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {addMemberModal && (
        <div className="userModal">
          <div className="userModalContent">
            <h2>Add Member to Channel</h2>
            <h1>
              {channels.find((channel) => channel.id === selectedChannelId)
                ?.name || "Unknown Channel"}
            </h1>
            <Select
              options={users.map((user) => ({
                value: user.id,
                label: user.email,
              }))}
              value={selectedAddMemberUser}
              onChange={(selectedOption) =>
                setSelectedAddMemberUser(selectedOption)
              }
              isSearchable
              placeholder="Select user to add..."
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: "20rem",
                  padding: "0.3rem",
                }),
              }}
            />
            <div className="userModalButtons">
              <button className="userModalButton" onClick={addMemberToChannel}>
                Add Member
              </button>
              <button
                className="userModalButton"
                onClick={toggleAddMemberModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="channel">
        <div className="userList">
          <div className="listOfUsers">
            <div className="listofUserChIntro">
              <h1>Channels</h1>
              <button onClick={createChannelModal}>
                <PlusCircle />
              </button>
            </div>

            <div className="boxChannelList">
              {usersError && <p>Error loading users: {usersError}</p>}
              {usersLoading && <p>Loading users...</p>}
              {loadingChannel ? (
                <PropagateLoader
                  loading={loadingChannel}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  color="#7ca2d6"
                />
              ) : channels && channels.length > 0 ? (
                <div className="userListList">
                  <ul className="usersList">
                    {channels.map((channel) => (
                      <li
                        className={`listOfUser ${
                          selectedChannelId === channel.id
                            ? "selectedChannel"
                            : ""
                        }`}
                        key={channel.id}
                        onClick={() => handleChannelClick(channel.id)}
                      >
                        <div className="userName">
                          <div className="circle">
                            <img src={totoro} alt="User Avatar" />
                          </div>
                          {channel.name.charAt(0).toUpperCase() +
                            channel.name.slice(1).split("@")[0]}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <h1 className="convoIntro">
                  Introduce yourself! What's your go-to weekend activity? Share
                  and connect!
                </h1>
              )}
            </div>
          </div>
        </div>

        {selectedChannelId ? (
          <div className="boxContainer">
            <div className="boxUsernameUp">
              <div className="boxUsername">
                <div className="circle">
                  <img src={totoro} alt="User Avatar" />
                </div>
                <h1>
                  {channels.find((channel) => channel.id === selectedChannelId)
                    ?.name || "Unknown Channel"}
                </h1>
              </div>
              <button className="addUser" onClick={toggleAddMemberModal}>
                <UserRoundPlus />
              </button>
            </div>

            <div className="boxBody">
              {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

              {loadingMessages ? (
                <PropagateLoader
                  className="loaderMsg"
                  loading={loadingMessages}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  color="#7ca2d6"
                />
              ) : messages.length > 0 ? (
                messages.map((message) => (
                  <div
                    className="boxMessageContainers"
                    key={message.id}
                    // style={{ justifyContent: message.sender && message.sender.email === currentUserEmail ? 'flex-end' : 'flex-start' }}
                  >
                    <div className="circle">
                      {/* <img src={message.sender && message.sender.email === currentUserEmail ? melody : totoro} /> */}
                      <User2 />
                    </div>

                    <div
                      className="boxMessages"
                      style={{ width: "100%" }}
                      // style={{
                      //   backgroundColor: message.sender && message.sender.email === currentUserEmail ? 'white' : '#95b7e6',
                      //   color: message.sender && message.sender.email === currentUserEmail ? 'black' : 'white'
                      // }}
                    >
                      <div
                        className="boxMessageContent"
                        style={{ display: "flex", flexDirection: "flex-col" }}
                      >
                        <div className="boxNameandTime">
                          <span
                            style={{ fontWeight: "800", fontSize: "0.7rem" }}
                          >
                            {message.sender && message.sender.email
                              ? message.sender.email.charAt(0).toUpperCase() +
                                message.sender.email.slice(1).split("@")[0]
                              : "You"}
                          </span>

                          <span style={{ fontSize: "0.7rem" }}>
                            {formatMessageTime(message.created_at)}
                          </span>

                          <span style={{ fontSize: "0.7rem" }}>
                            {new Date(message.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="boxMessage">{message.body}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No messages available for this channel.</p>
              )}
            </div>

            <form className="boxForm" onSubmit={sendMessage}>
              <div className="boxFormGroup">
                <input
                  type="text"
                  name="messageBody"
                  value={messageBody || ""}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder="Write a message..."
                  className="boxInput"
                />

                <button type="submit" className="boxSubmit">
                  <Send />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="userWelcome">
            <img src={logo} alt="Welcome Image" />
          </div>
        )}
      </div>
    </>
  );
}

export default ChannelList;
