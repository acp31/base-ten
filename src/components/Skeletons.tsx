"use client";
import { Skeleton, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  user: {
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    cursor: "pointer",
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

const LoadingSkeletons = ({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}) => {
  const { classes } = useStyles();
  return (
    <>
      {Array(rows)
        .fill(null)
        .map((_, idx) => {
          return (
            <tr key={idx} className={classes.user}>
              {Array(columns)
                .fill(null)
                .map((_, idxInner) => {
                  return (
                    <td key={`${idx}_${idxInner}`}>
                      <Skeleton height={8} radius="xl" />
                    </td>
                  );
                })}
            </tr>
          );
        })}
    </>
  );
};

export default LoadingSkeletons;
