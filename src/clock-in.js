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
  return backend
    .getPosition()
    .retry(3)
    .switchMap(position => backend.commitTime(user, position))
    .map(_ => `${user} has been clocked in.`)
    .catch(_ => clockIn(user).map(result => result + ' Without GPS though'));
}
