"use client";
import { Skeleton } from "@mantine/core";
import useStyles from "../styles";

const LoadingSkeletons = () => {
  const { classes } = useStyles();
  return (
    <>
      {Array(10)
        .fill(null)
        .map((_, idx) => {
          return (
            <tr key={idx} className={classes.user}>
              <td>
                <Skeleton height={8} radius="xl" />
              </td>
              <td>
                <Skeleton height={8} radius="xl" />
              </td>
              <td>
                <Skeleton height={8} radius="xl" />
              </td>
              <td>
                <Skeleton height={8} radius="xl" />
              </td>
            </tr>
          );
        })}
    </>
  );
};

export default LoadingSkeletons;
