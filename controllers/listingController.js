const model = require("../models/listing");
exports.index = (req, res) => {
    let listings = model.find();
    const searchQuery = req.query.search;

    if (searchQuery) {
        listings = listings.filter(listing =>
            listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.description.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    listings.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    let message = "";
    if (searchQuery && listings.length === 0) {
        message = 'No results found for "' + searchQuery + '"';
    }
    res.render("./listings/index", { listings, message });
};

exports.new = (req, res) => {
    res.render("./listings/new");
};

exports.create = (req, res) => {
    let listing = req.body;
    if (req.file) {
        listing.image = `/images/${req.file.filename}`;
    }
    model.save(listing)
    res.redirect("/listings");
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let listing = model.findById(id);
    if (listing) {
        res.render("./listings/show", { listing });
    } else {
        let err = new Error("Listing not found with id " + id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let listing = model.findById(id);
    if (listing) {
        res.render("./listings/edit", { listing });
    } else {
        let err = new Error("Listing not found with id " + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next) => {
    let id = req.params.id;
    let listing = req.body;
    console.log("Before cleanup:", listing);
    delete listing.id;
    if (req.file) {
        listing.image = `/images/${req.file.filename}`;
    } else {
        delete listing.image;
    }
    console.log("After cleanup:", listing);
    if (model.updateById(id, listing)) {
        res.redirect("/listings/" + id);
    } else {
        let err = new Error("Listing not found with id " + id);
        err.status = 404;
        next(err);
    }
}

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect("/listings");
    } else {
        let err = new Error("Listing not found with id " + id);
        err.status = 404;
        next(err);
    }
}