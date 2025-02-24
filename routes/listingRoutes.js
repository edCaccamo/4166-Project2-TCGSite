const express = require('express');
const controller = require('../controllers/listingController');

const router = express.Router();

//GET /listings: send all listings to the user

router.get('/', controller.index);

//GET /listings/new: send html form for creating a new listing

router.get('/new', controller.new);

//POST /listings: create a new listing

router.post('/', controller.create);

//GET /listings/:id: send details of listing identified by id

router.get('/:id', controller.show);

//GET /listings/:id/edit: sned html form for editing an existing listing

router.get('/:id/edit', controller.edit);

//PUT /listings/:id: update the listing identified by id

router.put('/:id', controller.update);

//DELETE /listings/:id, delete the listing identified by id.

router.delete('/:id', controller.delete);

module.exports = router;