import { FinancialStatement } from "@/models";

function percIncrease(a: number, b: number) {
  let percent;
  if (b !== 0) {
    if (a !== 0) {
      percent = ((b - a) / a) * 100;
    } else {
      percent = b * 100;
    }
  } else {
    percent = -a * 100;
  }
  return Math.floor(percent);
}

const sortByDate = (statements: FinancialStatement[]) => {
  return statements.sort((a: FinancialStatement, b: FinancialStatement) => {
    return new Date(a.data_date).valueOf() - new Date(b.data_date).valueOf();
  });
};
const headers = [
  "revenue",
  "burn",
  "gp_pct",
  "gp_amount",
  "ebitda",
  "cash",
  "ltv",
  "cac",
  "arpu",
  "customer_count",
];
const computeStats = (statements: FinancialStatement[]) => {
  const res = new Map<string, number[]>();
  statements.forEach((statement) => {
    const {
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
    } = statement;
    let multiple = 1;
    if (data_period === "quarter") multiple = 4;
    if (data_period === "month") multiple = 12;
    const values = [
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
    ];
    headers.forEach((header, idx) => {
      const val = (values[idx] || 0) * multiple;
      const arr = res.get(header)?.concat([val]) || [val];
      res.set(header, arr);
    });
  });
  return res;
};

const calculatePercentChange = (mapValues: Map<string, number[]>) => {
  const res = new Map();
  for (const [key, value] of mapValues) {
    const values = mapValues.get(key);
    if (values) {
      const increases = values
        .map((currVal, index) => {
          if (index === 0) {
            return;
          }
          const prevVal = values[index - 1];
          percIncrease(prevVal, currVal);
          return ((currVal - prevVal) / prevVal) * 100;
        })
        .filter(Boolean);
      res.set(key, increases);
    }
  }

  return res;
};

export const calculateFinancialStats = (statements: FinancialStatement[]) => {
  const sortedStatements = sortByDate(statements);
  const map = computeStats(sortedStatements);
  const changeMap = calculatePercentChange(map)
  const statement = sortedStatements[0]
  const {
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
  } = statement;
  const values = [
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
  ];
  return headers.map((header, idx) => {
    const title = header
    const value = values[idx]
    const diff = Math.trunc(changeMap.get(header)[0])
    return { title, value, diff }
  })
}
