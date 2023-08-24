import { BASE_URL, COMPANY_API_ENDPOINT, FINANCIAL_STATEMENT_API_ENDPOINT } from "@/constants"

export const getIdFromApiRoute = (url: string) => {
  const lastIndex = url.lastIndexOf('/')
  return Number(url.slice(lastIndex + 1))
}

export const getCompanyApiUrl = (id?: string) => {
  if (!id) return BASE_URL + COMPANY_API_ENDPOINT
  return BASE_URL + COMPANY_API_ENDPOINT + '/' + id
}
export const getFinancialStatementApiUrl = (id?: string) => {
  if (!id) return BASE_URL + FINANCIAL_STATEMENT_API_ENDPOINT
  return BASE_URL + FINANCIAL_STATEMENT_API_ENDPOINT + '/' + id
}