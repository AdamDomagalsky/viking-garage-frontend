const url = 'https://viking-garage-api-dev';

const API = {

// login
  change: `${url}/user/change`,
  check: `${url}/user/check`,
  login: `${url}/user/login`,
  logout: `${url}/user/logout`,
  me: `${url}/me`,

// signin
  resend: `${url}/user/resend`,
  reset: `${url}/user/reset`,
  signin: `${url}/user/signin`,
  verify: `${url}/user/verify`,
// offer
  offer: `${url}/offer`,

};

export default API;
