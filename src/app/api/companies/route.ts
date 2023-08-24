import { NextResponse } from 'next/server'
import { createCompany, getAllCompanies } from '@/utils/db'
import { FETCH_COMPANIES_ERROR, CREATE_COMPANY_ERROR } from '@/constants'
import { Company } from '@/models'

export async function GET() {
  try {
    const companies = await getAllCompanies()
    return NextResponse.json({ companies }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: FETCH_COMPANIES_ERROR }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, industry, business_model, hq_location, logo }: Company = await request.json()
    if (!name || !industry.length || !business_model || !hq_location) {
      return NextResponse.json({ error: "Missing data fields" }, { status: 404 });
    }
    const company = await createCompany(name, industry, business_model, hq_location, logo)
    return NextResponse.json({ company }, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: CREATE_COMPANY_ERROR }, { status: 400 });
  }
}