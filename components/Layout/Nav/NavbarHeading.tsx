import {
  ActionIcon,
  Badge,
  Group,
  Modal,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { ChartPie, MoonStars, Sun } from "tabler-icons-react";
import Stats from "../../Stats";

const NavbarHeading = ({ toggleColorScheme, title }: any) => {
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
        <Title order={4}>{title}</Title>
        <Badge size="xs" color="yellow">
          WIP
        </Badge>
      </Group>
      <Group>
        <ActionIcon
          variant="outline"
          color="green"
          size={30}
          onClick={() => openStats()}
        >
          <ChartPie size={16} />
        </ActionIcon>
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
