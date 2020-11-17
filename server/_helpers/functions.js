module.exports = shuffle;

function shuffle(array) {
  let tempArray = array;
  tempArray.sort(() => Math.random() - 0.5);
  return tempArray;
}
