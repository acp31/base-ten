"use client";
import { Loader, Container, Center } from "@mantine/core";
export default function Loading() {
  return (
    <Center maw={400} h={100} mx="auto">
      <Loader />
    </Center>
  );
}
