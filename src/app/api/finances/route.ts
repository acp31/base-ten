import { NextResponse } from 'next/server'
import { createFinancialStatements } from '@/utils/db'
import { CREATE_FINANCIAL_STATEMENT_ERROR } from '@/constants'
import { FinancialStatement } from '@/models'

export async function POST(request: Request) {
  try {
    const { statements } = await request.json()
    const finanicalStatements = await createFinancialStatements(statements)
    return NextResponse.json({ finanicalStatements }, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: CREATE_FINANCIAL_STATEMENT_ERROR }, { status: 400 });
  }
}