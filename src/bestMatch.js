const sortBy = require("lodash.sortby");

/**
 *
 * @description Calculates best match for new friend given the current data
 * @param {{photo: string; name: string; answers: number[]}} newFriend
 * @param {{photo: string; name: string; answers: number[]}[]} data
 * @returns {Promise<{photo: string; name: string;}>} best match
 */
module.exports = async (newFriend, data) => {
  const friends = data.friends;
  return new Promise(resolve => {
    friends.forEach(friend => {
      friend.difference = friend.answers.reduce((acc, curr, idx) => {
        return acc + Math.abs(curr - newFriend.answers[idx]);
      }, 0);
    });
    const sorted = sortBy(friends, ["difference"]);
    const match = sorted[0];
    resolve({ data: { photo: match.photo, name: match.name } });
  });
};
