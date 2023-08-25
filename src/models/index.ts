export type Company = {
  id: number;
  name: string;
  industry: string[];
  business_model: string;
  hq_location: string;
  logo?: string;
  Finances?: FinancialStatement[]
}

export type CreateCompany = {
  name: string;
  industry: string[];
  business_model: string;
  hq_location: string;
  logo?: string;
  Finances?: FinancialStatement[]
}

export type FinancialStatement = {
  id: number;
  company_id: number;
  data_period: string;
  revenue?: number;
  burn?: number;
  gp_pct?: number;
  gp_amount?: number;
  ebitda?: number;
  cash?: number;
  ltv?: number;
  cac?: number;
  arpu?: number;
  customer_count?: number;
  next_fundraise?: string;
  data_date: string;
}

export type FinancialStatementUploadSheet = {
  id: number;
  data_period?: string;
  revenue?: number;
  burn?: number;
  gp_pct?: number;
  gp_amount?: number;
  ebitda?: number;
  cash?: number;
  ltv?: number;
  cac?: number;
  arpu?: number;
  customer_count?: number;
  next_fundraise: number;
  data_date: number;
}

export type FinancialStatementCreate = {
  company_id: number;
  data_period?: string;
  revenue?: number;
  burn?: number;
  gp_pct?: number;
  gp_amount?: number;
  ebitda?: number;
  cash?: number;
  ltv?: number;
  cac?: number;
  arpu?: number;
  customer_count?: number;
  next_fundraise: Date;
  data_date: Date;
}

export interface FinancialStatementProps {
  company_id: number;
  data_period?: string;
  revenue?: number;
  burn?: number;
  gp_pct?: number;
  gp_amount?: number;
  ebitda?: number;
  cash?: number;
  ltv?: number;
  cac?: number;
  arpu?: number;
  customer_count?: number;
  next_fundraise?: string;
  data_date: Date;
}