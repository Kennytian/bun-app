import server from "bunrest";
import {createClient} from 'redis';
import {getRandom, isCode, isMobile} from "./utils";

const app = server();
const client = createClient({url: process.env.REDIS_URL});

app.get('/', (req, res) => {
  res.status(200).json({message: `Hello Bun.js from ${req.path}`});
});

app.post('/send', async (req, res) => {
  try {
    const {mobile} = req.body;
    if (!isMobile(`${mobile}`)) {
      res.status(400).json({success: false, message: 'The mobile number is invalid'});
      return;
    }
    const code = getRandom(100000, 999999);

    await client.connect();
    await client.multi().set(mobile, code).expire(mobile, +process.env.CODE_EXPIRE || 60).exec();
    res.status(200).json({success: true, message: 'The phone text is sent, please check it!'});
  } catch (e) {
    console.error('send=====', e)
    res.status(500).json({success: false, message: 'Server unavailable'});
  } finally {
    await client.disconnect();
  }
});

app.post('/verify', async (req, res) => {
  try {
    const mobile = String(req?.body?.mobile ?? '');
    const code = String(req?.body?.code ?? '');

    if (!isMobile(mobile)) {
      res.status(400).json({success: false, message: 'The mobile number is invalid'});
      return;
    }
    if (!isCode(code)) {
      res.status(400).json({success: false, message: 'The mobile code is invalid'});
      return;
    }

    await client.connect();
    const value = await client.get(mobile);

    if (value === code) {
      await client.expire(mobile, 0);
      res.status(200).json({success: true, message: 'The mobile code is correct'});
    } else {
      res.status(400).json({success: false, message: 'The mobile code is incorrect'});
    }
  } catch (e) {
    console.error('verify=====', e)
    res.status(500).json({message: 'Server unavailable'});
  } finally {
    await client.disconnect();
  }
});

app.listen(process.env.PORT, async () => {
  console.log('process.env.REDIS_URL====', process.env.REDIS_URL);
  console.log('process.env.CODE_EXPIRE====', process.env.CODE_EXPIRE);
  console.log(`App is listening on port ${process.env.PORT}`);
});
