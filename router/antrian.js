const antrianController = require('../controller/antrian');

module.exports = app => {
    app.post('/api/antrian', antrianController.addAntrian);
    app.put('/api/antrian/:id',antrianController.callAntrian);
    app.get('/api/antrian', antrianController.getAntrian);
    app.get('/api/antrian/detail', antrianController.detailAntrianPasien);
}