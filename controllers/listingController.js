const model = require("../models/listing");
exports.index = (req, res) => {
    let listings = model.find();
    res.render("./listings/index", { listings });
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