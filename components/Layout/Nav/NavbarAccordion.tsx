import { ThemeIcon, Accordion, Text } from "@mantine/core";
import { randomId, useForceUpdate } from "@mantine/hooks";
import { useState } from "react";
import { Keyboard, Paint, Table } from "tabler-icons-react";
import Style from "../../Style";

function NavbarAccordion() {
  const forceUpdate = useForceUpdate(); 
  const [key, setKey] = useState(randomId());

const iconSize = 18;

const sectionList = [
    {
    label: "Selections",
    icon: <Table size={iconSize} />,
    color: "green",
    children: <Text>Selections component</Text>,
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
    <Accordion disableIconRotation multiple={true} initialItem={0} key={key}>
      {sectionList.map((section, index) => (
        <Accordion.Item
          key={index}
          label={section.label}
          styles={{ content: { padding: 0, height: "auto"}}}
          icon={
            <ThemeIcon color={section.color} variant="light" size="lg">
              {section.icon}
            </ThemeIcon>
          }
        >
          <div style={{height: "auto"}}>
          {section.children}
          </div>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default NavbarAccordion;
