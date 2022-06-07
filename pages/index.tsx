import { Alert, Button, Center, Grid, Text } from "@mantine/core";
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
          icon={<InfoCircle size={16} />}
          color="blue"
          styles={{ wrapper: { alignItems: "center" } }}
        >
          A backup of your bingo has been detected, do you want to restore it?
          <Button
            ml={16}
            onClick={() => {
              bingoMethods.restoreBackup();
            }}
          >
            Restore
          </Button>
        </Alert>
      )}
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
