import { createMocks, RequestMethod, createRequest } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextResponse } from 'next/server';
import * as companyApi from '@/services/companiesApi';
import * as endpoints from '../../app/api/companies/route';
import { GET } from '../../app/api/companies/route';
import * as companiesApi from '@/services/companiesApi'
import { getCompanyApiUrl } from '@/utils/helpers';

const COMPANY_LIST = [{
  "id": 1,
  "name": "Awesome Corp",
  "industry": [
    "Fintech"
  ],
  "business_model": "Transactional",
  "hq_location": "San francisco, United States",
  "logo": null
},
{
  "id": 2,
  "name": "Amazing Co.",
  "industry": [
    "Consumer"
  ],
  "business_model": "Subscription",
  "hq_location": "San francisco, United States",
  "logo": null
},
{
  "id": 3,
  "name": "Best Place Ever",
  "industry": [
    "Fintech",
    "Logistics"
  ],
  "business_model": "Transactional",
  "hq_location": "Mexico City, Mexico",
  "logo": null
}]

describe('testing company API service', () => {
  function mockRequestResponse(method: RequestMethod = 'GET', id?: string) {
    const { req, res }: { req: Request, res: NextResponse } = createMocks({ method, url: getCompanyApiUrl(id) })
    return { req, res };
  }

  it('should return a successful response', async () => {
    const { res } = mockRequestResponse();
    const actualCompanies = await companiesApi.getAllCopmpanies()
    expect(actualCompanies).toEqual(COMPANY_LIST)
    expect(res.status).toBe(200);
    expect(res.headers).toEqual({ 'content-type': 'application/json' });
    expect(res.statusText).toEqual('OK');
  })
  // it('should return ')
})