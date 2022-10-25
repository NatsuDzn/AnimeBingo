import {
  ActionIcon,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import { useForceUpdate } from "@mantine/hooks";
import { Plus, Trash } from "tabler-icons-react";
import { useBingo } from "../../../context/state";

function ManageBackup({ onRestore }: any) {
  const { colorScheme } = useMantineColorScheme();
  const { value, bingoMethods } = useBingo();
  const forceUpdate = useForceUpdate();

  const restoreBackup = (index: number) => {
    bingoMethods.restoreBackup(index);
    onRestore();
  };

  const saveBackup = () => {
    bingoMethods.saveBingo();
    forceUpdate();
  };

  const deleteSelectedBackup = (list: any) => {
    bingoMethods.deleteSelectedBackup(list);
    forceUpdate();
  };

  return (
    <Stack>
      {value.backup.length === 0 && <EmptyMessage />}

      {value.backup.map((list: any, index: number) => (
        <Group key={index} align="center">
          <Tooltip label={"Restore bingo"}>
            <Paper
              style={{ cursor: "pointer", flex: 1 }}
              shadow="xs"
              radius="md"
              p="xs"
              withBorder
              onClick={() => restoreBackup(index)}
            >
              <Text size="xs" lineClamp={1}>
                {list.title} ({new Date(list.date).toLocaleString()})
              </Text>
            </Paper>
          </Tooltip>
          <ActionIcon
            variant={colorScheme === "dark" ? "light" : "filled"}
            color="red"
            size="lg"
            onClick={() => deleteSelectedBackup(list)}
          >
            <Trash size={16}></Trash>
          </ActionIcon>
        </Group>
      ))}

      <Paper
        style={{ cursor: "pointer" }}
        shadow="xs"
        radius="md"
        p="sm"
        withBorder
        onClick={() => saveBackup()}
      >
        <Group align="center" position="center">
          <Plus size={20} />
        </Group>
      </Paper>
    </Stack>
  );
}

function EmptyMessage() {
  return (
    <Stack align="center">
      <Image
        width={128}
        height={128}
        fit="cover"
        radius={64}
        src="/images/empty.jpg"
        alt="Empty list"
      ></Image>
      <Text weight="bold">No backup has been created</Text>
    </Stack>
  );
}

export default ManageBackup;
