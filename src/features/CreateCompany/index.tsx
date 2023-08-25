"use client";

import { useCompany } from "@/hooks/useCompany";
import {
  createStyles,
  rem,
  TextInput,
  Container,
  Button,
  Center,
  Notification,
} from "@mantine/core";
import { useCallback, useState } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
}));

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

export default function CreateCompany() {
  const { classes } = useStyles();
  const { createCompanyHandler, message } = useCompany();
  const [name, setName] = useState("");
  const [businessModel, setBusinessModel] = useState("");
  const [industry, setIndustry] = useState("");
  const [logo, setLogo] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = useCallback(() => {
    const industryArr = industry.split(",");
    const newCompany = {
      name,
      industry: industryArr,
      business_model: businessModel,
      hq_location: location,
      logo,
    };
    createCompanyHandler(newCompany);
    setName("");
    setBusinessModel("");
    setIndustry("");
    setLogo("");
    setLocation("");
  }, [name, businessModel, industry, logo, location, createCompanyHandler]);

  return (
    <Container sx={{ maxWidth: 400 }}>
      <TextInput
        label="Company Name"
        placeholder="Google"
        classNames={classes}
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: 8, marginTop: 24 }}
      />
      <TextInput
        label="Business Model"
        placeholder="Search Engine"
        classNames={classes}
        value={businessModel}
        onChange={(e) => setBusinessModel(e.target.value)}
        sx={{ marginBottom: 8 }}
      />
      <TextInput
        label="Industry"
        placeholder="Promotional, ADS, Search, etc."
        classNames={classes}
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        sx={{ marginBottom: 8 }}
      />
      <TextInput
        label="Logo Url"
        placeholder="google.com/logo"
        classNames={classes}
        value={logo}
        onChange={(e) => setLogo(e.target.value)}
        sx={{ marginBottom: 8 }}
      />
      <TextInput
        label="Location"
        placeholder="California, USA"
        classNames={classes}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        sx={{ marginBottom: 8 }}
      />
      <Center sx={{ marginBottom: 24 }}>
        <Button
          disabled={!name || !businessModel || !industry || !location}
          onClick={handleSubmit}
        >
          Create Company
        </Button>
      </Center>
      <Notifications type={message.type} message={message.content} />
    </Container>
  );
}
