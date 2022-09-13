import {
  Center,
  HoverCard,
  Image,
  Popover,
  Transition,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CircleCheck } from "tabler-icons-react";
import { useBingo } from "../context/state";
import CustomBadge from "./CustomBadge";
import MediaActions from "./MediaActions";
import MediaDetails from "./MediaDetails";

function BingoImage({ content = null, index, ...props }: any) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { value } = useBingo();
  const [isHovered, { close, open }] = useDisclosure(false);

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
        <HoverCard width="auto" shadow="md" openDelay={700}>
          <HoverCard.Target>
            <div
              style={{
                position: "relative",
                outline: "2px solid",
                outlineColor: value.styles.borderColor,
                zIndex: 2,
              }}
              onMouseEnter={open}
              onMouseLeave={close}
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

              <Transition
                mounted={isHovered}
                transition="slide-left"
                duration={300}
                timingFunction="ease"
              >
                {(styles) => <MediaActions content={content} styles={styles} />}
              </Transition>

              {value.styles.showMediaTitles && (
                <Center>
                  <CustomBadge
                    title={
                      value.styles.titleFormat &&
                      content.title?.[value.styles.titleFormat]
                        ? content.title?.[value.styles.titleFormat]
                        : content.title?.userPreferred ||
                          content.name.first + " " + content.name.last
                    }
                  />
                </Center>
              )}
            </div>
          </HoverCard.Target>
          {/* <HoverCard.Dropdown>
            <MediaDetails media={content} />
          </HoverCard.Dropdown> */}
        </HoverCard>
      )}
    </div>
  );
}

export default BingoImage;
