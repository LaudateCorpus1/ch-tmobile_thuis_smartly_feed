require('dotenv').config();

const smartlyHerokuApiUrl = 'https://ghg-smartly-lemonpi-api.herokuapp.com/propositions';
const express = require('express');
const rp = require('request-promise');

const app = express();

app.get('/propositions', async (req, res) => {
  try {
    const {
      advertiser,
      dynamicInputId,
      agency,
      days,
      size,
      fieldsToFlatten,
    } = req.query;

    if (!size) {
      throw new Error('Please provide a size parameter and use a number to determine the propositions to return.');
    }

    const allowedFields = [
      'title',
      'description',
      'priceNormal',
      'priceDiscount',
      'stickerText',
      'custom1',
      'custom2',
      'custom3',
      'custom4',
    ];

    const resp = await rp(`${smartlyHerokuApiUrl}?advertiser=${advertiser}&dynamicInputId=${dynamicInputId}&agency=${agency}&days=${days}&size=${size}`);
    const respJSON = JSON.parse(resp);

    if (!fieldsToFlatten) {
      res.send(resp);
    } else {
      const fields = fieldsToFlatten.split(',')
        .filter(item => allowedFields.includes(item));

      respJSON.items = respJSON.items.map((item) => {
        const newProposition = item;

        fields.forEach((field) => {
          JSON.parse(newProposition[field]).forEach((prop) => {
            newProposition[prop.name] = prop.value;
          });
          newProposition[field] = '';
        });

        return newProposition;
      });

      res.send(respJSON);
    }
  } catch (e) {
    console.log(e);
    res.status(502).json({ error: e.toString() });
  }
});

const serv = app.listen(process.env.PORT || 3000, () => {
  console.log('App is listening on port', serv.address().port);
});
