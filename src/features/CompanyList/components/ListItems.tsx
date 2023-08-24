"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Group, Text, useMantineTheme } from "@mantine/core";
import { IconBuilding } from "@tabler/icons-react";
import { COMPANY_PAGE } from "@/constants";
import useStyles from "../styles";
import { Company } from "@/models";
import CompanyBadge from "@/components/CompanyBadge";

export default function ListItems({ companies }: { companies: Company[] }) {
  const theme = useMantineTheme();
  const router = useRouter();
  const handleClick = (code: string) => {
    router.push(`${COMPANY_PAGE}${code} `);
  };
  const { classes } = useStyles();
  const rows = companies.map((company) => {
    const { id, name, business_model, hq_location, industry } = company;
    return (
      <tr
        key={id}
        className={classes.user}
        onClick={() => handleClick(String(id))}
      >
        <td>
          <Group spacing="sm">
            <IconBuilding
              size={32}
              radius="xl"
              strokeWidth={1}
              color={theme.colors.blue[4]}
            />
            <Text fz="sm" fw={500}>
              {name}
            </Text>
          </Group>
        </td>

        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {business_model}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {hq_location}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {industry.map((industry, idx) => (
                <CompanyBadge key={`${idx}_${industry}`} item={industry} />
              ))}
            </Text>
          </Group>
        </td>
      </tr>
    );
  });
  return <>{rows}</>;
}
