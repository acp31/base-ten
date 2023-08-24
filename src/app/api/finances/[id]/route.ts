import { NextResponse } from 'next/server'
import { getAllFinacialStatementsByCompanyId, deleteFinancialStatementById, updateFinacialStatementById } from '@/utils/db'
import { FETCH_FINANCIAL_STATEMENTS_ERROR, DELETE_FINANCIAL_STATEMENT_ERROR, UPDATE_FINANCIAL_STATEMENT_ERROR } from '@/constants'

export async function GET(request: Request) {
  try {
    const id = Number(request.url.slice(request.url.lastIndexOf('/') + 1))
    const statement = await getAllFinacialStatementsByCompanyId(id)
    return NextResponse.json({ statement }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: FETCH_FINANCIAL_STATEMENTS_ERROR }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = Number(request.url.slice(request.url.lastIndexOf('/') + 1))
    const statement = await deleteFinancialStatementById(id)
    return NextResponse.json({ statement }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: DELETE_FINANCIAL_STATEMENT_ERROR }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const { newData } = await request.json()
    const id = Number(request.url.slice(request.url.lastIndexOf('/') + 1))
    const statement = await updateFinacialStatementById(id, newData)
    return NextResponse.json({ statement }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: UPDATE_FINANCIAL_STATEMENT_ERROR }, { status: 400 });
  }
}