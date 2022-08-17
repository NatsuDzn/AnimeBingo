import {
  ActionIcon,
  Center,
  Image,
  Stack,
  Transition,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import {
  Bookmark,
  BookmarkOff,
  CircleCheck,
  ExternalLink,
  X,
} from "tabler-icons-react";
import { useBingo } from "../context/state";
import CustomBadge from "./CustomBadge";

function BingoImage({ content = null, index, ...props }: any) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { value, bingoMethods } = useBingo();
  const [isHovered, setIsHover] = useState(false);

  return (
    <div>
      {/* Display placeholder if content is null */}
      {content === null ? (
        <div
          style={{
            width: "150px",
            height: "200px",
            backgroundColor:
              colorScheme === "dark"
                ? theme.colors.gray[8]
                : theme.colors.gray[2],
            outline: "2px solid",
            outlineColor: value.styles.borderColor,
          }}
          {...props}
        ></div>
      ) : (
        <div
          style={{
            position: "relative",
            outline: "2px solid",
            outlineColor: value.styles.borderColor,
            zIndex: 2,
          }}
          onPointerMove={() => setIsHover(true)}
          onPointerOut={() => setIsHover(false)}
          {...props}
          >
          <Transition
            mounted={content.isDone}
            transition="fade"
            duration={300}
            timingFunction="ease"
          >
            {(styles) => (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  ...styles,
                }}
              >
                <CircleCheck
                  style={{
                    backgroundColor: "#00000060",
                    backdropFilter: "blur(16px)",
                    borderRadius: "50%",
                  }}
                  size={48}
                  color={theme.colors.green[6]}
                />
              </div>
            )}
          </Transition>

          <Image
            width={150}
            height={200}
            fit="cover"
            alt={
              content.title?.userPreferred ||
              content.name.first + " " + content.name.last
            }
            src={content.coverImage?.large || content.image.large}
          ></Image>

          {isHovered && (
            <Stack
              style={{ position: "absolute", top: 8, right: 8, zIndex: 3 }}
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
                  <ActionIcon
                    variant="filled"
                    color="blue"
                    onClick={() => bingoMethods.openMediaLink(content)}
                  >
                    <ExternalLink size={14}></ExternalLink>
                  </ActionIcon>
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
          )}
          {value.styles.showMediaTitles && (
            <Center>
              <CustomBadge
                title={
                  content.title?.userPreferred ||
                  content.name.first + " " + content.name.last
                }
              />
            </Center>
          )}
        </div>
      )}
    </div>
  );
}

export default BingoImage;
