import { ActionIcon, Anchor, Stack } from "@mantine/core";
import { Bookmark, BookmarkOff, ExternalLink, X } from "tabler-icons-react";
import { useBingo } from "../context/state";

function MediaActions({ content, styles }: any) {
  const { bingoMethods } = useBingo();

  return (
    <Stack
      style={{
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 3,
        ...styles,
      }}
      spacing={6}
    >
      <ActionIcon
        variant="filled"
        color="red"
        onClick={() => bingoMethods.removeSelectedMedia(content.id)}
      >
        <X size={14}></X>
      </ActionIcon>
      {content.type && (
        <>
          <Anchor href={bingoMethods.getMediaLink(content)} target="_blank">
            <ActionIcon
              variant="filled"
              color="blue"
            >
              <ExternalLink size={14}></ExternalLink>
            </ActionIcon>
          </Anchor>
          <ActionIcon
            variant="filled"
            color={content.isDone ? "orange" : "green"}
            onClick={() =>
              content.isDone
                ? bingoMethods.setMediaStatus(content.id, false)
                : bingoMethods.setMediaStatus(content.id, true)
            }
          >
            {content.isDone ? (
              <BookmarkOff size={14}></BookmarkOff>
            ) : (
              <Bookmark size={14}></Bookmark>
            )}
          </ActionIcon>
        </>
      )}
    </Stack>
  );
}

export default MediaActions;
