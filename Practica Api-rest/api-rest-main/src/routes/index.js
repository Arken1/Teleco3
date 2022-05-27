const { Router } = require('express');

const router = new Router();

router.get('/test', (req, res) => {
    const data = {
        name: 'Sergio B',
        website: 'sergio.bolanos@uao.edu.co'
    };
    res.json(data);
});  

module.exports = router;
