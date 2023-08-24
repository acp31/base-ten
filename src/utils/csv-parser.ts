import { FinancialStatementUploadSheet } from '@/models';
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

export const spreadSheetToJSON = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const workbook = XLSX.read(arrayBuffer)
  const companyData = workbook.Sheets
  const worksheet = companyData['Company Data']
  var headers = {};
  var data = [] as any[];
  for (const item in worksheet) {
    if (item[0] === '!') continue;
    var col = item.substring(0, 1);
    var row = parseInt(item.substring(1));
    var value = worksheet[item].v;
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

  const res = data.map((item: FinancialStatementUploadSheet) => {
    const { id: company_id,
      data_period,
      revenue,
      burn,
      gp_pct,
      gp_amount,
      ebitda,
      cash,
      ltv,
      cac,
      arpu,
      customer_count,
      next_fundraise,
      data_date,
    } = item
    const { fundraiseDateString, dataDateString } = formatExcelDates(next_fundraise, data_date)
    return {
      company_id,
      data_period,
      revenue,
      burn,
      gp_pct,
      gp_amount,
      ebitda,
      cash,
      ltv,
      cac,
      arpu,
      customer_count,
      next_fundraise: fundraiseDateString,
      data_date: dataDateString
    }
  })
  return res
}