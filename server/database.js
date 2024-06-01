import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MY_SQL_Host,
    user: process.env.MY_SQL_User,
    password: process.env.MY_SQL_Password,
    database: process.env.MY_SQL_Database
}).promise();

// User
export async function logInValidator(email, password){
    const [rows] = await pool.query('SELECT * FROM usuario WHERE eMail = ? AND contrasenna = ?;', [email, password]);
    if(rows.length === 0)
        return {};
    else
        return rows[0];
}

export async function createUsuario(usuarioData) {
    const { nombreUsuario, contrasenna, nombre, aPaterno, aMaterno, eMail, telefono } = usuarioData;
    const [result] = await pool.query('INSERT INTO usuario (nombreUsuario, contrasenna, nombre, aPaterno, aMaterno, eMail, telefono) VALUES (?, ?, ?, ?, ?, ?, ?);', [nombreUsuario, contrasenna, nombre, aPaterno, aMaterno, eMail, telefono]);
    const [row] = await pool.query('SELECT * FROM usuario WHERE idUsuario=?;', [result.insertId])
    return row[0];
}

//tabs
export async function getCampByUser(idUsuario){
    const [rows] = await pool.query('SELECT campo.idCampo As id, campo.nombre AS clave FROM campo WHERE campo.idUsuario=?;', [idUsuario]);
    if(rows.length === 0)
        return [];
    else
        return rows;
}
export async function getWorkerByUser(idUsuario){
    const [rows] = await pool.query('SELECT empleado.idEmpleado AS id, empleado.nombreEmpleado AS clave FROM empleado WHERE empleado.idUsuario=?;', [idUsuario]);
    if(rows.length === 0)
        return [];
    else
        return rows;
}
export async function getAdquisitionByUser(idUsuario){
    const [rows] = await pool.query('SELECT practica.idPractica AS id, practica.fechaInicio AS clave FROM practica WHERE practica.idRAdquisicion IS NOT NULL AND practica.idUsuario=?;', [idUsuario]);
    if(rows.length === 0)
        return [];
    else
        return rows;
}
export async function getPlantingByUser(idUsuario){
    const [rows] = await pool.query('SELECT practica.idPractica AS id, practica.fechaInicio AS clave FROM practica WHERE practica.idRSiembra IS NOT NULL AND practica.idUsuario=?;', [idUsuario]);
    if(rows.length === 0)
        return [];
    else
        return rows;
}
export async function getFertilizationByUser(idUsuario){
    const [rows] = await pool.query('SELECT practica.idPractica AS id, practica.fechaInicio AS clave FROM practica WHERE practica.idRFertilizacion IS NOT NULL AND practica.idUsuario=?;;', [idUsuario]);
    if(rows.length === 0)
        return [];
    else
        return rows;
}
export async function getFumigationByUser(idUsuario){
    const [rows] = await pool.query('SELECT practica.idPractica AS id, practica.fechaInicio AS clave FROM practica WHERE practica.idRPlaguicida IS NOT NULL AND practica.idUsuario=?;;', [idUsuario]);
    if(rows.length === 0)
        return [];
    else
        return rows;
}
export async function getCultiveByUser(idUsuario){
    const [rows] = await pool.query('SELECT practica.idPractica AS id, practica.fechaInicio AS clave FROM practica WHERE practica.idRCultivo IS NOT NULL AND practica.idUsuario=?;;', [idUsuario]);
    if(rows.length === 0)
        return [];
    else
        return rows;
}
export async function getComercializationByUser(idUsuario){
    const [rows] = await pool.query('SELECT practica.idPractica AS id, practica.fechaInicio AS clave FROM practica WHERE practica.idRComercializacion IS NOT NULL AND practica.idUsuario=?;;', [idUsuario]);
    if(rows.length === 0)
        return [];
    else
        return rows;
}
//read
export async function getCampById(id){
    const [rows] = await pool.query('SELECT campo.idCampo AS id, campo.suelo AS suelo, campo.nombre AS nombre, campo.area AS area, punto.idPunto AS idPunto, punto.longitud AS longitud, punto.latitud AS latitud FROM campo, poligono, punto WHERE campo.idCampo=? AND poligono.idCampo=campo.idCampo AND poligono.idPunto=punto.idPunto;', [id]);
    if(rows.length === 0)
        return {};
    else
        return rows;
}
export async function getWorkerById(id){
    const [rows] = await pool.query('SELECT idEmpleado, nombreEmpleado, telefono, salario, rol FROM empleado WHERE empleado.idEmpleado=?;', [id]);
    if(rows.length === 0)
        return {};
    else
        return rows;
}
export async function getAdquisitionById(id){
    const [rows] = await pool.query('SELECT p.idPractica AS id, p.fechaInicio AS fecha, p.duracion AS duracion, p.observacion AS obs, e.idEmpleado AS idEmpleado, e.nombreEmpleado AS nombreEmpleado, a.cantidad AS cantidad, m.nombre AS material, m.tipo AS tipo, m.descripcion AS descripcion, m.costo AS costo, pr.responsable AS proveedor, pr.telefono AS tel, ca.idCampo AS idCampo, ca.nombre AS nombreCampo, a.idRAdquisicion AS idA, m.idMaterial AS idM, pr.idProveedor AS idP FROM practica AS p, empleado AS e, material AS m, materialadquisicion AS ma, radquisicion AS a, proveedor AS pr, materialproveedor AS mp, campo AS ca WHERE p.idPractica=? AND p.idEmpleado=e.idEmpleado AND p.idRAdquisicion=a.idRAdquisicion AND ma.idMaterial=m.idMaterial AND ma.idRAdquisicion=a.idRAdquisicion AND mp.idMaterial=m.idMaterial AND mp.idProveedor=pr.idProveedor AND p.idCampo=ca.idCampo;', [id]);
    if(rows.length === 0)
        return {};
    else
        return rows;
}
export async function getPlantingById(id){
    const [rows] = await pool.query('SELECT p.idPractica AS id, p.fechaInicio AS fecha, p.duracion AS duracion, p.observacion AS obs, e.idEmpleado AS idEmpleado, e.nombreEmpleado, s.noPlantas AS cantidad, s.lote AS lote, ca.idCampo AS idCampo, ca.nombre AS nombreCampo, s.idRSiembra AS idS FROM practica AS p, empleado AS e, rsiembra AS s, campo AS ca WHERE p.idPractica=? AND p.idEmpleado=e.idEmpleado AND p.idRSiembra=s.idRSiembra AND p.idCampo=ca.idCampo;', [id]);
    if(rows.length === 0)
        return {};
    else
        return rows;
}
export async function getFertilizationById(id){
    const [rows] = await pool.query('SELECT p.idPractica AS id, p.fechaInicio AS fecha, p.duracion AS duracion, p.observacion AS obs, e.idEmpleado AS idEmpleado, e.nombreEmpleado, f.tipo AS tipo, f.dosis AS dosis, f.cantidadNitrogeno AS cantidadN, ca.idCampo AS idCampo, ca.nombre AS nombreCampo, f.idRFertilizacion AS idF FROM practica AS p, empleado AS e, rfertilizacion AS f, campo AS ca WHERE p.idPractica=? AND p.idEmpleado=e.idEmpleado AND p.idRFertilizacion=f.idRFertilizacion AND p.idCampo=ca.idCampo;', [id]);
    if(rows.length === 0)
        return {};
    else
        return rows;
}
export async function getFumigationById(id){
    const [rows] = await pool.query('SELECT p.idPractica AS id, p.fechaInicio AS fecha, p.duracion AS duracion, p.observacion AS obs, e.idEmpleado AS idEmpleado, e.nombreEmpleado, f.componenteActivo AS componente, f.fitosanitario AS fito, f.motivo AS motivo, f.dosis AS dosis, f.modoAplicacion AS aplicacion, f.plazoSeguridad AS plazo, ca.idCampo AS idCampo, ca.nombre AS nombreCampo, f.idRPlaguicida AS idF FROM practica AS p, empleado AS e, rplaguicida AS f, campo AS ca WHERE p.idPractica=? AND p.idEmpleado=e.idEmpleado AND p.idRPlaguicida=f.idRPlaguicida AND p.idCampo=ca.idCampo;', [id]);
    if(rows.length === 0)
        return {};
    else
        return rows;
}
export async function getCultiveById(id){
    const [rows] = await pool.query('SELECT p.idPractica AS id, p.fechaInicio AS fecha, p.duracion AS duracion, p.observacion AS obs, e.idEmpleado AS idEmpleado, e.nombreEmpleado, c.cultivo AS cultivo, ca.idCampo AS idCampo, ca.nombre AS nombreCampo, c.idRCultivo AS idC FROM practica AS p, empleado AS e, rcultivo AS c , campo AS ca WHERE p.idPractica=? AND p.idEmpleado=e.idEmpleado AND p.idRCultivo=c.idRCultivo AND p.idCampo=ca.idCampo;', [id]);
    if(rows.length === 0)
        return {};
    else
        return rows;
}
export async function getComercializationById(id){
    const [rows] = await pool.query('SELECT p.idPractica AS id, p.fechaInicio AS fecha, p.duracion AS duracion, p.observacion AS obs, e.idEmpleado AS idEmpleado, e.nombreEmpleado, c.cultivo AS cultivo, c.vCosecha AS cosecha, c.vComercio AS comer, c.destino AS dest , ca.idCampo AS idCampo, ca.nombre AS nombreCampo, c.idRComercializacion AS idC FROM practica AS p, empleado AS e, rcomercializacion AS c , campo AS ca WHERE p.idPractica=? AND p.idEmpleado=e.idEmpleado AND p.idRComercializacion=c.idRComercializacion AND p.idCampo=ca.idCampo;', [id]);
    if(rows.length === 0)
        return {};
    else
        return rows;
}
//create
export async function createCamp(campData, points, idUsuario) {
    const { suelo, nombre } = campData;
    
    const [result] = await pool.query('INSERT INTO campo (nombre, suelo, idUsuario) VALUES(?, ?, ?);', [nombre, suelo, idUsuario]);
    for(const point of points){
        const [newPoint] = await pool.query('INSERT INTO punto (longitud, latitud) VALUES (?, ?);', [point.longitud, point.latitud]);
        const [newPoligon] = await pool.query('INSERT INTO poligono (idCampo, idPunto) VALUES (?, ?);', [result.insertId, newPoint.insertId]);
    }
    const [row] = await pool.query('SELECT * FROM campo WHERE idCampo=?;', [result.insertId])
    return row[0];
}
export async function createWorker(workerData, idUsuario) {
    const { nombreEmpleado, telefono, salario, rol } = workerData;
    const [result] = await pool.query('INSERT INTO empleado (nombreEmpleado, telefono, salario, rol, idUsuario) VALUES (?, ?, ?, ?, ?);', [nombreEmpleado, telefono, salario, rol, idUsuario]);
    return result;
}
export async function createAdquisicion(adquisicionData, idUsuario) {
    const { fecha, duracion, obs, idEmpleado, idCampo, cantidad, nombre, costo, descripcion, proveedor, tel, tipo } = adquisicionData;
    const [proveedorR] = await pool.query('INSERT INTO proveedor (telefono, responsable) VALUES (?, ?);', [tel, proveedor]);
    const proveedorId = proveedorR.insertId;
    const [materialR] = await pool.query('INSERT INTO material (nombre, costo, descripcion, tipo) VALUES (?, ?, ?, ?);', [nombre, costo, descripcion, tipo]);
    const materialId = materialR.insertId;
    const [mp] = await pool.query('INSERT INTO materialproveedor (idMaterial, idProveedor) VALUES (?, ?);', [materialId, proveedorId]);
    const [adquiR] = await pool.query('INSERT INTO radquisicion (cantidad) VALUES (?);', [cantidad]);
    const adquiId = adquiR.insertId;
    const [ma] = await pool.query('INSERT INTO materialadquisicion (idMaterial, idRAdquisicion) VALUES (?, ?);', [materialId, adquiId]);
    const [practicaR] = await pool.query('INSERT INTO practica (fechaInicio, duracion, observacion, idEmpleado, idRAdquisicion, idCampo, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?);', [fecha, duracion, obs, idEmpleado, adquiR.insertId, idCampo, idUsuario]);
    return practicaR;
}
export async function createPlanting(plantingData, idUsuario) {
    const { fecha, duracion, obs, idEmpleado, cantidad, lote, idCampo } = plantingData;
    const [siembraR] = await pool.query('INSERT INTO rsiembra (noPlantas, lote) VALUES (?, ?);', [cantidad, lote]);
    const [practicaR] = await pool.query('INSERT INTO practica (fechaInicio, duracion, observacion, idEmpleado, idRSiembra, idCampo, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?);', [fecha, duracion, obs, idEmpleado, siembraR.insertId, idCampo, idUsuario]);
    return practicaR;
}
export async function createFertilization(fertilizationData, idUsuario) {
    const { fecha, duracion, obs, idEmpleado, tipo, dosis, cantidadN, idCampo } = fertilizationData;
    const [fertR] = await pool.query('INSERT INTO rfertilizacion (tipo, dosis, cantidadNitrogeno) VALUES (?, ?, ?);', [tipo, dosis, cantidadN]);
    const [practicaR] = await pool.query('INSERT INTO practica (fechaInicio, duracion, observacion, idEmpleado, idRFertilizacion, idCampo, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?);', [fecha, duracion, obs, idEmpleado, fertR.insertId, idCampo, idUsuario]);
    return practicaR;
}
export async function createFumigation(fumigationData, idUsuario) {
    const { fecha, duracion, obs, idEmpleado, componente, fito, motivo, dosis, modo, plazo, idCampo } = fumigationData
    const [fumR] = await pool.query('INSERT INTO rplaguicida (componenteActivo, fitosanitario, motivo, dosis, modoAplicacion, plazoSeguridad) VALUES (?, ?, ?, ?, ?, ?);', [componente, fito, motivo, dosis, modo, plazo]);
    const [practicaR] = await pool.query('INSERT INTO practica (fechaInicio, duracion, observacion, idEmpleado, idRPlaguicida, idCampo, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?);', [fecha, duracion, obs, idEmpleado, fumR.insertId, idCampo, idUsuario]);
    return practicaR;
}
export async function createCultive(cultiveData, idUsuario) {
    const { fecha, duracion, obs, idEmpleado, cultivo, idCampo } = cultiveData;
    const [cultivoR] = await pool.query('INSERT INTO rcultivo (cultivo) VALUES (?);', [cultivo]);
    const [practicaR] = await pool.query('INSERT INTO practica (fechaInicio, duracion, observacion, idEmpleado, idRCultivo, idCampo, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?);', [fecha, duracion, obs, idEmpleado, cultivoR.insertId, idCampo, idUsuario]);
    return practicaR;
}
export async function createComercialization(comercializationData, idUsuario) {
    const { fecha, duracion, obs, idEmpleado, cultivo, cosecha, comercio, destino, idCampo } = comercializationData;
    const [comerR] = await pool.query('INSERT INTO rcomercializacion (cultivo, vCosecha, vComercio, destino) VALUES (?, ?, ?, ?);', [cultivo, cosecha, comercio, destino]);
    const [practicaR] = await pool.query('INSERT INTO practica (fechaInicio, duracion, observacion, idEmpleado, idRComercializacion, idCampo, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?);', [fecha, duracion, obs, idEmpleado, comerR.insertId, idCampo, idUsuario]);
    return practicaR;
}
//update
export async function updateCamp(campData, points, id) {
    const { suelo, nombre } = campData;
    
    var [result] = await pool.query('UPDATE campo SET nombre=?, suelo=? WHERE idCampo=?;', [nombre, suelo, id]);
    const [poligono] = await pool.query('DELETE FROM poligono WHERE idCampo = ?;', [id]);
    for(const point of points){
        const [punto] = await pool.query('DELETE FROM punto WHERE idPunto = ?;', [point.idPunto]);
    }
    
    for(const point of points){
        const [newPoint] = await pool.query('INSERT INTO punto (longitud, latitud) VALUES (?, ?);', [point.longitud, point.latitud]);
        const [newPoligon] = await pool.query('INSERT INTO poligono (idCampo, idPunto) VALUES (?, ?);', [id, newPoint.insertId]);
    }
    const [row] = await pool.query('SELECT * FROM campo WHERE idCampo=?;', [id])
    return row[0];
}
export async function updateWorker(workerData, id) {
    const { nombreEmpleado, telefono, salario, rol } = workerData;
    const [result] = await pool.query('UPDATE empleado SET nombreEmpleado=?, telefono=?, salario=?, rol=? WHERE idEmpleado=?', [nombreEmpleado, telefono, salario, rol, id]);
    return result;
}
export async function updateAdquisicion(adquisicionData, id) {
    const { fecha, duracion, obs, idEmpleado, idCampo, cantidad, nombre, costo, descripcion, proveedor, tel, tipo } = adquisicionData;
    const [proveedorR] = await pool.query('UPDATE proveedor SET telefono=?, responsable=? WHERE idProveedor IN (SELECT proveedor.idProveedor FROM practica AS p, empleado AS e, material AS m, materialadquisicion AS ma, radquisicion AS a, materialproveedor AS mp WHERE p.idPractica=? AND p.idEmpleado=e.idEmpleado AND p.idRAdquisicion=a.idRAdquisicion AND ma.idMaterial=m.idMaterial AND ma.idRAdquisicion=a.idRAdquisicion AND mp.idMaterial=m.idMaterial AND mp.idProveedor=proveedor.idProveedor);', [tel, proveedor, id]);
    const [materialR] = await pool.query('UPDATE material SET nombre=?, costo=?, descripcion=?, tipo=? WHERE idMaterial IN (SELECT material.idMaterial FROM practica AS p, empleado AS e, materialadquisicion AS ma, radquisicion AS a WHERE p.idPractica=? AND p.idEmpleado=e.idEmpleado AND p.idRAdquisicion=a.idRAdquisicion AND ma.idMaterial=material.idMaterial AND ma.idRAdquisicion=a.idRAdquisicion);', [nombre, costo, descripcion, tipo, id]);
    const [adquiR] = await pool.query('UPDATE radquisicion SET cantidad=? WHERE idRAdquisicion IN (SELECT radquisicion.idRAdquisicion FROM practica AS p WHERE p.idPractica=? AND p.idRAdquisicion=radquisicion.idRAdquisicion);', [cantidad, id]);
    const [practicaR] = await pool.query('UPDATE practica SET fechaInicio=?, duracion=?, observacion=?, idEmpleado=?, idCampo=? WHERE idPractica = ?;', [fecha, duracion, obs, idEmpleado, idCampo, id]);
    return practicaR;
}
export async function updatePlanting(plantingData, id) {
    const { fecha, duracion, obs, idEmpleado, cantidad, lote, idCampo } = plantingData;
    const [siembraR] = await pool.query('UPDATE rsiembra SET noPlantas=?, lote=? WHERE rsiembra.idRSiembra IN (SELECT rsiembra.idRSiembra FROM practica WHERE practica.idPractica=? AND idRSiembra=idRSiembra);', [cantidad, lote, id]);
    const [practicaR] = await pool.query('UPDATE practica SET fechaInicio=?, duracion=?, observacion=?, idEmpleado=?, idCampo=? WHERE idPractica = ?;', [fecha, duracion, obs, idEmpleado, idCampo, id]);
    return practicaR;
}
export async function updateFertilization(fertilizationData, id) {
    const { fecha, duracion, obs, idEmpleado, tipo, dosis, cantidadN, idCampo } = fertilizationData;
    const [fertR] = await pool.query('UPDATE rfertilizacion SET tipo=?, dosis=?, cantidadNitrogeno=? WHERE rfertilizacion.idRFertilizacion IN (SELECT rfertilizacion.idRFertilizacion FROM practica WHERE practica.idPractica=? AND practica.idRFertilizacion=rfertilizacion.idRFertilizacion);', [tipo, dosis, cantidadN, id]);
    const [practicaR] = await pool.query('UPDATE practica SET fechaInicio=?, duracion=?, observacion=?, idEmpleado=?, idCampo=? WHERE idPractica = ?;', [fecha, duracion, obs, idEmpleado, idCampo, id]);
    return practicaR;
}
export async function updateFumigation(fumigationData, id) {
    const { fecha, duracion, obs, idEmpleado, componente, fito, motivo, dosis, modo, plazo, idCampo } = fumigationData
    const [fumR] = await pool.query('UPDATE rplaguicida SET componenteActivo=?, fitosanitario=?, motivo=?, dosis=?, modoAplicacion=?, plazoSeguridad=? WHERE rplaguicida.idRPlaguicida IN (SELECT rplaguicida.idRPlaguicida FROM practica WHERE practica.idPractica=? AND practica.idRPlaguicida=rplaguicida.idRPlaguicida);', [componente, fito, motivo, dosis, modo, plazo, id]);
    const [practicaR] = await pool.query('UPDATE practica SET fechaInicio=?, duracion=?, observacion=?, idEmpleado=?, idCampo=? WHERE idPractica = ?;', [fecha, duracion, obs, idEmpleado, idCampo, id]);
    return practicaR;
}
export async function updateCultive(cultiveData, id) {
    const { fecha, duracion, obs, idEmpleado, cultivo, idCampo } = cultiveData;
    const [cultivoR] = await pool.query('UPDATE rcultivo SET cultivo=? WHERE rcultivo.idRCultivo IN (SELECT rcultivo.idRCultivo FROM practica WHERE practica.idPractica=? AND practica.idRCultivo=rcultivo.idRCultivo);', [cultivo, id]);
    const [practicaR] = await pool.query('UPDATE practica SET fechaInicio=?, duracion=?, observacion=?, idEmpleado=?, idCampo=? WHERE idPractica = ?;', [fecha, duracion, obs, idEmpleado, idCampo, id]);
    return practicaR;
}
export async function updateComercialization(comercializationData, id) {
    const { fecha, duracion, obs, idEmpleado, cultivo, cosecha, comercio, destino, idCampo } = comercializationData;
    const [comerR] = await pool.query('UPDATE rcomercializacion SET cultivo=?, vCosecha=?, vComercio=?, destino=? WHERE rcomercializacion.idRComercializacion IN (SELECT rcomercializacion.idRComercializacion FROM practica WHERE practica.idPractica=? AND practica.idRComercializacion=rcomercializacion.idRComercializacion);', [cultivo, cosecha, comercio, destino, id]);
    const [practicaR] = await pool.query('UPDATE practica SET fechaInicio=?, duracion=?, observacion=?, idEmpleado=?, idCampo=? WHERE idPractica = ?;', [fecha, duracion, obs, idEmpleado, idCampo, id]);
    return practicaR;
}
//delete
export async function deleteCampo(id, points){
    const [poligono] = await pool.query('DELETE FROM poligono WHERE idCampo = ?;', [id]);
    for(const point of points){
        const [punto] = await pool.query('DELETE FROM punto WHERE idPunto = ?;', [point.idPunto]);
    }
    const resul = await pool.query('DELETE FROM campo WHERE campo.idCampo=?;', [id]);
    return resul.affectedRows > 0;
}
export async function isUsedC(id){
    const [rows] = await pool.query('SELECT practica.idCampo FROM practica WHERE practica.idCampo=?;', [id]);
    if(rows.length === 0)
        return false;
    else
        return true;
}
export async function deleteEmpleado(id){
    const resul = await pool.query('DELETE FROM empleado WHERE empleado.idEmpleado=?;', [id]);
    return resul.affectedRows > 0;
}
export async function isUsedW(id){
    const [rows] = await pool.query('SELECT practica.idPractica FROM practica WHERE practica.idEmpleado=?;', [id]);
    if(rows.length === 0)
        return [];
    else
        return rows;
}
export async function deleteAdquisition(id, idA, idM, idP){
    const practica = await pool.query('DELETE FROM practica WHERE practica.idPractica=?;', [id]);
    const [resul] = await pool.query('DELETE FROM radquisicion WHERE radquisicion.idRAdquisicion=?;', [idA]);
    const material = await pool.query('DELETE FROM material WHERE material.idMaterial=?;', [idM]);
    const proveedor = await pool.query('DELETE FROM material WHERE material.idMaterial=?;', [idP]);
    const mp = await pool.query('DELETE FROM materialproveedor WHERE materialproveedor.idMaterial=?;', [idM]);
    const ma = await pool.query('DELETE FROM materialadquisicion WHERE materialadquisicion.idMaterial=?;', [idM]);
    return resul.affectedRows > 0;
}
export async function deletesiembra(id, idS){
    const practica = await pool.query('DELETE FROM practica WHERE practica.idPractica=?;', [id]);
    const resul = await pool.query('DELETE FROM rsiembra WHERE rsiembra.idRSiembra=?;', [idS]);
    return resul.affectedRows > 0;
}
export async function deleteFertilization(id, idF){
    const practica = await pool.query('DELETE FROM practica WHERE practica.idPractica=?;', [id]);
    const resul = await pool.query('DELETE FROM rfertilizacion WHERE rfertilizacion.idRFertilizacion=?;', [idF]);
    return resul.affectedRows > 0;
}
export async function deleteFumigation(id, idF){
    const practica = await pool.query('DELETE FROM practica WHERE practica.idPractica=?;', [id]);
    const resul = await pool.query('DELETE FROM rplaguicida WHERE rplaguicida.idRPlaguicida=?;', [idF]);
    return resul.affectedRows > 0;
}
export async function deleteCultive(id, idC){
    const practica = await pool.query('DELETE FROM practica WHERE practica.idPractica=?;', [id]);
    const resul = await pool.query('DELETE FROM rcultivo WHERE rcultivo.idRCultivo=?;', [idC]);
    return resul.affectedRows > 0;
}
export async function deleteComer(id, idC){
    const practica = await pool.query('DELETE FROM practica WHERE practica.idPractica=?;', [id]);
    const resul = await pool.query('DELETE FROM rcomercializacion WHERE rcomercializacion.idRComercializacion=?;', [idC]);
    return resul.affectedRows > 0;
}
