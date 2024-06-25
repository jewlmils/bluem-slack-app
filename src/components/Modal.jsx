import React, { useState } from "react";
import Select from "react-select";
import PropagateLoader from "react-spinners/PropagateLoader";
// import { apiCall } from "@utils";

function Modal({ closeModal, users, handleCreateChannel }) {
  const [channelName, setChannelName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [errorChList, setErrorChList] = useState("");
  const [loading, setLoading] = useState(false);

  const changeChannelName = (e) => {
    setChannelName(e.target.value);
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedUsers(selectedOptions);
  };

  const createChannel = async (e) => {
    e.preventDefault();
    setLoading(true);

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

      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage = responseData.message || "Unknown error";
        throw new Error(
          `Failed to create channel. Status: ${response.status}. ${errorMessage}`
        );
      }

      console.log("Channel created successfully!");

      handleCreateChannel(channelName, selectedUsers); // Pass name and selectedUsers
      closeModal(); // Example of closing modal after successful action
    } catch (error) {
      console.error("Error creating channel:", error.message);
      setErrorChList(`Failed to create channel. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!users) {
    return <PropagateLoader />;
  }

  return (
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
          {users && (
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
          )}
          {errorChList && <p className="error">{errorChList}</p>}
          <div className="userModalButtons">
            <button
              type="submit"
              className="userModalButton"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="userModalButton"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
