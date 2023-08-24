import { Company } from "@/models/index";
import React, { useState, useEffect, useCallback } from "react";
import { FETCH_COMPANY_ERROR, FETCH_COMPANIES_ERROR } from "@/constants/index";
import { getAllCopmpanies, getAllCompanyFinanicalDataByCompanyId } from "@/services/companiesApi";

const useCompany = () => {
  const [company, setCompany] = useState({} as Company);
  const [companyId, setCompanyId] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    type: '',
    content: ''
  });

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
  return { company, error, isLoading, message, setCompanyId }
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