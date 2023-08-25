"use client";
import { Container, Group, Anchor } from "@mantine/core";
import { IconCurrencyTenge } from "@tabler/icons-react";
import { useStyles } from "./styles";

const links = [
  {
    link: "#",
    label: "Built By Aaron Phillips",
  },
];

function Footer() {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor<"a">
      color="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <IconCurrencyTenge size={28} color="gray" />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}

export default Footer;
