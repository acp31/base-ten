"use client";
import { FinancialStatement } from "@/models";
import { calculateFinancialStats } from "@/utils/calulateStats";
import { Group, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import { useStyles } from "./styles";

export default function StatsData({
  statements,
}: {
  statements: FinancialStatement[];
}) {
  const { classes } = useStyles();
  const statsData = calculateFinancialStats(
    statements || ([] as FinancialStatement[])
  );
  return (
    <>
      {statsData.map((stat) => {
        if (isNaN(stat.diff)) return;
        const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
        return (
          <Paper withBorder p="md" radius="md" key={stat.title}>
            <Group position="apart">
              <div>
                <Text
                  c="dimmed"
                  tt="uppercase"
                  fw={700}
                  fz="xs"
                  className={classes.label}
                >
                  {stat.title}
                </Text>
                <Text fw={700} fz="xl">
                  {stat.value}
                </Text>
              </div>
              <ThemeIcon
                color="gray"
                variant="light"
                sx={(theme) => ({
                  color:
                    stat.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6],
                })}
                size={38}
                radius="md"
              >
                <DiffIcon size="1.8rem" stroke={1.5} />
              </ThemeIcon>
            </Group>
            <Text c="dimmed" fz="sm" mt="md">
              <Text
                component="span"
                c={stat.diff > 0 ? "teal" : "red"}
                fw={700}
              >
                {stat.diff}%
              </Text>{" "}
              {stat.diff > 0 ? "increase" : "decrease"} compared to last
              projected year
            </Text>
          </Paper>
        );
      })}
    </>
  );
}
