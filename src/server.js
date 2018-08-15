require('dotenv').config();

const smartlyHerokuApiUrl = 'https://ghg-smartly-lemonpi-api.herokuapp.com/propositions';
const express = require('express');
const rp = require('request-promise');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.send();
  }
  return next();
});

app.get('/propositions', async (req, res) => {
  try {
    const {
      advertiser,
      dynamicInputId,
      agency,
      days,
      size,
    } = req.query;

    const resp = await rp(`${smartlyHerokuApiUrl}?advertiser=${advertiser}&dynamicInputId=${dynamicInputId}&agency=${agency}&days=${days}&size=${size}`);
    const respJSON = JSON.parse(resp);

    respJSON.items = respJSON.items.map((item) => {
      const newProposition = item;

      JSON.parse(item.description).forEach((prop) => {
        newProposition[prop.name] = prop.value;
      });

      newProposition.description = '';

      return newProposition;
    });

    res.send(respJSON);
  } catch (e) {
    console.log(e);
    res.status(502).json({ error: e.toString() });
  }
});

const serv = app.listen(process.env.PORT || 3000, () => {
  console.log('App is listening on port', serv.address().port);
});
