"use client";
import Link from "next/link";
import { Header, Container, Group, Burger, Avatar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useStyles } from "./styles";
import { IconCurrencyTenge } from "@tabler/icons-react";
const links = [
  {
    link: "/",
    label: "Companies",
  },
];

function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const items = links.map((link) => {
    return (
      <Link
        key={link.label}
        href={link.link}
        passHref={true}
        className={classes.link}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <Header height={56} className={classes.header} mb={120}>
      <Container>
        <div className={classes.inner}>
          <IconCurrencyTenge size={28} color="white" />
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            color="#fff"
          />
        </div>
      </Container>
    </Header>
  );
}

export default Navbar;
