import {
  ActionIcon,
  Center,
  Group,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { GripVertical, Trash } from "tabler-icons-react";
import { useBingo } from "../context/state";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Selection({ content = null, ...props }: any) {
  const { value, bingoMethods } = useBingo();
  const { colorScheme } = useMantineColorScheme();

  return (
    <DragDropContext
      onDragEnd={({ source, destination }) => {
        bingoMethods.moveMedia(source.index, destination?.index);
      }}
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Stack>
              {/* Display empty */}
              {value.mediaList.length === 0 && <Text>Empty</Text>}

              {value.mediaList.map((media: any, index: any) => (
                <Draggable
                  key={index}
                  index={index}
                  draggableId={index.toString()}
                >
                  {(provided) => (
                    <Group
                      ref={provided.innerRef}
                      style={{ width: "100%" }}
                      {...provided.draggableProps}
                    >
                      <Center {...provided.dragHandleProps}>
                        <GripVertical size={18} />
                      </Center>
                      <ActionIcon
                        variant={colorScheme === "dark" ? "light" : "filled"}
                        color="red"
                        onClick={() =>
                          bingoMethods.removeSelectedMedia(media.id)
                        }
                      >
                        <Trash size={14}></Trash>
                      </ActionIcon>
                      <Text size="sm" lineClamp={1} style={{ flex: 1 }}>
                        {value.styles.titleFormat &&
                        media.title?.[value.styles.titleFormat]
                          ? media.title?.[value.styles.titleFormat]
                          : media.title?.userPreferred ||
                            media.name.first + " " + media.name.last}
                      </Text>
                    </Group>
                  )}
                </Draggable>
              ))}
            </Stack>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Selection;
