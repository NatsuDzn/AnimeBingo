import { Group, Image, Stack, Text } from "@mantine/core";
import { useBingo } from "../context/state";
import CustomBadge from "./CustomBadge";

function MediaDetails({ media, ...props }: any) {
  const { value } = useBingo();

  // Display title
  return (
    <Stack
      sx={{
        width: "500px",
        height: "128px",
        padding: "1rem",
        backgroundImage: `url(${media.bannerImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        borderRadius: "4px",
        margin: "-12px -16px",
        ...props,
      }}
      justify="center"
    >
      <Group align="start" noWrap>
        <Image
          width={64}
          height="auto"
          fit="cover"
          alt={
            media.title?.userPreferred ||
            media.name.first + " " + media.name.last
          }
          src={media.coverImage?.medium || media.image.medium}
          radius="sm"
          sx={{
            outline: "2px solid rgba(255, 255, 255, 0.25)",
            borderRadius: "4px"
          }}
        ></Image>
        <Stack spacing="xs" justify="start">
          <Text
            transform="uppercase"
            weight="bold"
            color="white"
            sx={{
              background: "rgba(0,0,0,0.6)",
              borderRadius: 6,
              backdropFilter: "blur(8px)",
            }}
            px={10}
            py={4}
          >
            {value.styles.titleFormat && media.title?.[value.styles.titleFormat]
              ? media.title?.[value.styles.titleFormat]
              : media.title?.userPreferred ||
                media.name.first + " " + media.name.last}
          </Text>
          <CustomBadge title={media.status} />
        </Stack>
      </Group>
    </Stack>
  );
}

export default MediaDetails;
