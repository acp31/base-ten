import { CreateCompany, FinancialStatementUploadSheet } from '@/models';
import * as XLSX from 'xlsx'

function ExcelDateToJSDate(date: number) {
  console.log('date', date)
  return new Date(Math.round((date - 25569) * 86400 * 1000))
}

const formatExcelDates = (nextFundraise: number, dataDate: number) => {
  const fundraiseDateString = ExcelDateToJSDate(nextFundraise)
  const dataDateString = ExcelDateToJSDate(dataDate)
  return { fundraiseDateString, dataDateString }
}

const handleWorksheetData = (worksheet: XLSX.WorkSheet) => {
  const headers = {} as any;
  const data = [] as any[];
  for (const item in worksheet) {
    if (item[0] === '!') continue;
    const col = item.substring(0, 1);
    const row = parseInt(item.substring(1));
    const value = worksheet[item].v;
    //store header names
    if (row == 1) {
      headers[col] = value;
      continue;
    }

    if (!data[row]) data[row] = {};
    data[row][headers[col]] = value;
  }
  data.shift();
  data.shift();
  return data
}

const handleStatementData = (statementWorksheet: XLSX.WorkSheet) => {
  const rawStatementWorksheetData = handleWorksheetData(statementWorksheet)
  return rawStatementWorksheetData.map((item: FinancialStatementUploadSheet) => {
    const { id: company_id, next_fundraise, data_date, ...rest } = item
    const { fundraiseDateString, dataDateString } = formatExcelDates(next_fundraise, data_date)
    return {
      company_id,
      next_fundraise: fundraiseDateString,
      data_date: dataDateString,
      ...rest
    }
  })
}

const handleCompanyData = (metaDataWoksheet: XLSX.WorkSheet) => {
  const rawStatementWorksheetData = handleWorksheetData(metaDataWoksheet)
  return rawStatementWorksheetData.map((item: CreateCompany) => {
    const {
      industry,
      Finances,
      ...rest
    } = item
    const industryArr = !Array.isArray(industry) ? industry.split(',') : industry
    return { industry: industryArr, ...rest }
  })
}

const handleRawCompanyAndMetaData = (companyDataWorksheet: XLSX.WorkSheet, metaDataWorksheet: XLSX.WorkSheet) => {
  const rawStatementWorksheetData = handleWorksheetData(companyDataWorksheet)
  const rawMetaDataWorksheetData = handleWorksheetData(metaDataWorksheet)
  const statementJSONData = handleStatementData(rawStatementWorksheetData)
  const companyJSONData = handleCompanyData(rawMetaDataWorksheetData)
  return { statementJSONData, companyJSONData }
}

export const spreadSheetToJSON = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const workbook = XLSX.read(arrayBuffer)
  const companyData = workbook.Sheets
  const companyDataWorksheet = companyData['Company Data']
  const metaDataWorksheet = companyData['Meta Data']
  return handleRawCompanyAndMetaData(companyDataWorksheet, metaDataWorksheet)
}

