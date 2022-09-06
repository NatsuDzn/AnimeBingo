import {
  ActionIcon,
  Button,
  Group,
  Input,
  Loader,
  ScrollArea,
  Select,
  Skeleton,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useRef, useState } from "react";
import { Search, X } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import anilist from "../services/anilist";
import Card from "./Card";
import { useBingo } from "../context/state";

function SearchTitles({ ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { colorScheme } = useMantineColorScheme();
  const viewport = useRef<any>();
  const { bingoMethods } = useBingo();

  const form = useForm({
    initialValues: {
      category: "anime",
      search: "",
    },

    validate: {
      search: (value) => (value ? null : "Search is required"),
    },
  });

  const search = async (values: any, category: any) => {
    setIsLoading(true);
    setResults(await bingoMethods.searchMedia(values.search, values.category));  
    setIsLoading(false);
    scrollToTop();
  };

  const clearSearch = () => {
    setResults(null);
    form.setValues({
      search: "",
      category: form.getInputProps("category").value,
    });
  };

  const scrollToTop = () => {
    if (viewport.current) {
      viewport.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleHeight = (length: number): number => {
    if (length === 0) {
      return 0;
    } else if (length === 1) {
      return 140;
    } else if (length <= 2 && length <= 3) {
      return 280;
    } else {
      return 420;
    }
  };

  return (
    <Group {...props}>
      <form
        onSubmit={form.onSubmit((values) => search(values, values.category))}
        style={{ width: "100%" }}
      >
        <Group>
          <Select
            size="xs"
            data={[
              { value: "anime", label: "Anime" },
              { value: "manga", label: "Manga" },
              { value: "character", label: "Characters" },
              { value: "staff", label: "Staff" },
            ]}
            sx={{ maxWidth: 100 }}
            disabled={isLoading}
            {...form.getInputProps("category")}
            variant={colorScheme === "dark" ? "default" : "filled"}
          />
          <Input
            required
            disabled={isLoading}
            style={{ flex: 1 }}
            size="xs"
            icon={<Search size={14} />}
            placeholder="Search"
            {...form.getInputProps("search")}
            variant={colorScheme === "dark" ? "default" : "filled"}
          />
          <Button
            size="xs"
            leftIcon={<Search size={14} />}
            loading={isLoading}
            type="submit"
            disabled={isLoading}
            variant={colorScheme === "dark" ? "light" : "filled"}
          >
            Search
          </Button>
          {/* Display a clear button if results exist */}
          {results && (
            <ActionIcon
              variant={colorScheme === "dark" ? "light" : "filled"}
              color="red"
              onClick={() => clearSearch()}
            >
              <X size={14}></X>
            </ActionIcon>
          )}
        </Group>
      </form>

      {/* Display a loader when isLoading is true */}
      {isLoading &&
        Array(3)
          .fill(0)
          .map((_, i) => <Skeleton key={i} height={124} radius="md" />)}

      {/* Display empty message if results is empty */}
      {(!isLoading && !results) ||
        (results?.length === 0 && <Text size="sm">No results found</Text>)}

      {/* Display the results */}
      {results && !isLoading && (
        <>
          <ScrollArea
            viewportRef={viewport}
            style={{ height: handleHeight(results.length), width: "100%" }}
          >
            <Group>
              {results.map((item: any) => (
                <Card key={item.id} content={item} />
              ))}
            </Group>
          </ScrollArea>
        </>
      )}
    </Group>
  );
}

export default SearchTitles;
