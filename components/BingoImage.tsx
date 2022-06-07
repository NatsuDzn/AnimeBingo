import {
  ActionIcon,
  Center,
  Image,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { X } from "tabler-icons-react";
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
            }}
            onPointerMove={() => setIsHover(true)}
            onPointerOut={() => setIsHover(false)}
            {...props}
        >
          <Image
            width={150}
            height={200}
            fit="cover"
            alt={content.title.userPreferred}
            src={content.coverImage.large}
          ></Image>

            {isHovered && (
            <ActionIcon
              style={{ position: "absolute", top: 8, right: 8 }}
              variant="filled"
              color="red"
              onClick={() => bingoMethods.removeSelectedMedia(content.id)}
            >
              <X size={14}></X>
            </ActionIcon>
          )}
          {value.styles.showMediaTitles && (
              <Center>
                <CustomBadge title={content.title.userPreferred} />
            </Center>
          )}
        </div>
      )}
    </div>
  );
}

export default BingoImage;
