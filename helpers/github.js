var Octokat = require('octokat');
var octo = new Octokat({token: process.env.githubToken});

var randColor = function() {
  let color = Math.round(0xffffff * Math.random()).toString(16);
  return ("00000" + color).slice(-6);
}

var github = {};

github.createLabel = async function(label) {
  let params = {
    name: label,
    color: randColor(),
  };
  try {
    return await octo.repos(process.env.githubOrg, process.env.githubRepo).labels.create(params);
  } catch (err) {
    return err;
  }
}

github.createIssue = async function(title, label) {
  let params = {
    title: title,
    labels: [label],
  }
  try {
    return await octo.repos(process.env.githubOrg, process.env.githubRepo).issues.create(params);
  } catch (err) {
    return err;
  }
}

github.repoUrl = 'https://github.com/' + process.env.githubOrg + '/' + process.env.githubRepo;
github.issueTrackerUrl = github.repoUrl + '/issues';

module.exports = github;
