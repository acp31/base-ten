import { Company, CreateCompany } from "@/models/index";
import React, { useState, useEffect, useCallback } from "react";
import { FETCH_COMPANY_ERROR, FETCH_COMPANIES_ERROR, CREATE_COMPANY_ERROR } from "@/constants/index";
import { getAllCopmpanies, getAllCompanyFinanicalDataByCompanyId, createCompany } from "@/services/companiesApi";

const useCompany = () => {
  const [company, setCompany] = useState({} as Company);
  const [companyId, setCompanyId] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    type: '',
    content: ''
  });

  const createCompanyHandler = useCallback((newCompany: CreateCompany) => {
    const { name, industry, business_model, hq_location, logo } = newCompany
    setIsLoading(true)
    setError(false);
    if (!name || !industry.length || business_model.length || hq_location.length) {
      setMessage({ type: 'error', content: 'Missing Data Fields!' });
      setError(true);
      setIsLoading(false);
      return
    }
    const industryArr = Array.isArray(industry) ? industry : [industry]
    const createCompanyWithFetch = async () => {
      const data = await createCompany(name, industryArr, business_model, hq_location, logo)
      if (data !== CREATE_COMPANY_ERROR) {
        setCompany(data);
        setIsLoading(false);
        setMessage({ type: 'success', content: 'Created Company!' });
        setTimeout(() => {
          setMessage({ type: '', content: '' });
        }, 5000)
      } else {
        setError(true);
        setIsLoading(false);
        setMessage({ type: 'error', content: data });
      }
    }
    createCompanyWithFetch()
  }, [])

  useEffect(() => {
    if (!companyId || !companyId.length) return;
    setIsLoading(true);
    setError(false);
    setMessage({ type: '', content: '' });
    setCompany({} as Company);
    const fetchCompany = async () => {
      const data = await getAllCompanyFinanicalDataByCompanyId(companyId);
      if (data !== FETCH_COMPANY_ERROR) {
        setCompany(data);
        setIsLoading(false);
      } else {
        setError(true);
        setIsLoading(false);
        setMessage({ type: 'error', content: data });
      }
    }
    fetchCompany();
  }, [companyId])
  return { company, error, isLoading, message, setCompanyId, createCompanyHandler }
}


const useCompanies = () => {
  const [companies, setCompanies] = useState([] as Company[]);
  const [searchTerm, setSerchTerm] = useState({ query: '', results: companies })
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    type: '',
    content: ''
  });

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!companies.length) return
    const results = companies.filter(company => {
      if (e.target.value === '') return companies
      return company.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    })
    setSerchTerm({ query: e.target.value, results })
  }, [companies])

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    setMessage({ type: '', content: '' });
    setCompanies([] as Company[]);
    const fetchCompanies = async () => {
      const data = await getAllCopmpanies();
      if (data !== FETCH_COMPANIES_ERROR) {
        setCompanies(data);
        setSerchTerm({ query: '', results: data })
        setIsLoading(false);
      } else {
        setError(true);
        setIsLoading(false);
        setMessage({ type: 'error', content: data });
        setSerchTerm({ query: '', results: [] as Company[] })
      }
    }
    fetchCompanies();
  }, [])

  return { companies, error, isLoading, message, handleSearch, searchTerm }
}

export { useCompany, useCompanies }