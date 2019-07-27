const Movie = require('../Models/Movie').Model;

const createMovie = async (req, res) => {
    const {
        id,
        key,
        originalTitle,
        rating,
        ratingDescription,
        runTime,
        poster,
        trailer,
        director,
        gender,
        distributor,
        actors,
        formats
    } = req.body;

    const newmovie = new Movie({
        id,
        key,
        originalTitle,
        rating,
        ratingDescription,
        runTime,
        poster,
        trailer,
        director,
        gender,
        distributor,
        actors,
        formats
    });
    let response = {};
    try {
        response = await newmovie.save();
    } catch (e) {
        response = e.message;
    }
    res.json(response);
}

const getMovie = async (req, res) => {
    let response = {};
    try {
        const movies = await Movie.find({}).exec();
        response = movies;
    }
    catch (e) {
        console.log(e);
        response.message = e.message;
    }

    res.json(response);
}


const getMovieByClave = async (req, res) => {
    const query = req.query.Clave;
    console.log(query);
    let response = {};
    try {
        const cities = await Movie.findById({ _id: query }).exec();
        response = cities;
    }
    catch (e) {
        console.log(e);
        response.message = e.message;
    }

    res.json(response);
}

const getMovieByClave2 = async (req, res) => {
    const query = req.params.clave;
    console.log(query);
    let response = await getMovieById(query);


    res.json(response);
}

const getMovieById = async (query) => {
    try {
        return await Movie.findById({ _id: query }).exec();
    }
    catch (e) {
        console.log(e);
        return null;
    }
}


const updateMovieByClave = async (req, res) => {
    const { clave } = req.params;
    const {
        key,
        originalTitle,
        rating,
        ratingDescription,
        runTime,
        poster,
        trailer,
        director,
        gender,
        distributor } = req.body;

    // movie.updateOne({ _id: clave }, { nombre }, async (e, response)  => {
    //         if (e) {
    //             console.log(e);
    //             res.status(500).json({
    //                 message: "error update"
    //             });
    //         } else {
    //             res.json(await getmovieById(clave));
    //         }
    // });

    try {
        await Movie.updateOne({ _id: clave }, {
            key,
            originalTitle,
            rating,
            ratingDescription,
            runTime,
            poster,
            trailer,
            director,
            gender,
            distributor
        }).exec();
    } catch (e) {
        res.status(500).json({
            error: e
        });
        return
    }
    res.json(await getMovieById(clave));

}

const deleteMovieByClave = async (req, res) => {
    const { clave } = req.params;

    try {
        await Movie.deleteOne({ _id: clave }).exec();
    } catch (e) {
        res.status(500).json({
            error: e
        });
        return
    }
    res.json({ ok: true });

}


exports.init = (expressApp) => {
    expressApp.post('/api/movie', createMovie);
    expressApp.get('/api/movie', getMovie);
    expressApp.get('/api/movie2/clave', getMovieByClave);
    expressApp.get('/api/movie/:clave', getMovieByClave2);
    expressApp.put('/api/movie/:clave', updateMovieByClave);
    expressApp.delete('/api/movie/:clave', deleteMovieByClave);

}

