var express = require('express');
var router = express.Router();
var models = require('../models')
/* GET home page. */



router.get('/', (req, res) =>{
  models.Suppliers.findAll({order:[
      ['id', 'ASC']
    ]
  })
  .then(suppliers =>{
    models.Item.findAll()
    .then(items=>{
      models.SupplierItem.findAll()
      .then(supplierItem=>{
      //res.send(transaksi);
      // console.log('------', transaksi[1].Parking_spot.spot_name)
        res.render('suppliers', {dataSuppliers: suppliers, dataItems: items, dataSuppliersItems: supplierItem})
      })
    })
  })
  .catch(err =>{
  res.send(err);
  })
})

router.get('/add', (req, res) =>{
  models.Suppliers.findAll()
  .then(suppliers =>{
         //res.send(suppliers);
        // console.log('------', transaksi[1].Parking_spot.spot_name)
        res.render('add_suppliers', {dataSuppliers: suppliers})
  })
  .catch(err =>{
    console.log(err);
  })
})


router.post('/add', (req, res) => {
  models.Suppliers.build({
      nama: req.body.nama,
      kota: req.body.kota
  })
  .save()
  .then(dataSuppliers => {
    // res.send(rows)
    res.redirect('/suppliers')
  })
  .catch(err =>{
    res.send(err)
  })
})


router.get('/edit/:id', function(req, res) {
  models.Suppliers.findById(req.params.id)
  .then(suppliers=> {
    res.render('edit_suppliers', {dataSuppliers: suppliers})
  })
  .catch(err => {
    res.send(err)
  })
});

router.post('/edit/:id', function(req,res) {
  models.Suppliers.update(
    {
      nama: req.body.nama,
      kota: req.body.kota
    },{ where: { id: req.params.id}
  })
  .then(suppliers => {
    res.redirect('/suppliers')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/delete/:id', (req,res) => {
  models.Suppliers.destroy({
    where: {id:req.params.id}
  })
  .then(rows=> {
    res.redirect('/suppliers')
  })
  .catch(err => {
    res.send(err)
  })
})



module.exports = router;
