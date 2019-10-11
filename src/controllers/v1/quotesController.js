/* eslint-disable consistent-return */
import quotesModel from '../../models/quotesModel';

class quotesController {
  static getAll(req, res) {
    quotesModel.find((errorResponse, quotes) => {
      if (errorResponse) {
        return res.status(500).send({ error: errorResponse });
      }
      if (!quotes) {
        return res.status(204).sendJSON({ error: 'No content' });
      }
      return res.status(200).send(quotes);
    });
  }

  static get(req, res) {
    if (!req.params.id) {
      return res.status(500).send({ error: `Not id provided` });
    }
    quotesModel.findById(req.params.id.toString(), (error, quote) => {
      if (error) {
        return res
          .status(500)
          .send({ error: 'Error searching this value on database' });
      }
      if (!quote) {
        return res.status(204).sendJSON({ error: 'No content' });
      }
      return res.status(200).send(quote);
    });
  }

  static remove(req, res) {
    if (!req.params.id) {
      return res.status(500).send({ error: `Not id provided` });
    }
    quotesModel.findByIdAndDelete(
      req.params.id.toString(),
      (error, response) => {
        if (error) {
          return res.status(500).send({
            error: 'Error searching and deleting this value on database',
          });
        }
        if (!response) {
          return res.status(409).send({
            error: 'Not content found',
          });
        }
        return res.status(200).send({ removed: response });
      },
    );
  }
}

export default quotesController;
