import moment from 'moment';

const port = parseInt(process.env.PORT) || 3000;
console.log(`try to curl http://localhost:${port}`)

export default {
  port,
  fetch(req) {
    const url = new URL(req.url);
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    return new Response(`Hello from bun on ali could!\nThe time is ${now}.\nThis is ${url.pathname}.`);
  }
};

