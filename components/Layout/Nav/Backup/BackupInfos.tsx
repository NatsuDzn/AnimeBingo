import { Badge, Paper, Stack, Text } from "@mantine/core";

function BackupInfos({ backup }: any) {
  return (
    <>
      <Text weight="bold">{backup.style.title}</Text>
      <Stack dir="row" spacing={4} style={{ marginTop: 6 }}>
        <Text size="sm">Medias count: {backup.list.length}</Text>
        <Text size="sm">Bingo max amount: {backup.style.size}</Text>
        <Text size="sm">
          Background color:{" "}
          <span
            style={{
              display: "inline-block",
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: backup.style.backgroundColor,
              marginLeft: 4,
            }}
          ></span>
        </Text>
        <Text size="sm">
          Border color:
          <Paper
            withBorder
            style={{
              display: "inline-block",
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: backup.style.borderColor,
              marginLeft: 4,
            }}
          ></Paper>
        </Text>
        <Text size="sm">
          Show media titles:{" "}
          <Badge size="sm" color="gray">
            {String(backup.style.showMediaTitles)}
          </Badge>
        </Text>
        <Text size="sm">
          Show bingo title:{" "}
          <Badge size="sm" color="gray">
            {String(backup.style.showTitles)}
          </Badge>
        </Text>
      </Stack>
    </>
  );
}

export default BackupInfos;
