import { FETCH_COMPANY_ERROR, FETCH_COMPANIES_ERROR, CREATE_COMPANY_ERROR, DELETE_COMPANY_ERROR } from "@/constants";
import { Company } from "@/models";
import { getCompanyApiUrl } from "@/utils/helpers";

export const getAllCopmpanies = async () => {
  try {
    const url = getCompanyApiUrl()
    const res = await fetch(url)
    const { companies } = await res.json()
    return companies as Company[]
  } catch (error) {
    console.error(error)
    const errMsg = FETCH_COMPANIES_ERROR
    return errMsg
  }
}

export const createCompany = async (name: string, industry: string[], businessModel: string, hqLocation: string, logo?: string) => {
  try {
    const url = getCompanyApiUrl()
    const data = { name, industry, business_model: businessModel, hq_location: hqLocation, logo }
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    const { company } = await res.json()
    return company as Company
  } catch (error) {
    console.error(error)
    const errMsg = CREATE_COMPANY_ERROR
    return errMsg
  }
}

export const getAllCompanyFinanicalDataByCompanyId = async (id: string) => {
  try {
    const url = getCompanyApiUrl(id)
    const res = await fetch(url)
    const { company } = await res.json()
    return company as Company
  } catch (error) {
    console.error(error)
    const errMsg = FETCH_COMPANY_ERROR
    return errMsg
  }
}

export const getCompanyById = async (id: string) => {
  try {
    const url = getCompanyApiUrl(id)
    const res = await fetch(url)
    const { company } = await res.json()
    return company as Company
  } catch (error) {
    console.error(error)
    const errMsg = FETCH_COMPANY_ERROR
    return errMsg
  }
}

export const deleteCompanyById = async (id: string) => {
  try {
    const url = getCompanyApiUrl(id)
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    })
    const { company } = await res.json()
    return company as Company
  } catch (error) {
    console.error(error)
    const errMsg = DELETE_COMPANY_ERROR
    return errMsg
  }
}

export const updateCompanyById = async (id: string, name: string, industry: string[], businessModel: string, hqLocation: string, logo?: string) => {
  try {
    const url = getCompanyApiUrl(id)
    const data = { name, industry, business_model: businessModel, hq_location: hqLocation, logo }
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    const { company } = await res.json()
    return company as Company
  } catch (error) {
    console.error(error)
    const errMsg = DELETE_COMPANY_ERROR
    return errMsg
  }
}