import axios from "axios";
import { isMobile } from "react-device-detect";

const baseUrl = process.env.REACT_APP_API_URL;

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

export function getFeed(pageNumber = 1) {
  return axios
    .get(baseUrl + "api/feed/?page=" + pageNumber)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      alert(error + " " + error.response && error.response.data);
      return [];
    });
}

export function postUserFeedback(text) {
  const postData = {
    message: text,
    mobile: isMobile,
  };

  axios({
    method: "POST",
    url: baseUrl + "api/discord",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(postData),
  }).catch((e) => {
    throw(e)
  });
}

// PLAYLISTS

export function getPlaylists() {
  const storedPlaylists = localStorage.getItem("playlists");

  if (!storedPlaylists) {
    localStorage.setItem("playlists", "[]");
    return getPlaylists();
  }

  return JSON.parse(storedPlaylists);
}

export function updatePlaylists(playlists) {
  localStorage.setItem("playlists", JSON.stringify(playlists));
}

export function getPlaylist(id) {
  const playlist = getPlaylists().find((playlist) => playlist.id === id);
  return playlist;
}

export function addPlaylist(newPlaylist) {
  const playlists = getPlaylists().concat(newPlaylist);
  updatePlaylists(playlists);
  return playlists;
}

export function updatePlaylist(id, updatedPlaylist) {
  const playlists = getPlaylists().map((playlist) => {
    if (playlist.id === id) {
      return updatedPlaylist;
    } else {
      return playlist;
    }
  });
  updatePlaylists(playlists);
  return playlists;
}

export function removePlaylist(id) {
  const playlists = getPlaylists().filter((playlist) => playlist.id !== id);
  updatePlaylists(playlists);
  location.reload();
  return playlists;
}

// OTHER
export function formatVideoTitle(name) {
  if (name.length < 40) {
    return name;
  } else {
    return name.substr(0, 40) + "...";
  }
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
  let tempArray = [...array];
  tempArray.sort(() => Math.random() - 0.5);

  if (tempArray !== array) {
    return tempArray;
  } else {
    return shuffle(array);
  }
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
  if (!x) return "";

  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatSeconds(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  if (minutes === 0) {
    minutes = "00";
  } else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (remainingSeconds === 0) {
    remainingSeconds = "00";
  } else if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }

  if (hours) {
    return `${hours}:${minutes}:${remainingSeconds}`;
  } else {
    return `${minutes}:${remainingSeconds}`;
  }
}
