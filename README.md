# AdGeek Queue

Client library for adding tasks to the AdGeek Task Queue


# Installation

```
npm install cocktail-insights/adgeek-queue
```

# Usage/Example

```javascript
const Queue = require('adgeek-queue');

const EmailQueue = Queue({
  host: '<task_queue_host>',
  auth: '<redis_auth>',
});

EmailQueue.addEmailTask('welcome_email', {
  to: ['foo@bar.baz'],
  subject: 'Welcome to CS 101!!!',
  data: {
    fizz: 'buzz', // extra data for templates
  },
});
```

# Test

```
npm test
```
