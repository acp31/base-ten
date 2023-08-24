import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'
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
  let mock = new MockAdapter(axios);
  beforeEach(() => {
    mock = new MockAdapter(axios);
  })

  it('should return all companies when the getAllCompanies enpoint is called', async () => {
    mock.onGet(getCompanyApiUrl()).reply(200, COMPANY_LIST)
    const actualAssets = await companiesApi.getAllCopmpanies()
    expect(actualAssets).toEqual(COMPANY_LIST)
  })

  // it('should return a successful response', async () => {
  //   const { res } = mockRequestResponse();
  //   const actualCompanies = await companiesApi.getAllCopmpanies()
  //   expect(actualCompanies).toEqual(COMPANY_LIST)
  //   expect(res.status).toBe(200);
  //   expect(res.headers).toEqual({ 'content-type': 'application/json' });
  //   expect(res.statusText).toEqual('OK');
  // })
  // it('should return ')
})