var express = require('express');
var router = express.Router();
var models = require('../models')
/* GET home page. */



router.get('/', (req, res) =>{
  models.Suppliers.findAll()
  .then(suppliers =>{
         //res.send(suppliers);
        // console.log('------', transaksi[1].Parking_spot.spot_name)
        res.render('suppliers', {dataSuppliers: suppliers})
  })
  .catch(err =>{
    console.log(err);
  })
})

router.get('/add', (req, res) =>{
  models.Suppliers.findById()
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
//
//
// router.get('/delete/:id', (req,res) => {
//   models.Transaksi.destroy({
//     where: {id:req.params.id}
//   })
//   .then(rows=> {
//     res.redirect('/parkir')
//   })
//   .catch(err => {
//     res.send(err)
//   })
// })
//
// router.get('/edit/:id', function(req, res) {
//   models.Transaksi.findById(req.params.id, {
//     include: ['Driver', 'Parking_spot'],
//   })
//   .then(rows=> {
//     res.render('edit_parkir', {data: rows})
//   })
//   .catch(err => {
//     res.send(err)
//   })
// });
//
// router.post('/edit/:id', function(req,res) {
//   // res.send(req.body.spot_name)
//   models.Transaksi.update(
//     {
//       no_plat: req.body.no_plat,
//       DriverId: req.body.DriverId,
//       spot_name: req.body.spot_name,
//       jam_keluar: new Date()
//     },
//     {
//       where: { DriverId: req.params.id}
//     }
//   )
//   .then(rows => {
//     console.log(rows);
//     res.redirect('/parkir')
//   })
//   .catch(err => {
//     res.send(err)
//   })
// })

module.exports = router;
