"use client";
import { FinancialStatement } from "@/models";
import { Group, Text, Table } from "@mantine/core";
import TableHeaders from "./components/Header";
import LoadingSkeletons from "@/components/Skeletons";

interface TableProps {
  statements?: FinancialStatement[];
  isLoading: boolean;
}

const headers = [
  "Data Date",
  "Data Period",
  "Revenue",
  "Burn",
  "GP PCT",
  "GP Amount",
  "Ebitda",
  "Cash",
  "LTV",
  "CAC",
  "ARPU",
  "# Customers",
  "Next Funraise Date",
];

export default function FinancialStatementTable({
  statements,
  isLoading,
}: TableProps) {
  const rows = (statements || ([] as FinancialStatement[])).map((statement) => {
    const {
      id,
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
      <TableHeaders headers={headers} />
      <tbody>
        {isLoading ? <LoadingSkeletons rows={10} columns={13} /> : rows}
      </tbody>
    </Table>
  );
}
