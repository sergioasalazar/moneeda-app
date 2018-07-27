const MoneedaApi = require('../moneedaApi');

module.exports = function(router) {
  "use strict";

  /**
   * Returns all products shared between the exchanges
   */
  router.get('/products', (req, res) => {
    MoneedaApi.getAllProducts()
      .then(response => {
        res.json(response);
      })
      .catch(error => {
        res.status(error.statusCode);
        res.send(error);
      });
  });

  /**
   * Returns PRODUCT’s prices on all three exchanges
   */
  router.get('/products/:product/prices', (req, res) => {
    MoneedaApi.getProductPrices(req.params.product)
      .then(response => {
        res.json(response);
      })
      .catch(error => {
        res.status(error.statusCode);
        res.send(error);
      });
  });

  /**
   * Get Moneeda's suported exchanges
   */
  router.get('/exchanges', (req, res, next) => {
    res.json(MoneedaApi.getExchanges());
  });

  /** ENDPOINTS TO TEST MONEEDA API */
  /**
   * Get products per exchange
   */
  router.get('/exchanges/:exchange/products', (req, res) => {
    MoneedaApi.getProducts(req.params.exchange)
      .then(response => {
        res.json(response);
      })
      .catch(error => {
        res.status(error.statusCode);
        res.send(error);
      });
  });

  /**
   * Returns ticker by product
   */
  router.get('/exchanges/:exchange/ticker', (req, res) => {
    MoneedaApi.getTicker(req.params.exchange, req.query.product)
      .then(response => {
        res.json(response);
      })
      .catch(error => {
        res.status(error.statusCode);
        res.send(error);
      });
  });
};