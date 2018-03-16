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
        commitTime.returns(testScheduler.createColdObservable('-a'));

        clockIn(user).subscribe(value => {
          expect(value).to.equal('Socrates has been clocked in.');
          done();
        });

        testScheduler.flush();
      });
    });

    context('when server is unavailable', () => {
      it('should report an error', done => {
        commitTime.returns(testScheduler.createColdObservable('-#'));

        clockIn(user).subscribe(value => {
          expect(value).to.equal('error from the server');
          done();
        });

        testScheduler.flush();
      });
    });
  });

  context('GPS is optional', () => {
    context('GPS is not available', () => {
      context('server is available', () => {
        it('should clock in, without GPS data', done => {
          getPosition.returns(testScheduler.createColdObservable('-#'));
          commitTime.returns(testScheduler.createColdObservable('-a'));

          clockInWithPosition(user).subscribe(value => {
            expect(value).to.equal(
              'Socrates has been clocked in. Without GPS though'
            );
            done();
          });

          testScheduler.flush();
        });
      });

      context('server is not available', () => {
        it('sholud report an error', () => {
          getPosition.returns(testScheduler.createColdObservable('-#'));
          commitTime.returns(testScheduler.createColdObservable('-#'));

          clockInWithPosition(user).subscribe(value => {
            expect(value).to.equal('error from server');
          });
        });
      });
    });

    context('GPS is available', () => {
      it('should clock in', done => {
        getPosition.returns(testScheduler.createColdObservable('-a'));
        commitTime.returns(testScheduler.createColdObservable('-a'));

        clockInWithPosition(user).subscribe(value => {
          expect(value).to.equal('Socrates has been clocked in.');
          done();
        });
        testScheduler.flush();
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
});
