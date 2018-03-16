const backend = require('./backend');
const { Observable } = require('rxjs');

module.exports = {
  clockIn,
  clockInWithPosition
};

function clockIn(user) {
  return backend
    .commitTime(user)
    .map(_ => `${user} has been clocked in.`)
    .catch(_ => Observable.of('error from the server'));
}

function clockInWithPosition(user) {
  // TODO
}
