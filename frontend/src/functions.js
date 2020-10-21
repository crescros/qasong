import axios from "axios";

let baseUrl;

if (process.env.NODE_ENV === "production") {
  baseUrl = process.env.REACT_APP_API_URL_RELATIVE;
} else {
  baseUrl = process.env.REACT_APP_API_URL_LOCAL;
}

export function setDefaultToken(token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export function getYoutubeIdFromSearch(search) {
  if (!search) {
    return [];
  }

  return axios
    .get(baseUrl + "api/search?q=" + search)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      alert(error);
      return [];
    });
}

export function authenticateUser(username, password) {
  const postBody = {
    username: username,
    password: password,
  };

  return axios
    .post(baseUrl + "api/users/authenticate", postBody)
    .then((result) => {
      console.log(result)
      setDefaultToken(result.data.token);
      return result;
    })
    .catch((error) => {
      return error;
    });
}

export function createUser(username, password) {
  const postBody = {
    username: username,
    password: password,
  };

  return axios
    .post(baseUrl + "api/users/create", postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
}

export function getNodeEnvironment() {
  return axios
    .get(baseUrl + "api/env")
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      alert(error);
      return error;
    });
}

export function formatVideoTitle(name) {
  if (name.length < 40) {
    return name;
  } else {
    return name.substr(0, 40) + "...";
  }
}

export function getQueueFromIds(search) {
  return axios
    .get(baseUrl + "api/search/ids?" + search)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
      alert(error + " " + error.response && error.response.data);
      return [];
    });
}

export function copyCurrentURL(e) {
  let dummy = document.createElement("textarea");

  let app = document.querySelector('#app')
  
  app.appendChild(dummy);

  dummy.value = location.href;
  dummy.select();
  document.execCommand("copy");
  app.removeChild(dummy);
}

export function shuffle(array) {
  var tempArray = array 
  tempArray.sort(() => Math.random() - 0.5);
  return tempArray
}