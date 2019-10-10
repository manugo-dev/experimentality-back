import quotesModel from '../../models/quotesModel';

class quotesController {
  static getAll(req, res) {
    quotesModel.find((error, quotes) => {
      if (error) {
        return res.status(500).send(error);
      }
      if (!quotes) {
        return res.status(204).sendJSON('No content');
      }
      return res.status(200).send(quotes);
    });
  }

  static get(req, res) {
    res.send('obtener quote');
  }

  static remove(req, res) {
    res.send('eliminar quote');
  }
}

export default quotesController;
