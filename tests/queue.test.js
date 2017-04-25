const test = require('tape');

const Queue = require('../index');

const testQueue = Queue();

test('setup', (t) => {
  // setup goes here, call t.end() when finished
  testQueue.queue.testMode.enter();
  t.end();
});

test('Queue should have one task after adding', (t) => {
  testQueue.addEmailTask('email', {
    to: 'foo@bar.com',
    subject: 'Test Email',
    data: {
      foo: 'bar',
    },
  });

  t.equal(testQueue.queue.testMode.jobs.length, 1, 'One task in the queue');
  t.end();
});

test('teardown', (t) => {
  // teardown goes here, call t.end() when finished
  testQueue.queue.testMode.exit();
  t.end();
});
