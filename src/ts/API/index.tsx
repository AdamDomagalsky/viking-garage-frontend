const url = 'http://localhost:4000';

const API = {

// login
  change: `${url}/user/change`,
  check: `${url}/user/check`,
  login: `${url}/user/login`,
  logout: `${url}/user/logout`,
  user: `${url}/user`,

// signin
  resend: `${url}/user/resend`,
  reset: `${url}/user/reset`,
  signin: `${url}/user/signin`,
  verify: `${url}/user/verify`,


// offer
  offer: `${url}/offer`,

};

export default API;
