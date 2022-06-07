import React, { PropsWithChildren, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Container,
  ScrollArea,
  useMantineColorScheme,
  Group,
  Button,
  Anchor,
  Divider,
} from "@mantine/core";
import {
  Photo,
  Trash,
} from "tabler-icons-react";
import NavbarHeading from "./Nav/NavbarHeading";
import NavbarAccordion from "./Nav/NavbarAccordion";
import SearchTitles from "./../Search";
import { useBingo } from "../../context/state";
import BackupRestore from "./Nav/BackupRestore";

const Layout = ({ children }: PropsWithChildren<{}>) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { bingoMethods } = useBingo();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 400, lg: 480 }}
        >
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            <SearchTitles mb={20} />
            <NavbarAccordion />
          </Navbar.Section>
          <Divider my="sm" label="Actions" labelPosition="center" />
          <Navbar.Section>
            <Anchor
              align="right"
              size="xs"
              href="https://anilist.github.io/ApiV2-GraphQL-Docs/"
              target="_blank"
            >
              Using AniList API
            </Anchor>
            <Group spacing="sm" direction="row" style={{ marginTop: 6 }}>
              <Button
                style={{ flex: 1 }}
                size="sm"
                color="green"
                variant={colorScheme === "dark" ? "light" : "filled"}
                leftIcon={<Photo size={16} />}
              >
                Save bingo
              </Button>
              <Button
                size="sm"
                color="red"
                variant={colorScheme === "dark" ? "light" : "filled"}
                leftIcon={<Trash size={16} />}
                onClick={() => bingoMethods.clearMediaList()}
              >
                Clear
              </Button>
            </Group>
            <BackupRestore />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="md">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <NavbarHeading
              toggleColorScheme={toggleColorScheme}
              title="Anime bingo"
            />
          </div>
        </Header>
      }
    >
      <Container fluid p={0}>
        {children}
      </Container>
    </AppShell>
  );
};

export default Layout;
