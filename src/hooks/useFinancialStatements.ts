import { FinancialStatement, FinancialStatementCreate } from "@/models/index";
import React, { useState, useEffect, useCallback } from "react";
import { CREATE_FINANCIAL_STATEMENT_ERROR } from "@/constants/index";
import { createFinancialStatements } from "@/services/financialStatementsApi";

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

  useEffect(() => {
    if (!uploadData || !uploadData.length) return;
    setIsLoading(true);
    setError(false);
    setMessage({ type: '', content: '' });
    setStatements([] as FinancialStatement[]);
    const fetchCompany = async () => {
      const data = await createFinancialStatements(uploadData);
      if (data !== CREATE_FINANCIAL_STATEMENT_ERROR) {
        setStatements(data);
        setIsLoading(false);
      } else {
        setError(true);
        setIsLoading(false);
        setMessage({ type: 'error', content: data });
      }
    }
    fetchCompany();
  }, [uploadData])
  return { statements, error, isLoading, message, setUploadData, handleUploadData }
}

export { useFinacialStatements }