// Channels.jsx
import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { apiCall, FETCHCREATE_URL, USERS_URL } from "@utils";
import { Modal } from "@";

function Channels({ setSelectedChannel }) {
  const [channels, setChannels] = useState([]);
  const [loadingChannel, setLoadingChannel] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoadingChannel(true);
        const [channelsData, usersData] = await Promise.all([
          apiCall(FETCHCREATE_URL, { method: "get" }),
          apiCall(USERS_URL),
        ]);
        setChannels(channelsData.data);
        setUsers(usersData.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoadingChannel(false);
      }
    };

    fetchInitialData();
  }, []);

  const addChannel = (newChannel) => {
    setChannels([...channels, newChannel]);
  };

  const handleChannelClick = (channel) => {
    setSelectedChannelId(channel.id);
    setSelectedChannel(channel); // Call the setSelectedChannel function
  };

  return (
    <div className="userList">
      <div className="lpx-3 py-2">
        <div className="flex justify-between bg-white py-2">
          <h2 className="text-lg font-semibold">Channels</h2>
          <button onClick={() => setShowModal(true)}>
            <PlusCircle />
          </button>
        </div>

        <div>
          {loadingChannel ? (
            <PropagateLoader
              loading={loadingChannel}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
              color="#7ca2d6"
            />
          ) : channels && channels.length > 0 ? (
            <div>
              <ul className="max-h-[30vh] overflow-y-auto p-2 w-full">
                {channels.map((channel) => (
                  <li
                    key={channel.id}
                    className={
                      selectedChannelId === channel?.id ? "selectedChannel" : ""
                    }
                    onClick={() => handleChannelClick(channel)}
                  >
                    <div>
                      🌼
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
            <h1>
              Introduce yourself! What's your go-to weekend activity? Share and
              connect!
            </h1>
          )}
        </div>
      </div>

      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          users={users}
          onCreateChannel={(channelName) => {
            const newChannel = { name: channelName };
            addChannel(newChannel);
          }}
        />
      )}
    </div>
  );
}

export default Channels;
