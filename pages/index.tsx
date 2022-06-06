import { Center, Grid, Text, useMantineTheme } from "@mantine/core";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const theme = useMantineTheme();

  const backgroundColor = theme.colors.gray[9];
  const borderColor = theme.colors.gray[0];

  return (
    <Center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 150*3,
          outline: "2px solid",
          outlineColor: borderColor,
        }}
      >
        <Text
          size="lg"
          style={{ backgroundColor: backgroundColor, width: 150*3 }}
          p={16}
          weight="bold"
          align="center"
          lineClamp={1}
          color={borderColor}
        >
          Anime bingo
        </Text>
        <Grid
          justify="center"
          align="center"
          gutter={0}
          columns={1}
          style={{ maxWidth: 150 * 3 }}
        >
          {[...Array(3 * 3)].map((_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: backgroundColor,
                height: "200px",
                width: "150px",
              }}
            >
              <Text color={borderColor}>{i + 1}</Text>
            </div>
          ))}
        </Grid>
      </div>
    </Center>
  );
};

export default Home;
