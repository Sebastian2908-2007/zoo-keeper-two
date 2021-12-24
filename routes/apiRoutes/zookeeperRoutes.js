const router = require('express').Router();
const {filterByyQuery, findById, createNewZookeeper,validateZookeeper} = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers.json');


// route to get all zookeepers or get zookeepers by specific query
router.get('/zookeepers', (req,res) => {
    let results = zookeepers;
    if(req.query) {
        results = filterByyQuery(req.query,results);
    }
    res.json(results);
});

router.get('/zookeepers/:id', (req,res) => {
    const result = findById(req.params.id, zookeepers);
    if(result) {
        res.json(result);
    }else{
        res.sendStatus(404);
    }
});

router.post('/zookeepers', (req,res) => {
    // setting zookeeper id based on array length
    req.body.id = zookeepers.length.toString();

    // validate zookeeper object data
    if(!validateZookeeper(req.body)) {
        res.sendStatus(400).send('zookeeper improperly formatted!')
    }else{
        const zookeeper = createNewZookeeper(req.body,zookeepers);
        res.json(zookeeper);
    }

});
module.exports = router;