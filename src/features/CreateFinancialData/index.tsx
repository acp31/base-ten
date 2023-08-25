"use client";

import { TextInput, Container, Button, Center, Grid } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useFinacialStatements } from "@/hooks/useFinancialStatements";
import useStyles from "./styles";
import { useForm } from "@mantine/form";
import { FinancialStatementCreate } from "@/models";
import Notifications from "@/components/Notifications";

export default function CreateFinancialData({
  companyId,
}: {
  companyId: number;
}) {
  const { classes } = useStyles();
  const { setUploadData, message } = useFinacialStatements();

  const form = useForm({
    initialValues: {
      data_period: "",
      revenue: undefined,
      burn: undefined,
      gp_pct: undefined,
      gp_amount: undefined,
      ebitda: undefined,
      cash: undefined,
      ltv: undefined,
      cac: undefined,
      arpu: undefined,
      customer_count: undefined,
      next_fundraise: undefined,
      data_date: undefined,
    },
    transformValues: (values) => ({
      data_period: String(values.data_period),
      revenue: Number(values.revenue),
      burn: Number(values.burn),
      gp_pct: Number(values.gp_pct),
      gp_amount: Number(values.gp_amount),
      ebitda: Number(values.ebitda),
      cash: Number(values.customer_count),
      ltv: Number(values.cac),
      cac: Number(values.cash),
      arpu: Number(values.arpu),
      customer_count: Number(values.ltv),
      next_fundraise: new Date(String(values.next_fundraise)),
      data_date: new Date(),
      company_id: companyId,
    }),
    validate: (values) => ({
      data_period:
        values.data_period === "annual" ||
        values.data_period === "quarter" ||
        values.data_period === "month"
          ? null
          : "Please enter either annual, month, or quarter",
      data_date: values.data_date === undefined ? "Please enter Date" : null,
      customer_count:
        values.customer_count !== undefined && isNaN(values.customer_count)
          ? "Please enter a valid number"
          : null,
      revenue:
        values.revenue !== undefined && isNaN(values.revenue)
          ? "Please enter a valid number"
          : null,
      burn:
        values.burn !== undefined && isNaN(values.burn)
          ? "Please enter a valid number"
          : null,
      gp_pct:
        values.gp_pct !== undefined && isNaN(values.gp_pct)
          ? "Please enter a valid number"
          : null,
      gp_amount:
        values.gp_amount !== undefined && isNaN(values.gp_amount)
          ? "Please enter a valid number"
          : null,
      ebitda:
        values.ebitda !== undefined && isNaN(values.ebitda)
          ? "Please enter a valid number"
          : null,
      cash:
        values.cash !== undefined && isNaN(values.cash)
          ? "Please enter a valid number"
          : null,
      ltv:
        values.ltv !== undefined && isNaN(values.ltv)
          ? "Please enter a valid number"
          : null,
      arpu:
        values.arpu !== undefined && isNaN(values.arpu)
          ? "Please enter a valid number"
          : null,
    }),
  });

  const handleSubmit = (staement: FinancialStatementCreate[]) => {
    setUploadData(staement);
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit([values]))}>
      <Container sx={{ maxWidth: 1200 }}>
        <Grid>
          <Grid.Col xs={5}>
            <TextInput
              name="data_period"
              label="Data Period"
              placeholder="annual"
              classNames={classes}
              sx={{ marginBottom: 10 }}
              {...form.getInputProps("data_period")}
            />
            <TextInput
              name="revenue"
              label="Revenue"
              placeholder="20"
              classNames={classes}
              sx={{ marginBottom: 10 }}
              {...form.getInputProps("revenue")}
            />
            <TextInput
              name="burn"
              label="Burn"
              placeholder="10"
              classNames={classes}
              sx={{ marginBottom: 10 }}
              {...form.getInputProps("burn")}
            />
          </Grid.Col>
          <Grid.Col xs={5}>
            <TextInput
              name="gp_pct"
              label="Gp Pct"
              placeholder="5.0"
              classNames={classes}
              sx={{ marginBottom: 10 }}
              {...form.getInputProps("gp_pct")}
            />
            <TextInput
              name="gp_amount"
              label="Gp Amount"
              placeholder="3.2"
              classNames={classes}
              sx={{ marginBottom: 10 }}
              {...form.getInputProps("gp_amount")}
            />
            <TextInput
              name="ebitda"
              label="Ebitda"
              placeholder="2"
              classNames={classes}
              sx={{ marginBottom: 10 }}
              {...form.getInputProps("ebitda")}
            />
          </Grid.Col>
          <Grid.Col xs={5}>
            <TextInput
              name="cash"
              label="Cash"
              placeholder="55"
              classNames={classes}
              sx={{ marginBottom: 10 }}
              {...form.getInputProps("cash")}
            />
            <TextInput
              name="ltv"
              label="LTV"
              placeholder="4"
              classNames={classes}
              sx={{ marginBottom: 10 }}
              {...form.getInputProps("ltv")}
            />
            <TextInput
              name="cac"
              label="CAC"
              placeholder="10"
              classNames={classes}
              sx={{ marginBottom: 10 }}
              {...form.getInputProps("cac")}
            />
          </Grid.Col>
          <Grid.Col xs={5}>
            <TextInput
              name="arpu"
              label="ARPU"
              placeholder="2.5"
              classNames={classes}
              sx={{ marginBottom: 10 }}
              {...form.getInputProps("arpu")}
            />
            <TextInput
              name="customer_count"
              label="Customer Count"
              placeholder="5000"
              classNames={classes}
              sx={{ marginBottom: 10 }}
              {...form.getInputProps("customer_count")}
            />
            <DatePickerInput
              name="next_fundraise"
              label="Next Fundraise"
              placeholder="1/1/2026"
              classNames={classes}
              sx={{ marginBottom: 10 }}
              {...form.getInputProps("next_fundraise")}
            />
          </Grid.Col>
          <Grid.Col xs={10}>
            <Center sx={{ marginBottom: 24 }}>
              <Button
                type="submit"
                // disabled={!name || !businessModel || !industry || !location}
              >
                Create Company
              </Button>
            </Center>
          </Grid.Col>
        </Grid>

        <Notifications type={message.type} message={message.content} />
      </Container>
    </form>
  );
}
