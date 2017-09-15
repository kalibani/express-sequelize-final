var express = require('express');
var router = express.Router();
var models = require('../models')
/* GET home page. */



router.get('/', (req, res) =>{
  models.Item.findAll({order:[
      ['id', 'ASC']
    ]
  })
  .then(items =>{
         //res.send(items);
        // console.log('------', transaksi[1].Parking_spot.spot_name)
        res.render('items', {dataItems: items})
  })
  .catch(err =>{
    console.log(err);
  })
})

router.get('/add', (req, res) =>{
  models.Item.findAll()
  .then(items =>{
         //res.send(items);
        // console.log('------', transaksi[1].Parking_spot.spot_name)
        res.render('add_items', {dataItems: items})
  })
  .catch(err =>{
    console.log(err);
  })
})


router.post('/add', (req, res) => {
  models.Item.build({
      name: req.body.name,
      brand: req.body.brand,
      codeitem: req.body.codeitem
  })
  .save()
  .then(dataItems => {
    // res.send(rows)
    res.redirect('/items')
  })
  .catch(err =>{
    res.send(err)
  })
})


router.get('/edit/:id', function(req, res) {
  models.Item.findById(req.params.id)
  .then(items=> {
    res.render('edit_items', {dataItems: items})
  })
  .catch(err => {
    res.send(err)
  })
});

router.post('/edit/:id', function(req,res) {
  models.Item.update(
    {
      name: req.body.name,
      brand: req.body.brand,
      codeitem: req.body.codeitem
    },{ where: { id: req.params.id}
  })
  .then(items => {
    res.redirect('/items')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/delete/:id', (req,res) => {
  models.Item.destroy({
    where: {id:req.params.id}
  })
  .then(rows=> {
    res.redirect('/items')
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router;
