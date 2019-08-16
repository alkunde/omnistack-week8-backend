const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
  async index(req, res) {
    const { user } = req.headers;
    const loggedDev = await Dev.findById(user);
    console.log("User: " + user);
    console.log("loggedDev: " + loggedDev);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: loggedDev._id } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    })

    return res.json(users);
  },

  async store(req, res) {
    const { username } = req.body;
    console.log(username);

    const userExists = await Dev.findOne({ user: username });

    if (userExists) {
      console.log(userExists);
      return res.json(userExists);
    } else {
      console.log("Novo usuário");
    }

    const response = await axios.get(`https://api.github.com/users/${username}`);

    const { name, bio, avatar_url: avatar, followers, following, public_repos: publicRepos } = response.data;

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar,
      followers,
      following,
      publicRepos
    })

    return res.json(dev);
  }
};
