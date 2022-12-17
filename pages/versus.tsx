import {
  Button,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";
import { SquarePlus } from "tabler-icons-react";
import VersusCard from "../components/VersusCard";
const Versus: NextPage = () => {
  const [versusList, setVersusList] = useState<any>([]);
  const [mediaType, setMediaType] = useState<string>("anime");

  const createEntry = () => {
    const items: any[] = [...versusList];
    items.push(null);

    setVersusList(items);
  };

  const replaceData = (media: any, index: number) => {
    const items = [...versusList];
    items[index] = media;
    setVersusList(items);
  };

  return (
    <Stack align="center" py="xl">
      <Title>Versus Mode</Title>
      <Text>
        This mode allows you to compare different media and compare them using
        different fields
      </Text>
      <Group>
        <Select
          size="xs"
          data={[
            { value: "anime", label: "Anime" },
            { value: "manga", label: "Manga" },
          ]}
          sx={{ maxWidth: 100 }}
          value={mediaType}
          onChange={(type: string) => setMediaType(type)}
        />
        <Button
          color="red"
          disabled={!versusList.length}
          onClick={() => setVersusList([])}
        >
          Clear
        </Button>
      </Group>

      <Group mt={16} style={{ width: "100%" }} align="flex-start">
        <Paper
          withBorder
          style={{
            width: 220,
            height: 310,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          radius="sm"
          onClick={() => createEntry()}
        >
          <SquarePlus size={48} />
        </Paper>
        {versusList.map((media: any, index: number) => (
          <VersusCard
            key={index}
            category={mediaType}
            media={media}
            onSelect={(media: any) => replaceData(media, index)}
          />
        ))}
      </Group>
    </Stack>
  );
};

export default Versus;
