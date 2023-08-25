import { CreateCompanyMany, FinancialStatement, FinancialStatementCreate } from "@/models/index";
import React, { useState, useEffect, useCallback } from "react";
import { CREATE_COMPANIES_ERROR, CREATE_FINANCIAL_STATEMENT_ERROR } from "@/constants/index";
import { createFinancialStatements } from "@/services/financialStatementsApi";
import { createCompanies } from '@/services/companiesApi'

const useFinacialStatements = () => {
  const [statements, setStatements] = useState([] as FinancialStatement[]);
  const [uploadData, setUploadData] = useState([] as FinancialStatementCreate[]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    type: '',
    content: ''
  });

  const handleUploadData = useCallback((data: FinancialStatementCreate[]) => {
    setUploadData(prevState => prevState.concat(data))
  }, [setUploadData])

  const handleStatementCreation = useCallback((statementData: FinancialStatementCreate[], companyData: CreateCompanyMany[]) => {
    const createCompany = async () => {
      setIsLoading(true);
      setError(false);
      setMessage({ type: '', content: '' });
      const companies = await createCompanies(companyData)
      if (companies !== CREATE_COMPANIES_ERROR) {
        setIsLoading(false);
      } else {
        setError(true);
        setIsLoading(false);
        setMessage({ type: 'error', content: companies });
      }
      setUploadData(statementData)
    }
    createCompany()
  }, [])

  useEffect(() => {
    if (!uploadData || !uploadData.length) return;
    setIsLoading(true);
    setError(false);
    setMessage({ type: '', content: '' });
    setStatements([] as FinancialStatement[]);
    const createStatement = async () => {
      const data = await createFinancialStatements(uploadData);
      if (data !== CREATE_FINANCIAL_STATEMENT_ERROR) {
        setStatements(data);
        setIsLoading(false);
        setMessage({ type: 'error', content: 'Created Financial Statement!' });
        setInterval(() => {
          setMessage({ type: '', content: '' });
        }, 5000)
      } else {
        setError(true);
        setIsLoading(false);
        setMessage({ type: 'error', content: data });
      }
    }
    createStatement();
  }, [uploadData])
  return { statements, error, isLoading, message, setUploadData, handleUploadData, handleStatementCreation }
}

export { useFinacialStatements }