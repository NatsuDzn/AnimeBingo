import {
  Button,
  Checkbox,
  ColorInput,
  Group,
  InputVariant,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Resize, Tag } from "tabler-icons-react";
import { useBingo } from "../context/state";

function Style({ ...props }: any) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { value, bingoMethods } = useBingo();

  const form = useForm({
    initialValues: {
      title: "Anime bingo",
      size: String(3 * 3),
      borderColor: theme.colors.gray[0],
      backgroundColor: theme.colors.gray[9],
      showTitles: true,
      showMediaTitles: true,
      scale: 1,
      titleFormat: "userPreferred",
    },
  });

  const inputVariant: InputVariant = colorScheme === "dark" ? "default" : "filled";

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={form.onSubmit((values) => bingoMethods.updateStyles(values))}
    >
      <Group style={{ width: "100%" }}>
        <Group style={{ width: "100%" }}>
          <Text size="xs">Title:</Text>
          <TextInput
            variant={inputVariant}
            size="xs"
            icon={<Tag size={14} />}
            placeholder="Bingo title..."
            style={{ flex: 1 }}
            value={value.styles.title}
            onChange={(e) =>
              bingoMethods.updateStyles({ title: e.target.value })
            }
          />
        </Group>

        <Group style={{ width: "100%", justifyContent: "space-between" }}>
          <Text size="xs">Media title format:</Text>
          <Tooltip
            label={
              !value.styles.showMediaTitles
                ? "Media titles needs to be enabled"
                : "Will change the language to the said one if it's available"
            }
          >
            <Select
              disabled={!value.styles.showMediaTitles}
              size="xs"
              data={[
                { value: "english", label: "English" },
                { value: "native", label: "Native" },
                { value: "romanji", label: "Romanji" },
                { value: "userPreferred", label: "Default" },
              ]}
              value={
                value.styles.titleFormat
                  ? value.styles.titleFormat
                  : "userPreferred"
              }
              onChange={(titleFormat: string) =>
                bingoMethods.updateStyles({ titleFormat })
              }
              variant={inputVariant}
              style={{ width: "90px" }}
            />
          </Tooltip>
        </Group>

        <Group style={{ width: "100%", justifyContent: "space-between" }}>
          <Text size="xs">Size:</Text>
          <Select
            size="xs"
            data={[
              { value: String(2 * 2), label: "2 X 2" },
              { value: String(3 * 3), label: "3 X 3" },
              { value: String(4 * 4), label: "4 X 4" },
              { value: String(5 * 5), label: "5 X 5" },
              { value: String(6 * 6), label: "6 X 6" },
              { value: String(7 * 7), label: "7 X 7" },
            ]}
            value={value.styles.size}
            onChange={(size: string) => bingoMethods.updateStyles({ size })}
            variant={inputVariant}
            style={{ width: "70px" }}
          />
        </Group>
        <Group style={{ width: "100%", justifyContent: "space-between" }}>
          <Text size="xs">Image render scale:</Text>
          <NumberInput
            size="xs"
            icon={<Resize size={14} />}
            precision={1}
            step={0.1}
            min={1}
            max={3}
            variant={inputVariant}
            style={{ width: "80px" }}
            value={value.styles.scale}
            onChange={(scale: number) => bingoMethods.updateStyles({ scale })}
          />
        </Group>
        <Group style={{ width: "100%" }}>
          <Text size="xs">Border color:</Text>
          <ColorInput
            variant={inputVariant}
            defaultValue="#C5D899"
            style={{ flex: 1 }}
            value={value.styles.borderColor}
            onChange={(borderColor: string) =>
              bingoMethods.updateStyles({ borderColor })
            }
          />
        </Group>
        <Group style={{ width: "100%" }}>
          <Text size="xs">Background color:</Text>
          <ColorInput
            variant={inputVariant}
            defaultValue="#C5D899"
            style={{ flex: 1 }}
            value={value.styles.backgroundColor}
            onChange={(backgroundColor: string) =>
              bingoMethods.updateStyles({ backgroundColor })
            }
          />
        </Group>

        <Stack style={{ width: "100%" }} mb={16}>
          <Checkbox
            label="Display bingo title"
            size="xs"
            checked={value.styles.showTitles}
            onChange={(e) =>
              bingoMethods.updateStyles({ showTitles: e.target.checked })
            }
          />
          <Checkbox
            label="Display media title"
            size="xs"
            checked={value.styles.showMediaTitles}
            onChange={(e) =>
              bingoMethods.updateStyles({ showMediaTitles: e.target.checked })
            }
          />
        </Stack>
      </Group>
      <Button
        size="xs"
        variant={inputVariant}
        onClick={() => {
          form.reset();
        }}
        type="submit"
      >
        Reset
      </Button>
    </form>
  );
}

export default Style;
