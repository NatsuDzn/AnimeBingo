import { Button, Group, Modal, useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import { Settings } from "tabler-icons-react";
import ManageBackup from "./ManageBackup";

function BackupRestore({}: any) {
  const { colorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);
  
  return (
    
    <Group
      spacing="sm"
      align="center"
      style={{ marginTop: 6, width: "100%" }}
    >

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Manage backup"
        centered
      >
        <ManageBackup onRestore={() => setOpened(false)} />
      </Modal>

      <Button
        size="sm"
        color="blue"
        variant={colorScheme === "dark" ? "light" : "filled"}
        leftIcon={<Settings size={16} />}
        style={{ flex: 1 }}
        onClick={() => setOpened(true)}
      >
        Manage backup
      </Button>
    </Group>
  );
}

export default BackupRestore;
