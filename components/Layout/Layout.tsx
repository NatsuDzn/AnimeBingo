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
import { Photo, Trash } from "tabler-icons-react";
import NavbarHeading from "./Nav/NavbarHeading";
import NavbarAccordion from "./Nav/NavbarAccordion";
import SearchTitles from "./../Search";
import { useBingo } from "../../context/state";
import BackupRestore from "./Nav/Backup/BackupRestore";
import { useRouter } from "next/router";

const Layout = ({ children }: PropsWithChildren<{}>) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { bingoMethods } = useBingo();
  const [isSaving, setIsSaving] = useState(false);

  const saveBingo = async () => {
    setIsSaving(true);
    await bingoMethods.saveDivAsImage(
      document.querySelector(".bingo-table"),
      "bingo.png"
    );
    setIsSaving(false);
  };

  const router = useRouter();
  const { asPath } = router;

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
        asPath !== "/versus" ? (
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 400, lg: 480 }}
            sx={{ bottom: 0, height: "auto" }}
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
              <Group spacing="sm" style={{ marginTop: 6 }}>
                <Button
                  style={{ flex: 1 }}
                  size="sm"
                  color="green"
                  variant={colorScheme === "dark" ? "light" : "filled"}
                  leftIcon={<Photo size={16} />}
                  loading={isSaving}
                  onClick={() => saveBingo()}
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
        ) : undefined
      }
      header={
        <Header height={60} px="md">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "100%",
              alignItems: "center"
            }}
          >
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
              currentPath={asPath}
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
