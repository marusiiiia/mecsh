const lsTokenKey = "my_app_token";

function setTokenOnLogin(res) {
  const isLoginUrl = res.config.url.includes("login");
  if (isLoginUrl) localStorage.setItem(lsTokenKey, res.data.token);
  return res;
}

function getClearResponse(res) {
  return res.data;
}

function onError(err) {
  console.log(err);
  Promise.reject(err);
}

function setToken(req) {
  const isAuthUrl = req.url.includes("auth");

  if (!isAuthUrl) {
    const token = localStorage.getItem(lsTokenKey);
    req.headers["x-access-token"] = token;
  }
  return req;
}

export default function (axios) {
  axios.interceptors.request.use(setToken);
  axios.interceptors.response.use(setTokenOnLogin);
  axios.interceptors.response.use(getClearResponse, onError);
}
