"use client";
import { useEffect } from "react";
import { Alert, Center, Container } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <Center maw={400} h={100} mx="auto">
      <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">
        Error Fetch Company Data, Please try again.
      </Alert>
    </Center>
  );
}
