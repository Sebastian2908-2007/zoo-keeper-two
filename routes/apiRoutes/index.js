const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');
const zookeeperRoutes = require('../apiRoutes/zookeeperRoutes');

// middleware for zookeeper routes for server.js use
router.use(zookeeperRoutes);

// middleware for animal routes fo server.js to use
router.use(animalRoutes);

module.exports = router;