const axios = require('axios');

module.exports = {
    searchYoutube
};


const searchFixture = {
    "kind": "youtube#searchListResponse",
    "etag": "Qs_uxugcRlMqeMpynEdgFqA3eMQ",
    "nextPageToken": "CAwQAA",
    "regionCode": "US",
    "pageInfo": {
        "totalResults": 62212,
        "resultsPerPage": 12
    },
    "items": [
        {
            "kind": "youtube#searchResult",
            "etag": "ibHJ4hb8aapwMWeDGv4Jw3WYKpE",
            "id": {
                "kind": "youtube#video",
                "videoId": "-NM5jPUB54E"
            },
            "snippet": {
                "publishedAt": "2020-08-30T19:30:00Z",
                "channelId": "UC-7RDShJHg-QfxLkcNXG-nQ",
                "title": "TRAPPIN IN ＰＡＲＡＤＩＳＥ  73",
                "description": "Trap Phonk , Lofi Hip-Hop , Chill beats , Bass Mix Tracklist- 0:00 GREEN PICCOLO - Haters Won't Miss Me 2:32 BLESSED - nostalgia 4:42 ＤＪ ＲＥＣＬＶＳＥ ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/-NM5jPUB54E/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/-NM5jPUB54E/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/-NM5jPUB54E/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Smooth S o u n d s",
                "liveBroadcastContent": "none",
                "publishTime": "2020-08-30T19:30:00Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "6htQAdApOOjvo7hIlhqEEg0Wxfs",
            "id": {
                "kind": "youtube#video",
                "videoId": "4nO5t3wceyE"
            },
            "snippet": {
                "publishedAt": "2020-08-02T19:30:00Z",
                "channelId": "UC-7RDShJHg-QfxLkcNXG-nQ",
                "title": "TRAPPIN IN ＰＡＲＡＤＩＳＥ  72",
                "description": "Trap Phonk , Lofi Hip-Hop , Chill beats , Bass Mix Tracklist- 0:00 GREEN PICCOLO - Can I? 3:41 N X X Y S - FRUSTRATED 5:31 TRE FLIP - SHATTER w/SIN ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/4nO5t3wceyE/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/4nO5t3wceyE/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/4nO5t3wceyE/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Smooth S o u n d s",
                "liveBroadcastContent": "none",
                "publishTime": "2020-08-02T19:30:00Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "bWyKMQxNy9QR7tiPrkmpy4Vfz-U",
            "id": {
                "kind": "youtube#video",
                "videoId": "HjxZYiTpU3k"
            },
            "snippet": {
                "publishedAt": "2019-06-23T20:00:01Z",
                "channelId": "UC-7RDShJHg-QfxLkcNXG-nQ",
                "title": "TRAPPIN IN ＰＡＲＡＤＩＳＥ  50",
                "description": "Had to reupload this due to the visuals getting the video blocked. Hopefully it wont happen this time. 2 Hour Trap Phonk & Lofi Hip-Hop Mix Tracklist- 1.",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/HjxZYiTpU3k/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/HjxZYiTpU3k/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/HjxZYiTpU3k/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Smooth S o u n d s",
                "liveBroadcastContent": "none",
                "publishTime": "2019-06-23T20:00:01Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "K7HfRGxI1fP9M70FFrDS-OYlR2Y",
            "id": {
                "kind": "youtube#video",
                "videoId": "sbNr1hbboRo"
            },
            "snippet": {
                "publishedAt": "2020-05-17T19:45:02Z",
                "channelId": "UC-7RDShJHg-QfxLkcNXG-nQ",
                "title": "TRAPPIN IN ＰＡＲＡＤＩＳＥ  69",
                "description": "Trap Phonk , Lofi Hip-Hop , Chill beats , Bass Mix Tracklist- 0:00 DVRX x MINOTAUR - MAGIC 3:03 rximv - Drive 6:14 OPEN - INFLUENTIAL 9:43 overslept ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/sbNr1hbboRo/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/sbNr1hbboRo/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/sbNr1hbboRo/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Smooth S o u n d s",
                "liveBroadcastContent": "none",
                "publishTime": "2020-05-17T19:45:02Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "0L9SdqJnMUi7BGhkcG_Gh5kgkxI",
            "id": {
                "kind": "youtube#video",
                "videoId": "3FEk13IgUHU"
            },
            "snippet": {
                "publishedAt": "2020-06-07T19:00:00Z",
                "channelId": "UC-7RDShJHg-QfxLkcNXG-nQ",
                "title": "TRAPPIN IN ＰＡＲＡＤＩＳＥ  70",
                "description": "Trap Phonk , Lofi Hip-Hop , Chill beats , Bass Mix Tracklist- 0:00 GREEN PICCOLO - Darkness 2:39 Sappy - I CAN'T GO w/ PET$MPI 4:45 HAGESHI JIGOKU X ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/3FEk13IgUHU/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/3FEk13IgUHU/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/3FEk13IgUHU/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Smooth S o u n d s",
                "liveBroadcastContent": "none",
                "publishTime": "2020-06-07T19:00:00Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "GGIW8rznLBRZfW_1Au_IsdHKnLc",
            "id": {
                "kind": "youtube#video",
                "videoId": "BIGeVzR80wA"
            },
            "snippet": {
                "publishedAt": "2020-07-05T20:00:00Z",
                "channelId": "UC-7RDShJHg-QfxLkcNXG-nQ",
                "title": "TRAPPIN IN ＰＡＲＡＤＩＳＥ  71",
                "description": "Trap Phonk , Lofi Hip-Hop , Chill beats , Bass Mix Tracklist- 0:00 GREEN PICCOLO - Rest In Peace 2:36 CHEESY KUT - PAY DA PRICE w/ GOUPIL 5:05 menø.",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/BIGeVzR80wA/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/BIGeVzR80wA/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/BIGeVzR80wA/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Smooth S o u n d s",
                "liveBroadcastContent": "none",
                "publishTime": "2020-07-05T20:00:00Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "j5jZ12R0QLc8l_FHGKIgYoDtpzs",
            "id": {
                "kind": "youtube#video",
                "videoId": "zmdUBcnCfKw"
            },
            "snippet": {
                "publishedAt": "2017-05-24T22:26:16Z",
                "channelId": "UC-7RDShJHg-QfxLkcNXG-nQ",
                "title": "TRAPPIN IN ＰＡＲＡＤＩＳＥ 8",
                "description": "Trap Phonk Mix Tracklist- 1. 0:00 Myrror - rise 2. 1:38 DRAE DA SKIMASK - LOADING 3. 4:00 DJ YUNG VAMP - I NEVER SCARED 4. 6:19 emune - lifted 5.",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/zmdUBcnCfKw/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/zmdUBcnCfKw/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/zmdUBcnCfKw/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Smooth S o u n d s",
                "liveBroadcastContent": "none",
                "publishTime": "2017-05-24T22:26:16Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "4YXKgiLfTIHpI1_9xI45sVyN5MM",
            "id": {
                "kind": "youtube#video",
                "videoId": "-EcJdMrkX6o"
            },
            "snippet": {
                "publishedAt": "2020-02-16T20:45:00Z",
                "channelId": "UC-7RDShJHg-QfxLkcNXG-nQ",
                "title": "TRAPPIN IN ＰＡＲＡＤＩＳＥ  65",
                "description": "Trap Phonk , Lofi Hip-Hop , Chill beats , Bass Mix Tracklist- 1. 0:00 GREEN PICCOLO - The Chronic 2. 3:30 Celo - EVERYWHERE 3. 5:27 MUSA VENTO ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/-EcJdMrkX6o/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/-EcJdMrkX6o/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/-EcJdMrkX6o/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Smooth S o u n d s",
                "liveBroadcastContent": "none",
                "publishTime": "2020-02-16T20:45:00Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "OMG79NQn3KOaVhxYcPpLLlSsk8M",
            "id": {
                "kind": "youtube#video",
                "videoId": "6YZhh0IHQhg"
            },
            "snippet": {
                "publishedAt": "2017-06-14T16:52:49Z",
                "channelId": "UC-7RDShJHg-QfxLkcNXG-nQ",
                "title": "TRAPPIN IN ＰＡＲＡＤＩＳＥ 12",
                "description": "Trap Phonk & Lofi Hip-Hop Mix Tracklist- 1. 0:00 SLIGHT - We Smoke 2. 2:25 ｊａｒ ｊａｒ ｊｒ - treasure maps 3. 4:25 SOUDIERE - BET 4. 7:47 j.robb - comeagainn 5.",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/6YZhh0IHQhg/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/6YZhh0IHQhg/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/6YZhh0IHQhg/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Smooth S o u n d s",
                "liveBroadcastContent": "none",
                "publishTime": "2017-06-14T16:52:49Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "hXpUl7iFBI970ymUmPcOG0VkYIc",
            "id": {
                "kind": "youtube#video",
                "videoId": "FeE2K5Gt0LE"
            },
            "snippet": {
                "publishedAt": "2019-07-07T20:00:00Z",
                "channelId": "UC-7RDShJHg-QfxLkcNXG-nQ",
                "title": "TRAPPIN IN ＰＡＲＡＤＩＳＥ  55",
                "description": "Trap Phonk & Lofi Hip-Hop Mix Tracklist- 1. 0:00 GREEN PICCOLO - X.Files 2. 3:11 Goupil. - DROWNING 3. 5:36 overslept - never dead 4. 7:51 Billy the Kid ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/FeE2K5Gt0LE/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/FeE2K5Gt0LE/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/FeE2K5Gt0LE/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Smooth S o u n d s",
                "liveBroadcastContent": "none",
                "publishTime": "2019-07-07T20:00:00Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "J-L6ZWnp1VinWCArls_YT2pYfuc",
            "id": {
                "kind": "youtube#video",
                "videoId": "_EmF6nPSpCI"
            },
            "snippet": {
                "publishedAt": "2017-05-27T19:54:52Z",
                "channelId": "UC-7RDShJHg-QfxLkcNXG-nQ",
                "title": "TRAPPIN IN ＰＡＲＡＤＩＳＥ 9",
                "description": "Trap Phonk Mix Tracklist- 1. 0:00 BACKWOOD BOY- MiamiSoHigh 2. 2:47 SOUDIERE - SLOW DOWN w/ MYTHIC & REDHANDS 3. 5:46 DJ YUNG VAMP ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/_EmF6nPSpCI/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/_EmF6nPSpCI/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/_EmF6nPSpCI/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Smooth S o u n d s",
                "liveBroadcastContent": "none",
                "publishTime": "2017-05-27T19:54:52Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "F3Hb9-At5Fa3awOH6CiNxgK0fMI",
            "id": {
                "kind": "youtube#video",
                "videoId": "GNsGRDs9k9M"
            },
            "snippet": {
                "publishedAt": "2017-10-04T21:38:20Z",
                "channelId": "UC-7RDShJHg-QfxLkcNXG-nQ",
                "title": "TRAPPIN IN ＰＡＲＡＤＩＳＥ 21",
                "description": "I had to re-upload this due to the rick and morty visuals getting the video blocked worldwide :\\ Trap Phonk & Lofi Hip-Hop Mix Tracklist- 1. 0:00 BACKWHEN ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/GNsGRDs9k9M/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/GNsGRDs9k9M/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/GNsGRDs9k9M/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Smooth S o u n d s",
                "liveBroadcastContent": "none",
                "publishTime": "2017-10-04T21:38:20Z"
            }
        }
    ]
}


async function searchYoutube({ searchTerm, apiKey }) {
    return searchFixture.items
    return axios
        .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${searchTerm}&key=${apiKey}`)
        .then((response) => {
            return response.data.items;
        });
}
