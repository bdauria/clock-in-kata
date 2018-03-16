const assert = require('assert');
const sinon = require('sinon');
const { expect } = require('chai');
const { TestScheduler, Observable } = require('rxjs');

const backend = require('./backend');
const { commitTime } = require('./backend');
const { clockIn, clockInWithPosition } = require('./clock-in');

const user = 'Socrates';

describe('time tracking', () => {
  let commitTime;
  let getPosition;
  let testScheduler;

  before(() => {
    commitTime = sinon.stub(backend, 'commitTime');
    getPosition = sinon.stub(backend, 'getPosition');
  });

  beforeEach(() => {
    testScheduler = new TestScheduler();
  });

  context('when GPS is not required', () => {
    context('when service is available', () => {
      it('should clock in the user', done => {
        // stubout the result Observable of comitTime with a success response
        // assert
      });
    });

    context('when server is unavailable', () => {
      it('should report an error', done => {
        // stubout the result Observable of comitTime with an error
        // assert
      });
    });
  });

  context('GPS is optional', () => {
    context('GPS is not available', () => {
      context('server is available', () => {
        it('should clock in, without GPS data', done => {
          // stubout the result of getPosition with an error
          // stubout the result Observable of comitTime with a success response
          // assert
        });
      });

      context('server is not available', () => {
        it('should report an error', done => {
          // stubout the result of getPosition with a success response
          // stubout the result Observable of comitTime with an error
          // assert
        });
      });
    });

    context('GPS is available', () => {
      it('should clock in', done => {
        // stubout the result of getPosition with a success response
        // stubout the result Observable of comitTime with a success response
        // assert
      });
    });

    context('when the GPS is available only at the third attempt', () => {
      it('should clock in', done => {
        // create a deferred Observable by composing 3 failures, followed by one success
        // stubout the result of getPosition using the previously created stream
        // stubout the result Observable of comitTime with a success response
        // assert
      });
    });
  });
});
