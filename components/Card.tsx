import {
  Badge,
  Group,
  Image,
  Paper,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

function Card({ content, ...props }: any) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

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
      }}
    >
      <Group align="start" direction="row" noWrap>
        <Image
          width={64}
          height={90}
          fit="cover"
          alt={content.title.userPreferred}
          src={content.coverImage.medium}
          radius="md"
        />
        <Group direction="column" spacing={0} style={{ width: "100%" }}>
          <Group noWrap position="apart" style={{ width: "100%" }}>
            <Text
              size="md"
              color="gray"
              mb={2}
              lineClamp={1}
              style={{ width: "calc(100% - 66px)" }}
            >
              {content.title.userPreferred}
            </Text>
            <Badge variant={colorScheme === "dark" ? "light" : "filled"}>
              {content.startDate.year ?? "?"}
            </Badge>
          </Group>
          <Text size="sm" color="gray">
            {content.staff.nodes[0]?.name.full ?? "Staff not found"}
          </Text>
        </Group>
      </Group>
    </Paper>
  );
}

export default Card;
