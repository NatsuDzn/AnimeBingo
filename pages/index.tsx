import { Center, Grid, Image, Text } from "@mantine/core";
import type { NextPage } from "next";
import BingoImage from "../components/BingoImage";
import { useBingo } from "../context/state";

const Home: NextPage = () => {
  const { value } = useBingo();

  const calculatedWidth = 150 * Math.sqrt(Number(value.styles.size));

  return (
    <Center>
      <div
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
              width: calculatedWidth,
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
