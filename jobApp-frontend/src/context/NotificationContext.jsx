import Notification from "../components/common/Notification";
import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ type: "", message: "" });

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const closeNotification = () => {
    setNotification({ type: "", message: "" });
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, closeNotification }}
    >
      {children}

      {notification.message && (
        <Notification
          isOpen={!!notification.message}
          message={notification.message}
          handleClose={closeNotification}
          messagetype={notification.type}
        />
      )}
    </NotificationContext.Provider>
  );
};
