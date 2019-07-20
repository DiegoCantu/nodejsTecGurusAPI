const mongoose = require('mongoose');

const Complex = [{
    nombre: String,
    clave: String
}];

const schemaCity = new mongoose.Schema({
    complejos: Complex,
    nombre: String,
    clave: String,
    geoX: String,
    geoY: String
});


exports.Model = mongoose.model('City', schemaCity);
