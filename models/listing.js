const { DateTime } = require('luxon');
const { v4: uuidv4 } = require('uuid');
const listings = [
    {
        id: '1',
        name: 'Umbreon EX SAR - 161/131',
        brand: 'Pokemon',
        description: 'Straight out of the pack, this card is mint',
        set: 'Prismatic Evolutions',
        price: '1999.99',
        seller: 'Joey Bee',
        image: '/images/Umbreon1.jpg',
        numOffers: '2',
        quality: 'Near Mint',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }, {
        id: '2',
        name: 'Charizard EX Sar',
        brand: 'Pokemon',
        description: 'N/A',
        set: 'Obsidian Flames',
        price: '399.99',
        seller: 'Joey Bee',
        image: '/images/Charizard1.jpg',
        numOffers: '1',
        quality: 'Near Mint',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }, {
        id: '3',
        name: 'Malfegor',
        brand: 'Magic',
        description: 'Malfegor is pretty cool',
        set: 'Conflux',
        price: '16.00',
        seller: 'Joey Bee',
        image: '/images/magic2.jpg',
        numOffers: '3',
        quality: 'Lightly Played',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }, {
        id: '4',
        name: 'Cacturne ex',
        brand: 'Pokemon',
        description: 'Cacturne is the best cactus',
        set: 'EX Emerald',
        price: '87.00',
        seller: 'Joey Bee',
        image: '/images/cacturn1.jpg',
        numOffers: '2',
        quality: 'Moderately Played',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }, {
        id: '5',
        name: 'Esper Sentinel',
        brand: 'Magic',
        description: 'Very playable',
        set: 'Modern Horizons 2',
        price: '47.99',
        seller: 'Joey Bee',
        image: '/images/magic1.jpg',
        numOffers: '3',
        quality: 'Lightly Played',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }, {
        id: '6',
        name: "Steven's Resolve",
        brand: 'Pokemon',
        description: 'Grade 10 worthy',
        set: 'Celestial Storm',
        price: '34.99',
        seller: 'Joey Bee',
        image: '/images/Steven1.jpg',
        numOffers: '0',
        quality: 'Near Mint',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }
];

exports.find = function () {
    return listings;
};

exports.findById = function (id) {
    return listings.find(listing => listing.id === id);
};

exports.save = function (listing) {
    listing.id = uuidv4();
    listing.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    listings.push(listing);
};

exports.updateById = function (id, newListing) {
    let listing = listings.find(listing => listing.id === id);
    if (listing) {
        listing.name = newListing.name;
        listing.description = newListing.description;
        listing.brand = newListing.brand;
        listing.set = newListing.set;
        listing.price = newListing.price;
        listing.quality = newListing.quality;
        return true;
    } else {
        return false;
    }
}

exports.deleteById = function (id) {
    let index = listings.findIndex(listing => listing.id === id);
    if (index > -1) {
        listings.splice(index, 1);
        return true;
    } else {
        return false;
    }
}