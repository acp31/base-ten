"use client";
import CompanyBadge from "@/components/CompanyBadge";
import CreateFinancialData from "@/features/CreateFinancialData";
import FinancialStatementTable from "@/features/FinacialStatementTable";
import StatsData from "@/features/FinanicalStats";
import { useCompany } from "@/hooks/useCompany";
import {
  createStyles,
  Text,
  SimpleGrid,
  Container,
  Title,
  Loader,
  Center,
} from "@mantine/core";
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

export default function CompanyPage({ params }: Props) {
  const { classes } = useStyles();
  const { company, setCompanyId, isLoading } = useCompany();
  useEffect(() => {
    setCompanyId(params.id);
  }, [params.id, setCompanyId]);
  const { Finances } = company;
  let data = null;
  if ((!isLoading && !Finances) || (Finances && !Finances.length)) {
    data = (
      <div className={classes.root}>
        <Container sx={{ minHeight: 400, minWidth: 1200 }}>
          <Center>
            <CreateFinancialData companyId={company.id} />
          </Center>
        </Container>
      </div>
    );
  }

  if (Finances && Finances.length && !isLoading) {
    data = (
      <>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          {Finances ? <StatsData statements={Finances} /> : null}
        </SimpleGrid>
        <FinancialStatementTable statements={Finances} isLoading={isLoading} />
      </>
    );
  }

  if (isLoading || !company) {
    data = (
      <div className={classes.root}>
        <Container sx={{ minHeight: 300, minWidth: 1200 }}>
          <Center>
            <Loader />
          </Center>
        </Container>
      </div>
    );
  }

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
        {data}
      </Container>
    </div>
  );
}
