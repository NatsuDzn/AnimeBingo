import {
  Badge,
  Center,
  Image,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useBingo } from "../context/state";

function BingoImage({ content = null, ...props }: any) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { value } = useBingo();

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
        ></div>
      ) : (
        <div
          style={{
            position: "relative",
            outline: "2px solid",
            outlineColor: value.styles.borderColor,
          }}
        >
          <Image
            width={150}
            height={200}
            fit="cover"
            alt={content.title.userPreferred}
            src={content.coverImage.large}
            ></Image>
            {value.styles.showMediaTitles && (              
          <Center>
            <Badge
              size="lg"
              variant="filled"
              style={{
                position: "absolute",
                bottom: 16,
                backgroundColor: "#00000025",
                backdropFilter: "blur(16px)",
                maxWidth: 120,
                whiteSpace: "break-spaces"
              }}
            >
              <Text style={{ fontSize: 10 }}>
                {content.title.userPreferred}
              </Text>
            </Badge>
          </Center>
        )}
        </div>
      )}
    </div>
  );
}

export default BingoImage;
