function shuffle(array) {
  let tempArray = array;
  tempArray.sort(() => Math.random() - 0.5);
  return tempArray;
}

function cleanInput(text) {
  return text
    .replace(/@/g, "")
    .replace(/#/g, "")
    .replace(/`/g, "'")
    .replace(/http:\/\//g, "")
    .replace(/https:\/\//g, "");
};

module.exports.shuffle = shuffle;
module.exports.cleanInput = cleanInput;