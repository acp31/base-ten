"use client";
import { Loader, Container, Center } from "@mantine/core";
export default function Loading() {
  return (
    <Container sx={{ minHeight: 300, minWidth: 1200 }}>
      <Center maw={400} h={100} mx="auto">
        <Loader />
      </Center>
    </Container>
  );
}
