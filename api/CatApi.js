const axios = require('axios');
const makeURL = () => 'https://api.thecatapi.com/v1/images/search?limit=1';

class CatApi {
  async random() {
    try {
      const response = await axios.get(makeURL());
      const { data } = response;

      if (!data) throw new Error('invalid response of api.thecatapi.com');

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CatApi;
