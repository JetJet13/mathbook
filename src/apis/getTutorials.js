'use strict'
const github = require('../github-client')

module.exports = function (req, res) {
  // get authenticated user
  return github.users.get({})
  .then((result) => {
    console.log('result', result.data)
    const login = result.data.login
    console.log('login', login)
    return login
  })
  .then((username) => {
    const repo = 'testing'
    return github.repos.getBranches({
      owner: username,
      repo: repo
    })
  })
  .then((branches) => {
    console.log('branches', branches)
    res.send({ tutorials: branches.data.filter((branch) => branch.name !== 'master').map((branch) => ({ name: branch.name.replace('tutorial/', '') })) })
  })
  .catch((err) => {
    console.log('error getting branches/tutorials', err)
    res.send(err)
  })
}
