const kue = require('kue');

module.exports = (opts) => {
  const defaultOptions = {
    port: 6379,
    host: '127.0.0.1',
    prefix: 'q',
  };

  const options = Object.assign({}, defaultOptions, opts || {});

  const queue = kue.createQueue({
    prefix: options.prefix,
    redis: {
      port: options.port,
      host: options.host,
      auth: options.auth || null,
    },
  });

  return {
    queue: process.env.NODE_ENV === 'testing' ? queue : null,

    /**
     * Add an Email to the Task Queue
     *
     * @param {String} template Email template to be used
     * @param {String} emailData.subject
     * @param {String[]} emailData.to
     * @param {Object} emailData.data
     */
    addEmailTask(template, emailData, cb) {
      const callback = cb || (() => {});
      return queue.create(template.toUpperCase(), {
        subject: emailData.subject,
        to: emailData.to,
        templateData: emailData.data,
      }).attempts(10).backoff({
        type: 'exponential',
        delay: 5000,
      })
        .save((err) => {
          if (err) {
            callback(err);
          } else {
            callback(null);
          }
        });
    },

    /**
     * Add an Email to the Task Queue
     *
     * @param {Object} logData
     * @param {Function} cb
     */
    addLogTask(logData, cb) {
      const callback = cb || (() => {});
      return queue.create('LOG', logData).attempts(10).backoff({
        type: 'exponential',
        delay: 5000,
      }).save((err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    },
  };
};
