exports.init = (expressApp) => {
    expressApp.get('/Otro', (req, res) => {
        // const jose = new Persona();
        // jose.name = 'Jose';
        // jose.save();
      
        res.send("Otro");
      });

}