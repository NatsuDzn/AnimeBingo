import {
  ActionIcon,
  Badge,
  Group,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { MoonStars, Sun } from "tabler-icons-react";

const NavbarHeading = ({ toggleColorScheme, title }: any) => {
  const theme = useMantineTheme();

  return (
    <>
      <Group spacing={8}>
        <Title order={4}>{title}</Title>
        <Badge size="xs" color="yellow">WIP</Badge>
      </Group>
      <Group>
        <ActionIcon
          variant="default"
          onClick={() => toggleColorScheme()}
          size={30}
        >
          {theme.colorScheme === "dark" ? (
            <Sun size={16} />
          ) : (
            <MoonStars size={16} />
          )}
        </ActionIcon>
      </Group>
    </>
  );
};

export default NavbarHeading;
