"use client";
import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

interface SearchProps {
  query: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Search({ query, handleSearch }: SearchProps) {
  const theme = useMantineTheme();
  return (
    <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
        >
          {theme.dir === "ltr" ? (
            <IconArrowRight size="1.1rem" stroke={1.5} />
          ) : (
            <IconArrowLeft size="1.1rem" stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search Companies"
      rightSectionWidth={42}
      value={query}
      onChange={(e) => handleSearch(e)}
    />
  );
}

export default Search;
