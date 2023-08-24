import { useCompanies } from "@/hooks/useCompany";
import { Company } from "@/models";
import React, { createContext, useContext } from "react";

type SerchTerm = {
  query: string;
  results: Company[];
};

type Message = {
  type: string;
  content: string;
};

export type CompaniesProviderState = {
  companies: Company[];
  searchTerm: SerchTerm;
  error: boolean;
  isLoading: boolean;
  message: Message;
  handleSearch: ((e: React.ChangeEvent<HTMLInputElement>) => void) | null;
};

export const ComaniesInitalState: CompaniesProviderState = {
  companies: [] as Company[],
  searchTerm: { query: "", results: [] as Company[] },
  error: false,
  isLoading: false,
  message: {
    type: "",
    content: "",
  },
  handleSearch: null,
};

export const CompaniesContext =
  createContext<CompaniesProviderState>(ComaniesInitalState);

interface Props {
  children: React.ReactNode;
}

export function CompaniesProvider({ children }: Props) {
  const companies = useCompanies();
  return (
    <CompaniesContext.Provider value={companies}>
      {children}
    </CompaniesContext.Provider>
  );
}

export function useCompaniesContext() {
  return useContext(CompaniesContext);
}
