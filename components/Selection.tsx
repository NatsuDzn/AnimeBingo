import {
  ActionIcon,
  Group,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { useBingo } from "../context/state";

function Selection({ content = null, ...props }: any) {
  const { value, removeSelectedMedia } = useBingo();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Group direction="column">

      {/* Display empty */}
      {value.mediaList.length === 0 && (
        <Text>Empty</Text>
      )}

      {value.mediaList.map((media: any, index: any) => (
        <Group
          key={index}
          style={{width: "100%"}}
          direction="row"
        >
          <ActionIcon
            variant={colorScheme === "dark" ? "light" : "filled"}
            color="red"
            onClick={() => removeSelectedMedia(media.id)}
          >
            <Trash size={14}></Trash>
          </ActionIcon>
          <Text size="sm" lineClamp={1} style={{width: "85%"}}>{media.title.userPreferred}</Text>
        </Group>
      ))}
    </Group>
  );
}

export default Selection;
