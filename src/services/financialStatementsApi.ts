import { CREATE_FINANCIAL_STATEMENT_ERROR } from "@/constants"
import { FinancialStatement, FinancialStatementCreate } from "@/models"
import { getFinancialStatementApiUrl } from "@/utils/helpers"

export const createFinancialStatements = async (statements: FinancialStatementCreate[]) => {
  try {
    const url = getFinancialStatementApiUrl()
    const data = { statements }
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    const { finanicalStatements } = await res.json()
    return finanicalStatements as FinancialStatement[]
  } catch (error) {
    console.error(error)
    const errMsg = CREATE_FINANCIAL_STATEMENT_ERROR
    return errMsg
  }
}
