import {
  Alert,
  Button,
  Center,
  Grid,
  Group,
  Text,
  Transition,
} from "@mantine/core";
import type { NextPage } from "next";
import { InfoCircle } from "tabler-icons-react";
import BingoImage from "../components/BingoImage";
import { useBingo } from "../context/state";

const Home: NextPage = () => {
  const { value, bingoMethods } = useBingo();

  const calculatedWidth = 150 * Math.sqrt(Number(value.styles.size));

  return (
    <Center style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Should check if it has been restored at least once */}
      {value.backup.backupExist && (
        <Alert
          title="Informations"
          icon={<InfoCircle size={16} />}
          color="blue"
          styles={{ wrapper: { alignItems: "center" } }}
        >
          <Group direction="row" spacing={0}>
            <Text size="sm">
              A backup of your bingo has been detected, do you want to restore
              it?
            </Text>
            <Button
              size="xs"
              ml={16}
              onClick={() => {
                bingoMethods.restoreBackup();
              }}
            >
              Restore
            </Button>
          </Group>
        </Alert>
      )}
      {/* If medialist length is greater than styles size display text */}
      <Transition
        mounted={value.mediaList.length > Number(value.styles.size)}
        transition="fade"
        duration={200}
        timingFunction="ease"
      >
        {(styles) => (
          <Alert
            title="Warning !"
            icon={<InfoCircle size={16} />}
            color="orange"
            style={{ ...styles }}
          >
            <Text size="sm">
              Some elements are hidden because bingo size is smaller than the
              number of elements
            </Text>
            <Text size="sm">
              (element count: {value.mediaList.length}, bingo size:{" "}
              {value.styles.size})
            </Text>
          </Alert>
        )}
      </Transition>

      <div
        className="bingo-table"
        style={{
          display: "flex",
          flexDirection: "column",
          width: calculatedWidth,
          outline: "2px solid",
          outlineColor: value.styles.borderColor,
        }}
      >
        {value.styles.showTitles && (
          <Text
            size="lg"
            style={{
              backgroundColor: value.styles.backgroundColor,
              maxWidth: calculatedWidth,
            }}
            p={16}
            weight="bold"
            align="center"
            lineClamp={1}
            color={value.styles.borderColor}
          >
            {value.styles.title}
          </Text>
        )}
        <Grid
          justify="center"
          align="center"
          gutter={0}
          columns={1}
          style={{ maxWidth: calculatedWidth }}
        >
          {[...Array(Number(value.styles.size))].map((_, i) => (
            <BingoImage key={i} content={value.mediaList[i]}></BingoImage>
          ))}
        </Grid>
      </div>
    </Center>
  );
};

export default Home;
