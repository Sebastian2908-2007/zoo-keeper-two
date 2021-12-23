const path = require('path');
const router = require('express').Router();

// serves index html to the root path of our server
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// serves animals.html 
router.get('/animals',(req,res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

// serves zookeper.html
router.get('/zookeepers', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

// wild card route for non existent requests"this type route should always be last
router.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});



module.exports = router;