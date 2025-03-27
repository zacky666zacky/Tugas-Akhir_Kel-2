const Domain = "http://localhost:8000";
const Api = `${Domain}/api-maybank-v1/products`;
const Url = `${Domain}/assets/images`;
// const Url = `${Domain}/images`;

const DomainAspi = "https://apidevportal.aspi-indonesia.or.id:44310";
const SignatureAuth = `${DomainAspi}/api/v1.0/utilities/signature-auth`;
const TokenB2B = `${DomainAspi}/api/v1.0/access-token/b2b`;
const SignatureService = `${DomainAspi}/api/v1.0/utilities/signature-service`;
const BalanceInquiry = `${DomainAspi}/api/v1.0/balance-inquiry`;

const APIConfig = {
  Private_Key: "3EvXVGnqpVjCb9Y4t/q2lXc3aIyu2GeC0gUfX/j+OMQ=",
  Client_ID: "1385569c1e5843b28ce4467ef75b723c",
  Client_Secret: "er5t4YC+7n8NXQGLTdUSmQD3MO1d4joc2/Xq3cYTUxk=",
  TIMESTAMP: "2020-01-01T00:00:00+07:00",
};

const Endpoints = {
  DomainAspi,
  SignatureAuth,
  TokenB2B,
  SignatureService,
  BalanceInquiry,
};

export { Domain, Api, Url, Endpoints, APIConfig };
