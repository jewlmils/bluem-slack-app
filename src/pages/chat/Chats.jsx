import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useFetch } from "@utils";
import { Minus } from "lucide-react";

function Chats() {
  const { users, loading, error } = useFetch();
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // Load selected emails from local storage on component mount
  useEffect(() => {
    const storedEmails =
      JSON.parse(localStorage.getItem("selectedEmails")) || [];
    setSelectedEmails(storedEmails);
  }, []);

  // Update local storage whenever selectedEmails change
  useEffect(() => {
    localStorage.setItem("selectedEmails", JSON.stringify(selectedEmails));
  }, [selectedEmails]);

  const handleEmailChange = (selectedOption) => {
    const selectedEmail = selectedOption.value;
    const index = selectedEmails.indexOf(selectedEmail);
    if (index !== -1) {
      const updatedEmails = [...selectedEmails];
      updatedEmails.splice(index, 1);
      setSelectedEmails([selectedEmail, ...updatedEmails]);
    } else {
      setSelectedEmails([selectedEmail, ...selectedEmails]);
    }
    setSelectedOption(null);
  };

  const removeSelectedEmail = (emailToRemove) => {
    const updatedEmails = selectedEmails.filter(
      (email) => email !== emailToRemove
    );
    setSelectedEmails(updatedEmails);
  };

  const truncateEmail = (email) => {
    const maxLength = 20;
    if (email.length > maxLength) {
      return email.substring(0, maxLength) + "...";
    }
    return email;
  };

  return (
    <div>
      <div className="pb-2">
        <h2 className="text-lg font-semibold">Directs</h2>
      </div>
      <Select
        options={users.map((user) => ({
          value: user.email,
          label: user.email,
        }))}
        value={selectedOption}
        onChange={(option) => {
          setSelectedOption(option);
          handleEmailChange(option);
        }}
        placeholder="Select email..."
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        <ul style={{ maxHeight: "30vh", overflowY: "auto" }}>
          {selectedEmails.map((email) => (
            <li className="flex justify-between" key={email}>
              <span
                title={email}
                className="truncate overflow-hidden text-ellipsis"
              >
                {truncateEmail(email)}
              </span>
              <button onClick={() => removeSelectedEmail(email)}>
                <Minus className="text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Chats;
