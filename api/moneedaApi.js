const rp = require('request-promise-native');

class MoneedaApi {
  constructor() {
    this.ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldkBnbG92b2FwcC5jb20iLCJpZCI6IjVhNTcyZGEyNTM4OWMzNzZiZWZlNjY1NCIsImlhdCI6MTUxNTY2MjgyMn0.a6homMOumqLBxwfX9nOwbBaxmSx-srkS8dISSPCPPYE";
    this.EXCHANGES = [
      { id: "BNB", description: "Binance API" },
      { id: "BTX", description: "Bittrex API" },
      { id: "BFX", description: "Bitfinex API" },
    ];
  }
  /**
   * Return Exchanges
   */
  getExchanges() {
    return this.EXCHANGES;
  }

  /**
   * Get products per exchange
   * @param {*} exchange 
   */
  getProducts(exchange) {
    const options = {
      uri: `https://api.moneeda.com/api/exchanges/${exchange}/products`,
      headers: {
        Authorization: `Bearer ${this.ACCESS_TOKEN}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
      },
      json: true
    };

    return rp(options)
      .then(response => {
        return response;
      })
      .catch(error => {
        this.logError(error);
        throw error;
      });
  }

  /**
   * Get an Array with All the products of every Exchange available
   */
  getAllProducts() {
    return Promise.all(this.EXCHANGES.map(exchange => {
      return this.getProducts(exchange.id)
        .then(res => {
          return {
            exchange: `${exchange.id}`,
            products: res
          };
        })
        .catch(error => {
          this.logError(error);
          throw error;
        });
    }))
      .then(res => {
        let result = this.getCommonProducts(res);
        return result;
      })
      .catch(error => {
        this.logError(error);
        throw error;
      });
  }

  /**
   * Get the Ticher of specific product
   * @param {*} exchange 
   * @param {*} product 
   */
  getTicker(exchange, product) {
    const options = {
      uri: `https://api.moneeda.com/api/exchanges/${exchange}/ticker?product=${product}`,
      headers: {
        Authorization: `Bearer ${this.ACCESS_TOKEN}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
      },
      json: true
    };

    return rp(options)
      .then(response => {
        return response;
      })
      .catch(error => {
        this.logError(error);
        throw error;
      });
  }

  /**
   * Get product's prices on all exchanges
   * @param {*} product 
   */
  getProductPrices(product) {
    return Promise.all(this.EXCHANGES.map(exchange => {
      return this.getTicker(exchange.id, product)
        .then(res => {
          return {
            exchange: exchange.id,
            product,
            prices: res
          };
        })
        .catch(error => {
          this.logError(error);
          throw error;
        });
    }));
  }

  getCommonProducts(exchangeProducts) {
    // let result = [];
    let products = Array.from(exchangeProducts.map(productList => productList.products))
      .reduce((previous, current) => {
        return previous.filter(product => {
          return current.find(el => {
            return el.id === product.id;
          })
        });
      });

    // result = exchangeProducts.map(exchange => {
    //   return products.map(common => {
    //     return exchange.products.find(el => {
    //       if (common.id === el.id) {
    //         el.exchange = exchange.exchange;
    //         return true;
    //       }
    //     });
    //   });
    // });

    // return Array.prototype.concat([], ...result);
    return products;
  }

  /**
   * Logs the error in Server console
   * @param {*} error 
   */
  logError(error) {
    console.log(`${error.name} - ${error.statusCode} - ${error.error.message}`);
  }
}

module.exports = new MoneedaApi();