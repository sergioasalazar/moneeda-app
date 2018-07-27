const moneedaRoutes = require('./moneeda');

module.exports = function(router) {
  router.get('/', function(req, res, next) {
    res.send('Moneeda App API');
  });

  moneedaRoutes(router);
}