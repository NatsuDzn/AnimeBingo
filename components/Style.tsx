import {
  Button,
  Checkbox,
  ColorInput,
  Group,
  Input,
  Select,
  Text,
  TextInput,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { Tag } from "tabler-icons-react";
import { useBingo } from "../context/state";

function Style({ ...props }: any) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { updateStyles } = useBingo();

  const form = useForm({
    initialValues: {
      title: "Anime bingo",
      size: String(3 * 3),
      borderColor: theme.colors.gray[0],
      backgroundColor: theme.colors.gray[9],
      showTitles: true,
      showMediaTitles: true,
    },
  });

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={form.onSubmit(
        (values) => (updateStyles(values), console.log(values))
      )}
    >
      <Group style={{ width: "100%" }}>
        <Group direction="row" style={{ width: "100%" }}>
          <Text size="xs">Title:</Text>
          <TextInput
            variant={colorScheme === "dark" ? "default" : "filled"}
            size="xs"
            icon={<Tag size={14} />}
            placeholder="Bingo title..."
            style={{ flex: 1 }}
            {...form.getInputProps("title")}
          />
        </Group>
        <Group
          direction="row"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <Text size="xs">Size:</Text>
          <Select
            size="xs"
            data={[
              { value: String(3 * 3), label: "3 X 3" },
              { value: String(4 * 4), label: "4 X 4" },
              { value: String(5 * 5), label: "5 X 5" },
              { value: String(6 * 6), label: "6 X 6" },
              { value: String(7 * 7), label: "7 X 7" },
            ]}
            {...form.getInputProps("size")}
            variant={colorScheme === "dark" ? "default" : "filled"}
            style={{ width: "64px" }}
          />
        </Group>
        <Group direction="row" style={{ width: "100%" }}>
          <Text size="xs">Border color:</Text>
          <ColorInput
            variant={colorScheme === "dark" ? "default" : "filled"}
            defaultValue="#C5D899"
            style={{ flex: 1 }}
            {...form.getInputProps("borderColor")}
          />
        </Group>
        <Group direction="row" style={{ width: "100%" }}>
          <Text size="xs">Background color:</Text>
          <ColorInput
            variant={colorScheme === "dark" ? "default" : "filled"}
            defaultValue="#C5D899"
            style={{ flex: 1 }}
            {...form.getInputProps("backgroundColor")}
          />
        </Group>

        <Group direction="column" style={{ width: "100%" }} mb={16}>
          <Checkbox
            label="Display bingo title"
            size="xs"
            {...form.getInputProps("showTitles", { type: "checkbox" })}
          />
          <Checkbox
            label="Display media title"
            size="xs"
            {...form.getInputProps("showMediaTitles", { type: "checkbox" })}
          />
        </Group>
      </Group>
      <Button
        size="xs"
        variant={colorScheme === "dark" ? "default" : "filled"}
        onClick={() => {
          form.reset();
        }}
        type="submit"
      >
        Reset
      </Button>
      <Button
        size="xs"
        variant={colorScheme === "dark" ? "default" : "filled"}
        type="submit"
      >
        Debug
      </Button>
    </form>
  );
}

export default Style;
