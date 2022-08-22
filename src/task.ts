import queue from 'queue';

import type { QueueWorkerCallback } from 'queue';

export const q = queue({ results: [] });

// add jobs using the familiar Array API
q.push((cb) => {
  const result = 'two';

  cb?.(new Error(), result);
});

q.push(
  (cb) => {
    const result = 'four';
    cb?.(new Error(), result);
  },
  (cb) => {
    const result = 'five';
    cb?.(new Error(), result);
  }
);

// jobs can accept a callback or return a promise
q.push(() => {
  return new Promise((resolve, reject) => {
    const result = 'one';
    resolve(result);
  });
});

q.unshift((cb) => {
  const result = 'one';
  cb?.(new Error(), result);
});

q.splice(2, 0, (cb) => {
  const result = 'three';
  cb?.(new Error(), result);
});

// use the timeout feature to deal with jobs that
// take too long or forget to execute a callback
q.timeout = 100;

q.on('timeout', (next, job) => {
  console.log('job timed out:', job.toString().replace(/\n/g, ''));
  next();
});

q.push((cb) => {
  setTimeout(() => {
    console.log('slow job finished');
    cb?.();
  }, 200);
});

q.push((cb) => {
  console.log('forgot to execute callback');
});

// jobs can also override the queue's timeout
// on a per-job basis
q.push((cb?: QueueWorkerCallback): void => {
  setTimeout(() => {
    console.log('extra slow job finished');
    cb?.();
  }, 400);
});

// jobs can also opt-out of the timeout altogether
q.push((cb?: QueueWorkerCallback) => {
  setTimeout(() => {
    console.log('super slow job finished');
    cb?.();
  }, 1000);
});

// get notified when jobs complete
q.on('success', (result, job) => {
  console.log('job finished processing:', job.toString().replace(/\n/g, ''));
  console.log('The result is:', result);
});

// begin processing, get notified on end / failure
q.start((err) => {
  if (err) throw err;
  console.log('all done:', q.results);
});
