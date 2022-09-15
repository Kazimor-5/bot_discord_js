const axios = require('axios'); // * Ajout de la librairie axios

// ! Toujours encoder avec encodeURIComponent() les paramètres GET d'une URL
const makeURL = (query) =>
  `https://mtxserv.com/api/v1/articles/?query=${encodeURIComponent(query)}`;

class HowToApi {
  async search(query) {
    try {
      const response = await axios.get(makeURL(query));
      const { data } = response;

      if (!data) throw new Error('invalid response of mTxServ.com API');

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = HowToApi;
