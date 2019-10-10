import axios from 'axios';
import quotesModel from '../../models/quotesModel';

class generatorsController {
  static async getRandomQuote(category, number) {
    const response = await axios({
      method: 'POST',
      url: 'https://andruxnet-random-famous-quotes.p.rapidapi.com/',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-rapidapi-host': 'andruxnet-random-famous-quotes.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      },
      params: {
        count: number,
        cat: category,
      },
      data: {},
    }).catch(error => {
      throw new Error(error);
    });
    const [{ quote }] = response.data;
    return quote;
  }

  static async getImageFromContext(quote, number) {
    const context = quote.split(' ');
    const response = await axios({
      method: 'GET',
      url: 'https://api.unsplash.com/search/photos/',
      params: {
        client_id: process.env.IMAGE_API_KEY,
        query: context.toString(),
        page: 1,
        per_page: number,
      },
    }).catch(error => {
      throw new Error(error);
    });
    const [{ urls }] = response.data.results;
    return urls.small;
  }

  static async randomQuoteWithImage() {
    const quote = await generatorsController.getRandomQuote('famous', 1);
    const image = await generatorsController.getImageFromContext(quote, 1);
    return { quote, image };
  }

  static async get(req, res) {
    const quoteWithImage = await generatorsController
      .randomQuoteWithImage()
      .catch(err => res.status(500).send(err));
    const { quote, image } = quoteWithImage;
    quotesModel.create({ quote, image }, (saveErr, savedQuote) => {
      if (saveErr) {
        return res.status(500).send(saveErr);
      }
      const responseJSON = {
        // eslint-disable-next-line no-underscore-dangle
        id: savedQuote._id,
        quote: savedQuote.quote,
        image: savedQuote.image,
      };
      return res.status(201).send(responseJSON);
    });
  }
}

export default generatorsController;
