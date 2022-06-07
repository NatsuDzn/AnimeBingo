import { Badge, Paper, Text } from "@mantine/core";

function CustomBadge({ title, ...props }: any) {
  // Display title
  return (
    <Paper
      radius={16}
      style={{
        position: "absolute",
        bottom: 16,
        maxWidth: "95%",
        backgroundColor: "#00000060",
        backdropFilter: "blur(16px)",
        whiteSpace: "break-spaces",
        padding: "6px 8px",
        textTransform: "uppercase",
        fontFamily: "Segoe UI",
        fontWeight: "700",
        letterSpacing: "0.25px"
      }}
      {...props}
    >
      <Text color="white" align="center" style={{ fontSize: 10 }}>{title}</Text>
    </Paper>
  );
}

export default CustomBadge;
