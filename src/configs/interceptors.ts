import axios from "axios";

axios.defaults.baseURL = "https://randomuser.me/api";
axios.interceptors.request.use(function (config) {
  const params = new URLSearchParams();
  params.append("seed", "saltgate");
  const existingUrl = new URL(`${config.baseURL}${config.url}`);
  const existingParams = existingUrl.searchParams;
  existingParams.forEach((value, key) => params.append(key, value));

  const queryString = params.toString();
  config.url = `${existingUrl.origin}${existingUrl.pathname}${queryString ? `?${queryString}` : ""}`;
  return config;
});
