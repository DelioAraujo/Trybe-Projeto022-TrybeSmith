export type Loginserviceresponse = {
  status: 401 | 400;
  message: string;
} | {
  status: 200;
  token: string;
};