import { ThemeIcon, Accordion, Text } from "@mantine/core";
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

  return (
    <Accordion disableIconRotation multiple={true} initialItem={2}>
      {sectionList.map((section, index) => (
        <Accordion.Item
          key={index}
          label={section.label}
          styles={{ content: { padding: 0, height: "auto" } }}
          icon={
            <ThemeIcon color={section.color} variant="light" size="lg">
              {section.icon}
            </ThemeIcon>
          }
        >
          <div style={{ height: "auto" }}>{section.children}</div>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default NavbarAccordion;
