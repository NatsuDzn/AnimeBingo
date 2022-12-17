import {
  ActionIcon,
  Badge,
  Group,
  Modal,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useState } from "react";
import { ChartPie, MoonStars, Sun, Swords } from "tabler-icons-react";
import Stats from "../../Stats";

const ACTION_ICON_SIZE = 38;

const NavbarHeading = ({ toggleColorScheme, title, currentPath }: any) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const openStats = () => {
    setOpened(true);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Bingo stats"
        centered
      >
        <Stats />
      </Modal>

      <Group spacing={8}>
        <NextLink href="/" style={{ all: "unset", cursor: "pointer" }}>
          <Title order={4}>{title}</Title>
        </NextLink>
        <Badge size="xs" color="yellow">
          WIP
        </Badge>
      </Group>
      <Group>
        <NextLink href="/versus">
          <ActionIcon
            variant={currentPath === "/versus" ? "filled" : "default"}
            color="blue"
            size={ACTION_ICON_SIZE}
          >
            <Swords size={24} />
          </ActionIcon>
        </NextLink>
        <ActionIcon
          variant="default"
          size={ACTION_ICON_SIZE}
          onClick={() => openStats()}
          disabled={currentPath === "/versus"}
        >
          <ChartPie size={24} />
        </ActionIcon>
        <ActionIcon
          variant="default"
          onClick={() => toggleColorScheme()}
          size={ACTION_ICON_SIZE}
        >
          {theme.colorScheme === "dark" ? (
            <Sun size={24} />
          ) : (
            <MoonStars size={24} />
          )}
        </ActionIcon>
      </Group>
    </>
  );
};

export default NavbarHeading;
