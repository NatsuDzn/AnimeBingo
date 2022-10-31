import { Button, Group, useMantineColorScheme } from "@mantine/core";
import { ReactElement } from "react";
import { ArrowsRandom, Check, Filter, X } from "tabler-icons-react";
import { useBingo } from "../context/state";

interface Button {
  label: string;
  icon: ReactElement;
  color: string;
  disabled?: boolean;
  action: () => void;
}

function Filters({ ...props }: any) {
  const { colorScheme } = useMantineColorScheme();
  const { value, bingoMethods } = useBingo();

  const buttonList: Button[] = [
    {
      label: "Mark everything as read",
      icon: <Check size={16} />,
      color: "green",
      disabled: value.mediaList.length === 0,
      action: () => {
        bingoMethods.markAllMediaAsRead(true);
      },
    },
    {
      label: "Uncheck everything",
      icon: <X size={16} />,
      color: "orange",
      disabled: value.mediaList.length === 0,
      action: () => {
        bingoMethods.markAllMediaAsRead(false);
      },
    },
    {
      label: "Sort everything alphabetically",
      icon: <Filter size={16} />,
      color: "blue",
      disabled: value.mediaList.length === 0,

      action: () => {
        bingoMethods.sortMediaBy("title");
      },
    },
    {
      label: "Randomize",
      icon: <ArrowsRandom size={16} />,
      color: "pink",
      disabled: value.mediaList.length === 0,
      action: () => {
        bingoMethods.sortMediaBy("random");
      },
    },
  ];

  return (
    <Group style={{ width: "100%", ...props }}>
      <Group style={{ width: "100%" }}>
        {buttonList.map((btn: Button, index: number) => (
          <Button
            key={index}
            size="xs"
            disabled={btn.disabled}
            color={btn.color}
            variant={colorScheme === "dark" ? "light" : "filled"}
            leftIcon={btn.icon}
            onClick={btn.action}
          >
            {btn.label}
          </Button>
        ))}
      </Group>
    </Group>
  );
}

export default Filters;
