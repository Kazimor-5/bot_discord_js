const got = require('got');

// * Vous devez toujours encoder avec encodeURIComponent() les paramètres GET d'une URL
const makeURL = (query) =>
  `https://mtxserv.com/api/v1/articles/?query=${encodeURIComponent(query)}`;

class HowToApi {
  async search(query) {
    const response = await got(makeURL(query), {
      responseType: 'json',
    });

    if (!response || !response.body) {
      throw new Error('Invalid response of mTxServ.com API');
    }

    return response.body;
  }
}

module.exports = HowToApi;
