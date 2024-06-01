import express from 'express';
import * as database from './database.js';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: "http://192.168.101.104:8081",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}

app.use(express.json());
app.use(cors(corsOptions));

//up

app.get("/user/:id", async (req, res) => {
    const user = await database.getUsuarioById(req.params.id);
    res.status(200).send(user);
});

app.get("/userLog/:email/:password", async (req, res) => {
    const userLog = await database.logInValidator(req.params.email, req.params.password);
    if(userLog.length === 0)
        res.status(200).send({});
    else
        res.status(200).send(userLog);

});


//id Getter
app.get("/getWorker/:userId", async (req, res) => {
    const worker = await database.getWorkerByUser(req.params.userId);
    if(worker.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(worker);
});
app.get("/getCamp/:userId", async (req, res) => {
    const camp = await database.getCampByUser(req.params.userId);
    if(camp.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(camp);
});
app.get("/getAdquisition/:userId", async (req, res) => {
    const adquisition = await database.getAdquisitionByUser(req.params.userId);
    if(adquisition.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(adquisition);
});
app.get("/getPlanting/:userId", async (req, res) => {
    const planting = await database.getPlantingByUser(req.params.userId);
    if(planting.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(planting);
});
app.get("/getFertilization/:userId", async (req, res) => {
    const fertilization = await database.getFertilizationByUser(req.params.userId);
    if(fertilization.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(fertilization);
});
app.get("/getFumigation/:userId", async (req, res) => {
    const fumigation = await database.getFumigationByUser(req.params.userId);
    if(fumigation.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(fumigation);
});
app.get("/getCultive/:userId", async (req, res) => {
    const cultive = await database.getCultiveByUser(req.params.userId);
    if(cultive.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(cultive);
});
app.get("/getComercialization/:userId", async (req, res) => {
    const comercialization = await database.getComercializationByUser(req.params.userId);
    if(comercialization.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(comercialization);
});

//id Getter
app.get("/getWorkerId/:id", async (req, res) => {
    const worker = await database.getWorkerById(req.params.id);
    if(worker.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(worker[0]);
});
app.get("/getCampId/:id", async (req, res) => {
    const camp = await database.getCampById(req.params.id);
    if(camp.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(camp);
});
app.get("/getAdquisitionId/:id", async (req, res) => {
    const adquisition = await database.getAdquisitionById(req.params.id);
    if(adquisition.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(adquisition[0]);
});
app.get("/getPlantingId/:id", async (req, res) => {
    const planting = await database.getPlantingById(req.params.id);
    if(planting.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(planting[0]);
});
app.get("/getFertilizationId/:id", async (req, res) => {
    const fertilization = await database.getFertilizationById(req.params.id);
    if(fertilization.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(fertilization[0]);
});
app.get("/getFumigationId/:id", async (req, res) => {
    const fumigation = await database.getFumigationById(req.params.id);
    if(fumigation.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(fumigation[0]);
});
app.get("/getCultiveId/:id", async (req, res) => {
    const cultive = await database.getCultiveById(req.params.id);
    if(cultive.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(cultive[0]);
});
app.get("/getComercializationId/:id", async (req, res) => {
    const comercialization = await database.getComercializationById(req.params.id);
    if(comercialization.length === 0)
        res.status(200).send([]);
    else
        res.status(200).send(comercialization[0]);
});

//register
app.post("/regUser", async (req, res) => {
    try {
        const resultado = await database.createUsuario(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ mensaje: 'Error al crear el usuario' });
    }
});

//create
app.post("/createCamp", async (req, res) => {
    try {
        const resultado = await database.createCamp(req.body.campData, req.body.points, req.body.idUsuario);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al crear el campo:', error);
        res.status(500).json({ mensaje: 'Error al crear el campo.' });
    }
});
app.post("/createWorker", async (req, res) => {
    try {
        const resultado = await database.createWorker(req.body.workerData, req.body.idUsuario);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al crear el empleado:', error);
        res.status(500).json({ mensaje: 'Error al crear el empleado.' });
    }
});
app.post("/createAdqui", async (req, res) => {
    try {
        const resultado = await database.createAdquisicion(req.body.adquisicionData, req.body.idUsuario);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al crear la adquisición:', error);
        res.status(500).json({ mensaje: 'Error al crear la adquisición.' });
    }
});
app.post("/createPlant", async (req, res) => {
    try {
        const resultado = await database.createPlanting(req.body.plantingData, req.body.idUsuario);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al crear la siembra:', error);
        res.status(500).json({ mensaje: 'Error al crear la siembra.' });
    }
});
app.post("/createFert", async (req, res) => {
    try {
        const resultado = await database.createFertilization(req.body.fertilizationData, req.body.idUsuario);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al crear la fertilizacion:', error);
        res.status(500).json({ mensaje: 'Error al crear la fertilizacion' });
    }
});
app.post("/createFum", async (req, res) => {
    try {
        const resultado = await database.createFumigation(req.body.fumigationData, req.body.idUsuario);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al crear la fumigación:', error);
        res.status(500).json({ mensaje: 'Error al crear la fumigación.' });
    }
});
app.post("/createCultive", async (req, res) => {
    try {
        const resultado = await database.createCultive(req.body.cultiveData, req.body.idUsuario);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al crear el cultivo:', error);
        res.status(500).json({ mensaje: 'Error al crear el cultivo.' });
    }
});
app.post("/createComer", async (req, res) => {
    try {
        const resultado = await database.createComercialization(req.body.comercializationData, req.body.idUsuario);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al crear la comecialización:', error);
        res.status(500).json({ mensaje: 'Error al crear la comecialización.' });
    }
});

//update
app.post("/updateCamp", async (req, res) => {
    try {
        const resultado = await database.updateCamp(req.body.campData, req.body.points, req.body.id);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al actualizar el campo:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el campo.' });
    }
});
app.post("/updateWorker", async (req, res) => {
    try {
        const resultado = await database.updateWorker(req.body.workerData, req.body.id);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al actualizar el empleado:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el empleado.' });
    }
});
app.post("/updateAdqui", async (req, res) => {
    try {
        const resultado = await database.updateAdquisicion(req.body.adquisicionData, req.body.id);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al actualizar la adquisición:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la adquisición.' });
    }
});
app.post("/updatePlant", async (req, res) => {
    try {
        const resultado = await database.updatePlanting(req.body.plantingData, req.body.id);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al actualizar la siembra:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la siembra.' });
    }
});
app.post("/updateFert", async (req, res) => {
    try {
        const resultado = await database.updateFertilization(req.body.fertilizationData, req.body.id);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al crear la fertilización:', error);
        res.status(500).json({ mensaje: 'Error al crear la fertilizacion.' });
    }
});
app.post("/updateFum", async (req, res) => {
    try {
        const resultado = await database.updateFumigation(req.body.fumigationData, req.body.id);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al actualizar la fumigación:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la fumigación.' });
    }
});
app.post("/updateCultive", async (req, res) => {
    try {
        const resultado = await database.updateCultive(req.body.cultiveData, req.body.id);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al actualizar el cultivo:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el cultivo.' });
    }
});
app.post("/updateComer", async (req, res) => {
    try {
        const resultado = await database.updateComercialization(req.body.comercializationData, req.body.id);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al actualizar la comecialización:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la comecialización.' });
    }
});

//DELETE
app.post("/deleteCamp", async (req, res) => {
    try {
        const resultado = await database.deleteCampo(req.body.id, req.body.points);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al borrar el campo:', error);
        res.status(500).json({ mensaje: 'Error al borrar el campo.' });
    }
});
app.get("/isUsedC/:id", async (req, res) => {
    const worker = await database.isUsedC(req.params.id, req.params.idA, req.params.idM, req.params.idP);
    res.status(200).send(worker);
});
app.post("/deleteWorker", async (req, res) => {
    try {
        const resultado = await database.deleteEmpleado(req.body.id);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al borrar el empleado:', error);
        res.status(500).json({ mensaje: 'Error al borrar el empleado.' });
    }
});
app.get("/isUsedW/:id", async (req, res) => {
    const worker = await database.isUsedW(req.params.id);
    if(worker.length === 0)
        res.status(200).send(false);
    else
        res.status(200).send(true);
});
app.post("/deleteAdqui", async (req, res) => {
    try {
        const resultado = await database.deleteAdquisition(req.body.id);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al borrar la daquisición:', error);
        res.status(500).json({ mensaje: 'Error al borrar la daquisición.' });
    }
});


app.post("/deletePlant", async (req, res) => {
    try {
        const resultado = await database.deletesiembra(req.body.id, req.body.idS);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al borrar la siembra:', error);
        res.status(500).json({ mensaje: 'Error al borrar la siembra.' });
    }
});
app.post("/deleteFert", async (req, res) => {
    try {
        const resultado = await database.deleteFertilization(req.body.id, req.body.idF);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al borrar la fertilización:', error);
        res.status(500).json({ mensaje: 'Error al borrar la fertilización.' });
    }
});
app.post("/deleteFum", async (req, res) => {
    try {
        const resultado = await database.deleteFumigation(req.body.id, req.body.idF);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al borrar la fumigación:', error);
        res.status(500).json({ mensaje: 'Error al borrar la fumigación.' });
    }
});
app.post("/deleteCultive", async (req, res) => {
    try {
        const resultado = await database.deleteCultive(req.body.id, req.body.idC);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al borrar el cultivo:', error);
        res.status(500).json({ mensaje: 'Error al borrar el cultivo.' });
    }
});
app.post("/deleteComer", async (req, res) => {
    try {
        const resultado = await database.deleteComer(req.body.id, req.body.idC);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al borrar la comercialización:', error);
        res.status(500).json({ mensaje: 'Error al borrar la comercialización.' });
    }
});

app.listen(8080, () => {
    console.log("Servidor escuchando el puerto 8080");
});
