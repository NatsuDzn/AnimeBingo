import { Progress } from "@mantine/core";
import { useBingo } from "../context/state";

function Stats() {
  const { value } = useBingo();

  const markedAsDoneCount = value.mediaList.filter((s: any) => {
    return s.isDone;
  }).length;

  const percentage: number = Number(
    ((markedAsDoneCount/ value.mediaList.length) * 100).toFixed(1)
  );

  return (
    <Progress
      size="xl"
      radius="xl"
      sections={[
        {
          value: percentage,
          color: "green",
          label: `${String(percentage)} %`,
          tooltip: `Completed (${percentage} %) - ${markedAsDoneCount} medias`,
        },
        {
          value: 100 - percentage,
          color: "blue",
          label: `${String(100 - percentage)} %`,
          tooltip: `Not completed (${100 - percentage} %) - ${ value.mediaList.length - markedAsDoneCount} medias`,
        },
      ]}
    />
  );
}

export default Stats;
