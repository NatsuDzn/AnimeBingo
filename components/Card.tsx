import {
  Badge,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { Checkbox } from "tabler-icons-react";
import { useBingo } from "../context/state";

function Card({ content, ...props }: any) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { value, bingoMethods } = useBingo();

  // Check if content is present in value medialist array using the id
  const isIncluded = value.mediaList.some(
    (media: any) => media.id === content.id
  );

  const isMedia = content.type === "ANIME" || content.type === "MANGA";
  return (
    <Paper
      p="md"
      radius="md"
      withBorder
      {...props}
      style={{
        width: "100%",
        backgroundColor:
          colorScheme === "dark" ? theme.colors.gray[9] : theme.colors.gray[1],
        borderColor: isIncluded ? "green" : null,
        transition: "all 0.15s ease-in-out",
        cursor: "pointer",
      }}
      onClick={() => bingoMethods.pushMedia(content)}
    >
      <Group align="start" noWrap>
        <Image
          width={64}
          height={90}
          fit="cover"
          alt={
            content.title?.userPreferred ||
            content.name.first + " " + content.name.last
          }
          src={content.coverImage?.medium || content.image.medium}
          radius="md"
        />
        <Stack align="start" spacing={0} style={{ width: "100%" }}>
          <Group noWrap position="apart" style={{ width: "100%" }}>
            <Text
              size="md"
              mb={2}
              lineClamp={1}
              style={{ width: "calc(100% - 75px)" }}
            >
              {content.title?.userPreferred ||
                content.name.first + " " + content.name.last}
            </Text>
            {isMedia && (
              <Badge variant={colorScheme === "dark" ? "light" : "filled"}>
                {content.startDate.year ?? "?"}
              </Badge>
            )}
          </Group>

          {isMedia ? (
            <Text size="sm">
              {content.staff.nodes[0]?.name.full ?? "Staff not found"}
            </Text>
          ) : (
              <Text size="sm">
                {content.age ? content.age + " y/o" : "unknown age"}
              </Text>
          )}

          {isIncluded && (
            <Badge
              leftSection={<Checkbox size={14} />}
              color="green"
              mt={6}
              variant={colorScheme === "dark" ? "light" : "filled"}
              styles={{ leftSection: { display: "flex" } }}
            >
              {isIncluded ? "Added" : null}
            </Badge>
          )}
        </Stack>
      </Group>
    </Paper>
  );
}

export default Card;
