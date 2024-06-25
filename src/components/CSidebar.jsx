import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import PropagateLoader from "react-spinners/PropagateLoader";
import Modal from "./Modal";
import { apiCall, FETCHCREATE_URL, USERS_URL } from "@utils";

function CSidebar() {
  const [channels, setChannels] = useState([]);
  const [loadingChannel, setLoadingChannel] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchChannels = async () => {
    try {
      setLoadingChannel(true);
      const data = await apiCall(FETCHCREATE_URL, { method: "get" });
      setChannels(data.data);
    } catch (error) {
      console.error("Error fetching channels:", error.message);
    } finally {
      setLoadingChannel(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await apiCall(USERS_URL);
        setUsers(data.data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    }

    fetchUsers();
  }, []);

  const openCreateChannelModal = () => {
    setShowModal(true);
  };

  const closeCreateChannelModal = () => {
    setShowModal(false);
  };

  const addChannel = (newChannel) => {
    setChannels([...channels, newChannel]);
  };

  const handleCreateChannel = (channelName) => {
    const newChannel = {
      name: channelName,
    };
    addChannel(newChannel);
  };

  return (
    <div className="userList" style={{ height: "100%" }}>
      <div className="listOfUsers">
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <h1>Channels</h1>
          <button onClick={openCreateChannelModal}>
            <PlusCircle />
          </button>
        </div>

        <div className="boxChannelList">
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
                      selectedChannelId === channel?.id ? "selectedChannel" : ""
                    }`}
                    key={channel.id} // Ensure a unique key
                    onClick={() => setSelectedChannelId(channel.id)}
                  >
                    <div className="userName">
                      {channel.name
                        ? channel.name.charAt(0).toUpperCase() +
                          channel.name.slice(1).split("@")[0]
                        : "Unnamed Channel"}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h1 className="convoIntro">
              Introduce yourself! What's your go-to weekend activity? Share and
              connect!
            </h1>
          )}
        </div>
      </div>

      {showModal && (
        <Modal
          closeModal={closeCreateChannelModal}
          users={users}
          handleCreateChannel={handleCreateChannel} // Pass down handleCreateChannel function
        />
      )}
    </div>
  );
}

export default CSidebar;
