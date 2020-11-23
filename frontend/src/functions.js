import axios from "axios";

const baseUrl = process.env.REACT_APP_ARTISTIFY_URL; // prod url
// const baseUrl = "./"; // prod url
// const baseUrl = "http://localhost:3016/"; // dev url

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
      alert(error);
      return error;
    });
}

export function getBillboardTop100() {
  return axios
    .get(baseUrl + "api/billboard")
    .then((result) => {
      return result;
    })
    .catch((error) => {
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
      alert(error + " " + error.response && error.response.data);
      return [];
    });
}

export function getFeed() {
  return axios
    .get(baseUrl + "api/feed")
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      alert(error + " " + error.response && error.response.data);
      return [];
    });
}

export function copyCurrentURL() {
  let dummy = document.createElement("textarea");

  let app = document.querySelector("#app");

  app.appendChild(dummy);

  dummy.value = location.href;
  dummy.select();
  document.execCommand("copy");
  app.removeChild(dummy);
}

export function shuffle(array) {
  let tempArray = array;
  tempArray.sort(() => Math.random() - 0.5);
  return tempArray;
}

export function clear(array) {
  array = [];
  return array;
}

export function getDurationFromQueue(queue) {
  const totalSeconds = queue.reduce((total, song) => {
    return total + song.seconds;
  }, 0);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours} hrs ${minutes} min`;
  } else {
    return `${minutes} min`;
  }
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}