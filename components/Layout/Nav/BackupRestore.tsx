import { Button, Group, Tooltip, useMantineColorScheme } from "@mantine/core";
import { DeviceFloppy, RotateClockwise, Trash } from "tabler-icons-react";
import { useBingo } from "../../../context/state";

function BackupRestore({}: any) {
  const { colorScheme } = useMantineColorScheme();
  const { value, bingoMethods } = useBingo();
  
  return (
    <Group
      spacing="sm"
      direction="row"
      align="center"
      style={{ marginTop: 6, width: "100%" }}
    >
      <Button
        size="sm"
        color="blue"
        variant={colorScheme === "dark" ? "light" : "filled"}
        leftIcon={<DeviceFloppy size={16} />}
        style={{ flex: 1 }}
        disabled={value.mediaList.length === 0}
        onClick={() => bingoMethods.backupBingo()}
      >
        Backup
      </Button>
      <Tooltip
        label={new Date(value.backup.date).toLocaleString()}
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
      </Button>
    </Group>
  );
}

export default BackupRestore;
