import { Button, Group, Modal, useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import { Settings } from "tabler-icons-react";
import { useBingo } from "../../../context/state";
import ManageBackup from "./ManageBackup";

function BackupRestore({}: any) {
  const { colorScheme } = useMantineColorScheme();
  const { value, bingoMethods } = useBingo();
  const [opened, setOpened] = useState(false);
  
  return (
    
    <Group
      spacing="sm"
      direction="row"
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
        // onClick={() => bingoMethods.backupBingo()}
      >
        Manage backup
      </Button>
      {/* <Tooltip
        label={new Date(value.backup.date).toLocaleString()}
        disabled={!value.backup.date}
        position="top"
        placement="center"
        gutter={10}
      >
        <Button
          size="sm"
          color="teal"
          variant={colorScheme === "dark" ? "light" : "filled"}
          leftIcon={<RotateClockwise size={16} />}
          onClick={() => bingoMethods.restoreBackup()}
          disabled={!value.backup.backupExist}
        >
          Restore
        </Button>
      </Tooltip>
      <Button
        size="sm"
        color="orange"
        variant={colorScheme === "dark" ? "light" : "filled"}
        leftIcon={<Trash size={16} />}
        onClick={() => bingoMethods.deleteBackup()}
        disabled={!value.backup.backupExist}
      >
        Delete
      </Button> */}
    </Group>
  );
}

export default BackupRestore;
