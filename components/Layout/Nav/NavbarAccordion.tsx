import { ThemeIcon, Accordion, Text } from "@mantine/core";
import { useState } from "react";
import { Keyboard, Paint, Table } from "tabler-icons-react";
import Selection from "../../Selection";
import Style from "../../Style";

function NavbarAccordion() {

  const iconSize = 18;

  const sectionList = [
    {
      label: "Selections",
      icon: <Table size={iconSize} />,
      color: "green",
      children: <Selection />,
    },
    {
      label: "Custom",
      icon: <Keyboard size={iconSize} />,
      color: "gray",
      children: <Text>Custom component</Text>,
    },
    {
      label: "Style",
      icon: <Paint size={iconSize} />,
      color: "pink",
      children: <Style />,
    },
  ];

  const [value, setValue] = useState<string[]>(["Style"]);

  return (
    <Accordion
      multiple
      value={value}
      onChange={setValue}
      variant="contained"
    >
      {sectionList.map((section, index) => (
        <Accordion.Item key={index} value={section.label}>
          <Accordion.Control
            icon={
              <ThemeIcon color={section.color} variant="light" size="lg">
                {section.icon}
              </ThemeIcon>
            }
          >
            {section.label}
          </Accordion.Control>
          <Accordion.Panel>{section.children}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default NavbarAccordion;
