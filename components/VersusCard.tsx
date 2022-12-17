import {
  Group,
  Image,
  Loader,
  Modal,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { EditCircle } from "tabler-icons-react";
import { useBingo } from "../context/state";
import Card from "./Card";

function VersusCard({ category, media, onSelect }: any) {
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any>(null);
  const [debounced] = useDebouncedValue(search, 350);
  const { bingoMethods } = useBingo();

  function VersusPlaceholder() {
    return (
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
        onClick={() => setOpened(true)}
      >
        <EditCircle size={48} />
      </Paper>
    );
  }

  const emitMedia = (media: any) => {
    onSelect(media);
    setOpened(false);
  };

  useEffect(() => {
    const searchMedia = async (search: string) => {
      if (search) {
        setIsLoading(true);
        setResults(await bingoMethods.searchMedia(search, category));
        setIsLoading(false);
      } else {
        setResults(null);
      }
    };
    searchMedia(debounced);
  }, [debounced]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add media to versus list"
        size="66.6%"
        centered
      >
        <TextInput
          data-autofocus
          placeholder="Enter media name"
          label="Search"
          description={`Current category: ${category}`}
          withAsterisk
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          rightSection={isLoading ? <Loader size="xs" variant="dots" /> : null}
        />

        {results && (
          <>
            <ScrollArea.Autosize maxHeight="50vh" mx="auto" my={16}>
              <Group my={16}>
                {results.map((item: any) => (
                  <Card
                    key={item.id}
                    content={item}
                    isIncluded={media?.id === item.id}
                    onCardClick={(media: any) => emitMedia(media)}
                  />
                ))}
              </Group>
            </ScrollArea.Autosize>
          </>
        )}
      </Modal>

      {media ? (
        <Stack
          spacing={8}
          style={{ maxWidth: 220, position: "relative" }}
        >
          <Image
            width={220}
            height={310}
            fit="cover"
            src={media.coverImage.large}
            style={{ cursor: "pointer" }}
            radius="sm"
            alt={media.title.userPreferred}
            onClick={() => setOpened(true)}
          ></Image>
          <Text size={16}>{media.title.userPreferred}</Text>
        </Stack>
      ) : (
        <VersusPlaceholder />
      )}
    </>
  );
}

export default VersusCard;
