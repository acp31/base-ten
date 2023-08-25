import { prisma } from '@/lib/prisma'
import { Company, CreateCompanyMany, FinancialStatement, FinancialStatementCreate, FinancialStatementProps, FinancialStatementUploadSheet } from '@/models'

export const getAllCompanies = async () => {
  return await prisma.company.findMany()
}

export const createCompany = async (name: string, industry: string[], businessModel: string, hqLocation: string, logo?: string) => {
  return await prisma.company.create({ data: { name, industry, business_model: businessModel, hq_location: hqLocation, logo } });
}

export const createCompanies = async (companies: CreateCompanyMany[]) => {
  return await prisma.company.createMany({ data: companies });
}

export const getCompanyById = async (id: number) => {
  return await prisma.company.findUnique({ where: { id } });
}

export const updateCompanyById = async (id: number, newData: Company) => {
  const { name, business_model, hq_location, logo, industry } = newData
  return await prisma.company.update({ where: { id }, data: { name, business_model, hq_location, logo, industry } });
}

export const deleteCompanyById = async (id: number) => {
  return await prisma.company.delete({ where: { id } });
}

export const getCompanyAndAllFinancialStatementsByCompanyId = async (id: number) => {
  return await prisma.company.findUnique({
    where: { id }, include: {
      Finances: true
    }
  })
}

export const getAllFinacialStatementsByCompanyId = async (id: number) => {
  return await prisma.finances.findMany({ where: { id } });
}

export const createFinancialStatements = async (statements: FinancialStatementCreate[]) => {
  return await prisma.finances.createMany({ data: statements })
}

export const createFinancialStatement = async ({
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
  data_date
}: FinancialStatementProps) => {
  return await prisma.finances.create({
    data: {
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
    }
  });
}

export const updateFinacialStatementById = async (id: number, newStatement: FinancialStatement) => {
  return await prisma.finances.update({ where: { id }, data: { ...newStatement } });
}

export const deleteFinancialStatementById = async (id: number) => {
  return await prisma.finances.delete({ where: { id } });
}