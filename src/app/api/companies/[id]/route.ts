import { NextResponse } from 'next/server'
import { deleteCompanyById, updateCompanyById, getCompanyAndAllFinancialStatementsByCompanyId } from '@/utils/db'
import { FETCH_COMPANY_ERROR, DELETE_COMPANY_ERROR, UPDATE_COMPANY_ERROR } from '@/constants'
import { Company } from '@/models'
import { getIdFromApiRoute } from '@/utils/helpers'

export async function GET(request: Request, { params }: { params: any }) {
  try {
    const id = getIdFromApiRoute(request.url)
    const company = await getCompanyAndAllFinancialStatementsByCompanyId(id)
    return NextResponse.json({ company }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: FETCH_COMPANY_ERROR }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = getIdFromApiRoute(request.url)
    const company = await deleteCompanyById(id)
    return NextResponse.json({ company }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: DELETE_COMPANY_ERROR }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const { name, industry, business_model, hq_location, logo }: Company = await request.json()
    const id = getIdFromApiRoute(request.url)
    const newData = { id, name, industry, business_model, hq_location, logo }
    const company = await updateCompanyById(id, newData)
    return NextResponse.json({ company }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: UPDATE_COMPANY_ERROR }, { status: 400 });
  }
}