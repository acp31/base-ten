"use client";
import {
  Avatar,
  createStyles,
  Container,
  Group,
  Anchor,
  rem,
} from "@mantine/core";
import { IconCurrencyTenge } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

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