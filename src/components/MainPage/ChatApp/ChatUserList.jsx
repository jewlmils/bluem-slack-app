import React from "react";
import Select from "react-select";
import { Trash2 } from "lucide-react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { penguin } from "@assets";

export const ChatUserList = ({
  users,
  selectedUser,
  debouncedHandleSelectChange,
  handleInputChange,
  errorMsg,
  error,
  loading,
  selectedUsers,
  handleSelectedUserClick,
  handleChatDelete,
}) => (
  <div className="userList">
    <div className="listofUsers">
      <div className="listofUserIntro">
        <h1>Chats</h1>
        <Select
          options={
            users
              ? users.map((user) => ({ value: user.id, label: user.email }))
              : []
          }
          value={selectedUser}
          onChange={debouncedHandleSelectChange}
          onInputChange={handleInputChange}
          isSearchable
          placeholder="Search"
          styles={{
            control: (provided) => ({
              ...provided,
              width: "20rem",
              margin: "0 2rem 2rem 2rem",
              borderRadius: "0.5rem",
              backgroundColor: "#e2eafc",
              color: "#7ca2d6",
              border: "none",
            }),
          }}
        />
      </div>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <PropagateLoader
          loading={loading}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
          color="#7ca2d6"
        />
      ) : selectedUsers.length > 0 ? (
        <div className="userListList">
          <ul className="usersList">
            {selectedUsers.map((user, index) => (
              <li
                className="listOfUser"
                key={index}
                onClick={() => handleSelectedUserClick(user)}
              >
                <span className="userName">
                  <div className="circle">
                    <img src={penguin} />
                  </div>
                  {user.label.charAt(0).toUpperCase() +
                    user.label.slice(1).split("@")[0]}
                </span>
                <button
                  className="userDelete"
                  onClick={(e) => handleChatDelete(e, user.value)}
                >
                  <Trash2 />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="convoIntro">
          Need a conversation starter? Share your favorite book, movie, or
          travel spot!
        </p>
      )}
    </div>
  </div>
);
