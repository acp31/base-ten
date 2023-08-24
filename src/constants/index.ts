// URLS

export const BASE_LOCAL = 'http://localhost:3000'
export const BASE_PROD = 'https://base-ten.vercel.app'
const environment = process.env.NODE_ENV

export const BASE_URL = environment === 'production' ? BASE_PROD : BASE_LOCAL

// Pages

export const COMPANY_PAGE = '/company/'

// API endpoints

export const COMPANY_API_ENDPOINT = '/api/companies'
export const FINANCIAL_STATEMENT_API_ENDPOINT = '/api/finances'

// API responses

// ----------------- Companies -----------------

export const FETCH_COMPANIES_ERROR = 'Error fetching companies'
export const FETCH_COMPANIES_SUCCESS = 'Companies successfuly fetched'

export const FETCH_COMPANY_ERROR = 'Error fetching company'
export const FETCH_COMPANY_SUCCESS = 'Company successfuly fetched'

export const DELETE_COMPANY_ERROR = 'Error deleting company'
export const DELETE_COMPANY_SUCCESS = 'Company successfuly deleted'

export const UPDATE_COMPANY_ERROR = 'Error updating company'
export const UPDATE_COMPANY_SUCCESS = 'Company successfuly updated'

export const CREATE_COMPANY_ERROR = 'Error creating company'
export const CREATE_COMPANY_SUCCESS = 'Company successfuly created'

// ----------------- Financial Statements -----------------

export const FETCH_FINANCIAL_STATEMENTS_ERROR = 'Error fetching financial statements'
export const FETCH_FINANCIAL_STATEMENTS_SUCCESS = 'Financial statements successfuly fetched'

export const FETCH_FINANCIAL_STATEMENT_ERROR = 'Error fetching financial statement'
export const FETCH_FINANCIAL_STATEMENT_SUCCESS = 'Financial statement successfuly fetched'

export const DELETE_FINANCIAL_STATEMENT_ERROR = 'Error deleting financial statement'
export const DELETE_FINANCIAL_STATEMENT_SUCCESS = 'Financial statement successfuly deleted'

export const UPDATE_FINANCIAL_STATEMENT_ERROR = 'Error updating financial statement'
export const UPDATE_FINANCIAL_STATEMENT_SUCCESS = 'Financial statement successfuly updated'

export const CREATE_FINANCIAL_STATEMENT_ERROR = 'Error creating financial statement'
export const CREATE_FINANCIAL_STATEMENT_SUCCESS = 'Financial statement successfuly created'