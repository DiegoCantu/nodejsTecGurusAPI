

const City = require('../Models/City').Model;

const createCity = async (req, res) => {
    const { nombre, clave , complejos , geoX,geoY } = req.body;
    const newCity = new City({ nombre, clave , complejos , geoX,geoY });
    let response = {};
    try {
        response = await newCity.save();
    } catch (e) {
        response = e.message;
    }
    res.json(response);
}

const getCity = async (req, res) => {
    let response = {};
    try {
        const cities = await City.find({}).exec();
        response = cities;
    }
    catch (e) {
        console.log(e);
        response.message = e.message;
    }

    res.json(response);
}


const getCityByClave = async (req, res) => {
    const query = req.query.Clave;
    console.log(query);
    let response = {};
    try {
        const cities = await City.findById({ _id: query }).exec();
        response = cities;
    }
    catch (e) {
        console.log(e);
        response.message = e.message;
    }

    res.json(response);
}

const getCityByClave2 = async (req, res) => {
    const query = req.params.clave;
    console.log(query);
    let response = await getCityById(query);
    

    res.json(response);
}

const getCityById = async (query)=> {
    try {
        return await City.findById({ _id: query }).exec();
    }
    catch (e) {
        console.log(e);
        return null;
    }
}


const updateCityByClave = async (req, res) => {
    const { clave } = req.params;
    const { nombre } = req.body;

    // City.updateOne({ _id: clave }, { nombre }, async (e, response)  => {
    //         if (e) {
    //             console.log(e);
    //             res.status(500).json({
    //                 message: "error update"
    //             });
    //         } else {
    //             res.json(await getCityById(clave));
    //         }
    // });

    try {
        await City.updateOne({ _id: clave }, { nombre }).exec();
    } catch (e) {
        res.status(500).json({
            error: e
        });
        return  
    } 
    res.json(await getCityById(clave));
    
}

const deleteCityByClave = async (req, res) => {
    const { clave } = req.params;

    try {
        await City.deleteOne({ _id: clave }).exec();
    } catch (e) {
        res.status(500).json({
            error: e
        });
        return  
    } 
    res.json({ok: true});
    
}


exports.init = (expressApp) => {
    expressApp.post('/api/city', createCity);
    expressApp.get('/api/city', getCity);
    expressApp.get('/api/city2/clave', getCityByClave);
    expressApp.get('/api/city/:clave', getCityByClave2);
    expressApp.put('/api/city/:clave', updateCityByClave);
    expressApp.delete('/api/city/:clave', deleteCityByClave);

}

