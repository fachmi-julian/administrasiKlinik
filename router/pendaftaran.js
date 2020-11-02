const pendaftaranController = require('../controller/pendaftaran')


module.exports = app => {
    app.post('/api/pendaftaran',pendaftaranController.addPasien);
    app.get('/api/pendaftaran/', pendaftaranController.getPasien);  
    app.get('/api/pendaftaran/:nik', pendaftaranController.getPasienByNik);
    app.put('/api/pendaftaran/:idPasien', pendaftaranController.updatePasien);
    app.put('/api/pasien/:id', pendaftaranController.riwayatPasien);
      
}