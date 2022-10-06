import { Alert, Progress } from "@mantine/core";
import { InfoCircle } from "tabler-icons-react";
import { useBingo } from "../context/state";

function Stats() {
  const { value } = useBingo();

  const markedAsDoneCount = value.mediaList.filter((s: any) => {
    return s.isDone;
  }).length;

  const percentage: number = Number(
    ((markedAsDoneCount / value.mediaList.length) * 100).toFixed(1)
  );

  return (
    <>
      {markedAsDoneCount > 0 && percentage !== NaN ? (
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
              tooltip: `Not completed (${100 - percentage} %) - ${
                value.mediaList.length - markedAsDoneCount
              } medias`,
            },
          ]}
        />
      ) : (
        <Alert icon={<InfoCircle size={16} />} title="Oops!" color="orange">
          Your bingo is either empty or you don&apos;t have any completed
          entries !
        </Alert>
      )}
    </>
  );
}

export default Stats;
