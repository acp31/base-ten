"use client";
import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

const Notifications = ({
  type,
  message,
}: {
  type: string;
  message: string;
}) => {
  if (!message || !message.length) return null;
  let notification = (
    <Notification
      icon={<IconCheck size="1.1rem" />}
      color="teal"
      title="Teal notification"
    >
      {message}
    </Notification>
  );
  if (type === "error") {
    notification = (
      <Notification icon={<IconX size="1.1rem" />} color="red">
        {message}
      </Notification>
    );
  }
  return <>{notification}</>;
};

export default Notifications;
