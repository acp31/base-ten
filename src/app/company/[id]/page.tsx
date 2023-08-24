"use client";
import CompanyBadge from "@/components/CompanyBadge";
import { useCompany } from "@/hooks/useCompany";
import { FinancialStatement } from "@/models";
import { calculateFinancialStats } from "@/utils/calulateStats";
import {
  createStyles,
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
  Table,
  Container,
  Title,
  Loader,
  Center,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface Props {
  params: {
    id: string;
  };
}

interface TableProps {
  statements?: FinancialStatement[];
}

function FinancialStatementTable({ statements }: TableProps) {
  const rows = (statements || ([] as FinancialStatement[])).map((statement) => {
    const {
      id,
      company_id,
      data_period,
      revenue,
      burn,
      gp_pct,
      gp_amount,
      ebitda,
      cash,
      ltv,
      cac,
      arpu,
      customer_count,
      next_fundraise,
      data_date,
    } = statement;
    return (
      <tr key={id}>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {data_date && new Date(data_date).toLocaleDateString()}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {data_period}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {revenue}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {burn}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {gp_pct}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {gp_amount}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {ebitda}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {cash}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {ltv}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {cac}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {arpu}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {customer_count}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {next_fundraise && new Date(next_fundraise).toLocaleDateString()}
            </Text>
          </Group>
        </td>
      </tr>
    );
  });
  return (
    <Table sx={{ minWidth: 800, marginTop: 32 }} verticalSpacing="sm">
      <thead>
        <tr>
          <th>Data Date</th>
          <th>Data Period</th>
          <th>Revenue</th>
          <th>Burn</th>
          <th>GP PCT</th>
          <th>GP Amount</th>
          <th>Ebitda</th>
          <th>Cash</th>
          <th>LTV</th>
          <th>CAC</th>
          <th>ARPU</th>
          <th># Customers</th>
          <th>Next Funraise Date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

function StatsData({ statements }: { statements: FinancialStatement[] }) {
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

export default function StatsGridIcons({ params }: Props) {
  const { classes } = useStyles();
  const { company, setCompanyId, isLoading } = useCompany();
  useEffect(() => {
    setCompanyId(params.id);
  }, [params.id, setCompanyId]);
  const { Finances } = company;
  if (isLoading || !company)
    return (
      <div className={classes.root}>
        <Center>
          <Container sx={{ minHeight: 500, minWidth: 1200 }}>
            <Loader />
          </Container>
        </Center>
      </div>
    );
  return (
    <div className={classes.root}>
      <Container sx={{ minHeight: 500, minWidth: 1200 }}>
        <Container sx={{ minWidth: 1200, marginBottom: 32 }}>
          <Title order={1}>{company.name}</Title>
          <Title order={5} color="dimmed">
            {company.hq_location}
          </Title>
          <Title order={5} color="dimmed">
            {company.business_model}
          </Title>
          <Text fz="sm" fw={500}>
            {company.industry &&
              company.industry.map((industry, idx) => (
                <CompanyBadge key={`${idx}_${industry}`} item={industry} />
              ))}
          </Text>
        </Container>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          {Finances ? <StatsData statements={Finances} /> : null}
        </SimpleGrid>
        <FinancialStatementTable statements={Finances} />
      </Container>
    </div>
  );
}
