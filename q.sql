CREATE TABLE punto(
  idPunto INT NOT NULL AUTO_INCREMENT,
  longitud FLOAT NOT NULL,
  latitud FLOAT NOT NULL,
  PRIMARY KEY (idPunto)
);

CREATE TABLE proveedor(
  idProveedor INT NOT NULL AUTO_INCREMENT,
  telefono VARCHAR(11) NOT NULL,
  responsable VARCHAR(80) NOT NULL,
  PRIMARY KEY (idProveedor)
);

CREATE TABLE rAdquisicion(
  idRAdquisicion INT NOT NULL AUTO_INCREMENT,
  cantidad FLOAT NOT NULL,
  PRIMARY KEY (idRAdquisicion)
);

CREATE TABLE rSiembra(
  idRSiembra INT NOT NULL AUTO_INCREMENT,
  noPlantas INT NOT NULL,
  lote VARCHAR(10) NOT NULL,
  PRIMARY KEY (idRSiembra)
);

CREATE TABLE rFertilizacion(
  idRFertilizacion INT NOT NULL AUTO_INCREMENT,
  tipo VARCHAR(80) NOT NULL,
  dosis FLOAT NOT NULL,
  cantidadNitrogeno FLOAT NOT NULL,
  PRIMARY KEY (idRFertilizacion)
);

CREATE TABLE rPlaguicida(
  idRPlaguicida INT NOT NULL AUTO_INCREMENT,
  componenteActivo VARCHAR(80) NOT NULL,
  fitosanitario VARCHAR(80) NOT NULL,
  motivo VARCHAR(80) NOT NULL,
  dosis FLOAT NOT NULL,
  modoAplicacion VARCHAR(80) NOT NULL,
  plazoSeguridad FLOAT NOT NULL,
  PRIMARY KEY (idRPlaguicida)
);

CREATE TABLE rCultivo(
  idRCultivo INT NOT NULL AUTO_INCREMENT,
  cultivo VARCHAR(80) NOT NULL,
  PRIMARY KEY (idRCultivo)
);

CREATE TABLE rComercializacion(
  idRComercializacion INT NOT NULL AUTO_INCREMENT,
  cultivo VARCHAR(80) NOT NULL,
  vCosecha FLOAT NOT NULL,
  vComercio FLOAT NOT NULL,
  destino VARCHAR(80) NOT NULL,
  retorno FLOAT,
  PRIMARY KEY (idRComercializacion)
);

CREATE TABLE material(
  idMaterial INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(80) NOT NULL,
  costo FLOAT NOT NULL,
  tipo VARCHAR(80) NOT NULL,
  descripcion VARCHAR(180),
  PRIMARY KEY (idMaterial)
);

CREATE TABLE campo(
  idCampo INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(80) NOT NULL,
  area FLOAT,
  suelo VARCHAR(80) NOT NULL,
  idUsuario INT,
  PRIMARY KEY (idCampo),
  FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE usuario(
  idUsuario INT NOT NULL AUTO_INCREMENT,
  nombreUsuario VARCHAR(80) NOT NULL,
  contrasenna VARCHAR(40) NOT NULL,
  nombre VARCHAR(80) NOT NULL,
  aPaterno VARCHAR(80) NOT NULL,
  aMaterno VARCHAR(80) NOT NULL,
  eMail VARCHAR(100) NOT NULL,
  telefono VARCHAR(11) NOT NULL,
  fechaNacimiento DATE NOT NULL,
  genero VARCHAR(8) NOT NULL,
  ingreso DATE NOT NULL,
  PRIMARY KEY (idUsuario)
);

CREATE TABLE empleado(
  idEmpleado INT NOT NULL AUTO_INCREMENT,
  nombreEmpleado VARCHAR(80) NOT NULL,
  telefono VARCHAR(11) NOT NULL,
  salario FLOAT NOT NULL,
  rol VARCHAR(80) NOT NULL,
  idUsuario INT NOT NULL,
  PRIMARY KEY (idEmpleado),
  FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE materialAdquisicion(
  idMaterial INT NOT NULL,
  idRAdquisicion INT NOT NULL,
  FOREIGN KEY (idMaterial) REFERENCES material(idMaterial),
  FOREIGN KEY (idRAdquisicion) REFERENCES rAdquisicion(idRAdquisicion)
);

CREATE TABLE materialProveedor(
  idMaterial INT NOT NULL,
  idProveedor INT NOT NULL,
  FOREIGN KEY (idMaterial) REFERENCES material(idMaterial),
  FOREIGN KEY (idProveedor) REFERENCES proveedor(idProveedor)
);

CREATE TABLE poligono(
  idCampo INT NOT NULL,
  idPunto INT NOT NULL,
  FOREIGN KEY (idCampo) REFERENCES campo(idCampo),
  FOREIGN KEY (idPunto) REFERENCES punto(idPunto)
);

CREATE TABLE practica(
  idPractica INT NOT NULL AUTO_INCREMENT,
  fechaInicio DATE,
  duracion FLOAT NOT NULL,
  tipo VARCHAR(80) NOT NULL,
  observacion VARCHAR(180),
  idCampo INT NOT NULL,
  idRPlaguicida INT,
  idRCultivo INT,
  idRSiembra INT,
  idRComercializacion INT,
  idRFertilizacion INT,
  idRAdquisicion INT,
  idUsuario INT NOT NULL,
  idEmpleado INT NOT NULL,
  PRIMARY KEY (idPractica),
  FOREIGN KEY (idCampo) REFERENCES campo(idCampo),
  FOREIGN KEY (idRPlaguicida) REFERENCES rPlaguicida(idRPlaguicida),
  FOREIGN KEY (idRCultivo) REFERENCES rCultivo(idRCultivo),
  FOREIGN KEY (idRSiembra) REFERENCES rSiembra(idRSiembra),
  FOREIGN KEY (idRComercializacion) REFERENCES rComercializacion(idRComercializacion),
  FOREIGN KEY (idRFertilizacion) REFERENCES rFertilizacion(idRFertilizacion),
  FOREIGN KEY (idRAdquisicion) REFERENCES rAdquisicion(idRAdquisicion),
  FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
  FOREIGN KEY (idEmpleado) REFERENCES empleado(idEmpleado)
);


Poblacioón de base de datos

INSERT INTO usuario (nombreUsuario, contrasenna, nombre, aPaterno, aMaterno, eMail, telefono, fechaNacimiento, genero, ingreso) 
VALUES 
('usuario1', 'contrasenna1', 'Juan', 'Perez', 'Gonzalez', 'juan@example.com', '1234567890', '1990-01-01', 'M', '2024-04-07'),
('usuario2', 'contrasenna2', 'Maria', 'Garcia', 'Lopez', 'maria@example.com', '0987654321', '1992-05-15', 'F', '2024-04-07'),
('usuario3', 'contrasenna3', 'Pedro', 'Rodriguez', 'Martinez', 'pedro@example.com', '9876543210', '1985-08-20', 'M', '2024-04-07'),
('usuario4', 'contrasenna4', 'Laura', 'Lopez', 'Hernandez', 'laura@example.com', '0123456789', '1988-12-10', 'F', '2024-04-07'),
('usuario5', 'contrasenna5', 'Ana', 'Ruiz', 'Sanchez', 'ana@example.com', '5432109876', '1995-03-25', 'F', '2024-04-07');

INSERT INTO empleado (nombreEmpleado, telefono, salario, rol, idUsuario) 
VALUES 
('empleado1', '1234567890', 2000.00, 'Agriculto', 1),
('empleado2', '0987654321', 2500.00, 'Agriculto', 2),
('empleado3', '9876543210', 1800.00, 'Agriculto', 3),
('empleado4', '0123456789', 2200.00, 'Agriculto', 4),
('empleado5', '5432109876', 2100.00, 'Agriculto', 5),
('empleado6', '5432409276', 2100.00, 'Agriculto', 5);

INSERT INTO punto (longitud, latitud) 
VALUES 
(-74.0, 40.0),
(-75.0, 41.0),
(-73.5, 39.5),
(-72.5, 40.5),
(-74.5, 39.0),
(-76.0, 42.0),
(-77.0, 43.0),
(-78.0, 44.0),
(-79.0, 45.0),
(-80.0, 46.0),
(-81.0, 47.0),
(-82.0, 48.0);

INSERT INTO campo (nombre, area, suelo) 
VALUES 
('Campo 1', NULL, 'Arenoso'),
('Campo 2', NULL, 'Tepetate'),
('Campo 3', NULL, 'Tepetate'),
('Campo 4', NULL, 'Arcilla');

INSERT INTO poligono (idCampo, idPunto) 
VALUES 
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(3, 7),
(3, 8),
(3, 9),
(4, 10),
(4, 11),
(4, 12);

INSERT INTO material (nombre, costo, tipo, descripcion) 
VALUES 
('Fertilizante', 10.50, 'Químico', 'Fertilizante para cultivos'),
('Pesticida', 15.75, 'Químico', 'Pesticida para control de plagas'),
('Semilla de Soja', 20.00, 'Semilla', 'Semilla de soja para siembra'),
('Semilla de Cebada', 18.25, 'Semilla', 'Semilla de cebada para siembra'),
('Semilla de Sorgo', 22.80, 'Semilla', 'Semilla de sorgo para siembra');

INSERT INTO proveedor (telefono, responsable) 
VALUES 
('1234567890', 'Juan Pérez'),
('2345678901', 'María González'),
('3456789012', 'Pedro Rodríguez'),
('4567890123', 'Laura López'),
('5678901234', 'Ana Ruiz');

INSERT INTO rAdquisicion (cantidad) 
VALUES 
(100.0),
(150.0),
(200.0),
(175.0),
(180.0);

INSERT INTO materialAdquisicion (idMaterial, idRAdquisicion)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO materialProveedor (idMaterial, idProveedor)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO rSiembra (noPlantas, lote) 
VALUES 
(500, 'Lote A'),
(700, 'Lote B'),
(600, 'Lote C'),
(800, 'Lote D'),
(550, 'Lote E');

INSERT INTO rFertilizacion (tipo, dosis, cantidadNitrogeno) 
VALUES 
('Química', 20.5, 15.2),
('Orgánica', 25.0, 18.7),
('Química', 22.8, 16.9),
('Orgánica', 27.3, 20.1),
('Química', 21.6, 15.8);

INSERT INTO rPlaguicida (componenteActivo, fitosanitario, motivo, dosis, modoAplicacion, plazoSeguridad) 
VALUES 
('Abamectina', 'Insecticida', 'Control de plagas', 18.5, 'Foliar', 14.0),
('Clorpirifos', 'Insecticida', 'Control de plagas', 21.0, 'Foliar', 17.5),
('Mancozeb', 'Fungicida', 'Prevención de enfermedades', 20.2, 'Foliar', 16.0),
('Imidacloprid', 'Insecticida', 'Control de plagas', 19.8, 'Foliar', 15.5),
('Azoxistrobina', 'Fungicida', 'Prevención de enfermedades', 22.3, 'Foliar', 18.0);

INSERT INTO rCultivo (cultivo)
VALUES 
('Maíz'),
('Trigo'),
('Arroz'),
('Cebada'),
('Sorgo');

INSERT INTO rComercializacion (cultivo, vCosecha, vComercio, destino)
VALUES 
('Maíz', 2000.0, 1800.0, 'Mercado local'),
('Trigo', 2500.0, 2300.0, 'Exportación'),
('Arroz', 1800.0, 1600.0, 'Consumo nacional'),
('Cebada', 2200.0, 2000.0, 'Mercado local'),
('Sorgo', 2100.0, 1900.0, 'Consumo animal');

INSERT INTO practica (fechaInicio, duracion, tipo, observacion, idCampo, idRPlaguicida, idRCultivo, idRSiembra, idRComercializacion, idRFertilizacion, idRAdquisicion, idUsuario, idEmpleado) 
VALUES 
('2024-01-01', 2.5, 'Laboreo', 'Práctica existosa', 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, 7),
('2024-02-15', 3.0, 'Fertilización', 'Práctica exitosa', 2, NULL, NULL, NULL, NULL, 1, NULL, 2, 8),
('2024-03-20', 4.0, 'Fumigación', 'Plaga', 3, 1, NULL, NULL, NULL, NULL, NULL, 3, 9),
('2024-04-10', 2.5, 'Cosecha', 'Cosecha insuficiente', 4, NULL, 1, NULL, NULL, NULL, NULL, 4, 10),
('2024-05-05', 3.5, 'Riego', '', 4, NULL, NULL, 1, NULL, NULL, NULL, 5, 11),
('2024-06-01', 4.0, 'Control de malezas', 'Plagua', 1, 2, NULL, NULL, NULL, NULL, NULL, 1, 7),
('2024-07-15', 3.0, 'Fertilización foliar', 'Práctica exitosa', 2, NULL, NULL, NULL, NULL, 2, NULL, 2, 8),
('2024-08-20', 2.5, 'Cosecha', 'Cosecha satisfactoria', 3, NULL, 2, NULL, NULL, NULL, NULL, 3, 9),
('2024-09-10', 4.0, 'Riego', '', 4, NULL, NULL, 2, NULL, NULL, NULL, 4, 10),
('2024-10-05', 3.5, 'Control de plagas', 'Plaga', 4, 3, NULL, NULL, NULL, NULL, NULL, 5, 12);


// FUNCIONES PARA PUNTO
export async function createPunto(puntoData) {
    const { altitud, longitud, latitud } = puntoData;
    const [result] = await pool.query('INSERT INTO punto (altitud, longitud, latitud) VALUES (?, ?, ?)', [altitud, longitud, latitud]);
    return result.insertId;
}
export async function getPuntoById(puntoId) {
    const [rows] = await pool.query('SELECT * FROM punto WHERE idPunto = ?', [puntoId]);
    return rows;
    //console.log(rows);
}
export async function deletePunto(puntoId) {
    const [result] = await pool.query('DELETE FROM punto WHERE idPunto = ?', [puntoId]);
    return result.affectedRows > 0;
}
export async function updatePunto(puntoId, puntoData) {
    const { altitud, longitud, latitud } = puntoData;
    const [result] = await pool.query('UPDATE punto SET altitud = ?, longitud = ?, latitud = ? WHERE idPunto = ?', [altitud, longitud, latitud, puntoId]);
    return result.affectedRows > 0;
}
export async function listarPuntos() {
    const [rows] = await pool.query('SELECT * FROM punto');
    return rows;
}

// FUNCIONES PARA USUARIO
export async function createUsuario(usuarioData) {
    const { nombreUsuario, contrasenna, nombre, aPaterno, aMaterno, eMail, telefono, fechaNacimiento, genero, salario, ingreso, idRol } = usuarioData;
    const [result] = await pool.query('INSERT INTO usuario (nombreUsuario, contrasenna, nombre, aPaterno, aMaterno, eMail, telefono, fechaNacimiento, genero, salario, ingreso, idRol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombreUsuario, contrasenna, nombre, aPaterno, aMaterno, eMail, telefono, fechaNacimiento, genero, salario, ingreso, idRol]);
    return result.insertId;
}
export async function registrarUsuario(usuarioData) {
    const { nombreUsuario, contrasenna, nombre, aPaterno, aMaterno, eMail} = usuarioData;
    const [result] = await pool.query('INSERT INTO usuario (nombreUsuario, contrasenna, nombre, aPaterno, aMaterno, eMail) VALUES (?, ?, ?, ?, ?, ?)', [nombreUsuario, contrasenna, nombre, aPaterno, aMaterno, eMail]);
    return result.insertId;
}
export async function getUsuarioById(usuarioId) {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE idUsuario = ?', [usuarioId]);
    return rows[0];
}
export async function deleteUsuario(usuarioId) {
    const [result] = await pool.query('DELETE FROM usuario WHERE idUsuario = ?', [usuarioId]);
    return result.affectedRows > 0;
}
export async function updateUsuario(usuarioId, usuarioData) {
    const { nombreUsuario, contrasenna, nombre, aPaterno, aMaterno, eMail, telefono, fechaNacimiento, genero, salario, ingreso, idRol } = usuarioData;
    const [result] = await pool.query('UPDATE usuario SET nombreUsuario = ?, contrasenna = ?, nombre = ?, aPaterno = ?, aMaterno = ?, eMail = ?, telefono = ?, fechaNacimiento = ?, genero = ?, salario = ?, ingreso = ?, idRol = ? WHERE idUsuario = ?', [nombreUsuario, contrasenna, nombre, aPaterno, aMaterno, eMail, telefono, fechaNacimiento, genero, salario, ingreso, idRol, usuarioId]);
    return result.affectedRows > 0;
}
export async function listarUsuarios() {
    const [rows] = await pool.query('SELECT * FROM usuario');
    return rows;
}

// FUNCIONES PARA POLÍGONO
export async function createPoligono(poligonoData) {
    const { idCampo, idPunto } = poligonoData;
    const [result] = await pool.query('INSERT INTO poligono (idCampo, idPunto) VALUES (?, ?)', [idCampo, idPunto]);
    return result.insertId;
}  
export async function getPoligonoById(poligonoId) {
    const [rows] = await pool.query('SELECT * FROM poligono WHERE idPoligono = ?', [poligonoId]);
    return rows[0];
}  
export async function deletePoligono(poligonoId) {
    const [result] = await pool.query('DELETE FROM poligono WHERE idPoligono = ?', [poligonoId]);
    return result.affectedRows > 0;
}  
export async function updatePoligono(poligonoId, poligonoData) {
    const { idCampo, idPunto } = poligonoData;
    const [result] = await pool.query('UPDATE poligono SET idCampo = ?, idPunto = ? WHERE idPoligono = ?', [idCampo, idPunto, poligonoId]);
    return result.affectedRows > 0;
}  
export async function listarPoligonos() {
    const [rows] = await pool.query('SELECT * FROM poligono');
    return rows;
}

// FUNCIONES PARA CAMPO
export async function createCampo(campoData) {
    const { nombre, area, idSuelo } = campoData;
    const [result] = await pool.query('INSERT INTO campo (nombre, area, idSuelo) VALUES (?, ?, ?)', [nombre, area, idSuelo]);
    return result.insertId;
}  
export async function getCampoById(campoId) {
    const [rows] = await pool.query('SELECT * FROM campo WHERE idCampo = ?', [campoId]);
    return rows[0];
}  
export async function deleteCampo(campoId) {
    const [result] = await pool.query('DELETE FROM campo WHERE idCampo = ?', [campoId]);
    return result.affectedRows > 0;
}  
export async function updateCampo(campoId, campoData) {
    const { nombre, area, idSuelo } = campoData;
    const [result] = await pool.query('UPDATE campo SET nombre = ?, area = ?, idSuelo = ? WHERE idCampo = ?', [nombre, area, idSuelo, campoId]);
    return result.affectedRows > 0;
}  
export async function listarCampos() {
    const [rows] = await pool.query('SELECT * FROM campo');
    return rows;
}

// FUNCIONES PARA PROVEEDOR
export async function createProveedor(proveedorData) {
    const { telefono, responsable } = proveedorData;
    const [result] = await pool.query('INSERT INTO proveedor (telefono, responsable) VALUES (?, ?)', [telefono, responsable]);
    return result.insertId;
} 
export async function getProveedorById(proveedorId) {
    const [rows] = await pool.query('SELECT * FROM proveedor WHERE idProveedor = ?', [proveedorId]);
    return rows[0];
} 
export async function deleteProveedor(proveedorId) {
    const [result] = await pool.query('DELETE FROM proveedor WHERE idProveedor = ?', [proveedorId]);
    return result.affectedRows > 0;
} 
export async function updateProveedor(proveedorId, proveedorData) {
    const { telefono, responsable } = proveedorData;
    const [result] = await pool.query('UPDATE proveedor SET telefono = ?, responsable = ? WHERE idProveedor = ?', [telefono, responsable, proveedorId]);
    return result.affectedRows > 0;
} 
export async function listarProveedores() {
    const [rows] = await pool.query('SELECT * FROM proveedor');
    return rows;
}

// FUNCIONES PARA MATERIALPROVEEDOR
export async function createMaterialProveedor(materialProveedorData) {
    const { idMaterial, idProveedor } = materialProveedorData;
    const [result] = await pool.query('INSERT INTO materialProveedor (idMaterial, idProveedor) VALUES (?, ?)', [idMaterial, idProveedor]);
    return result.insertId;
}  
export async function getMaterialProveedorById(materialProveedorId) {
    const [rows] = await pool.query('SELECT * FROM materialProveedor WHERE idMaterialProveedor = ?', [materialProveedorId]);
    return rows[0];
}  
export async function deleteMaterialProveedor(materialProveedorId) {
    const [result] = await pool.query('DELETE FROM materialProveedor WHERE idMaterialProveedor = ?', [materialProveedorId]);
    return result.affectedRows > 0;
}  
export async function updateMaterialProveedor(materialProveedorId, materialProveedorData) {
    const { idMaterial, idProveedor } = materialProveedorData;
    const [result] = await pool.query('UPDATE materialProveedor SET idMaterial = ?, idProveedor = ? WHERE idMaterialProveedor = ?', [idMaterial, idProveedor, materialProveedorId]);
    return result.affectedRows > 0;
}  
export async function listarMaterialesProveedores() {
    const [rows] = await pool.query('SELECT * FROM materialProveedor');
    return rows;
}

// FUNCIONES PARA MATERIAL
export async function createMaterial(materialData) {
    const { nombre, costo, tipo, descripcion, idSemilla } = materialData;
    const [result] = await pool.query('INSERT INTO material (nombre, costo, tipo, descripcion, idSemilla) VALUES (?, ?, ?, ?, ?)', [nombre, costo, tipo, descripcion, idSemilla]);
    return result.insertId;
}  
export async function getMaterialById(materialId) {
    const [rows] = await pool.query('SELECT * FROM material WHERE idMaterial = ?', [materialId]);
    return rows[0];
}  
export async function deleteMaterial(materialId) {
    const [result] = await pool.query('DELETE FROM material WHERE idMaterial = ?', [materialId]);
    return result.affectedRows > 0;
}  
export async function updateMaterial(materialId, materialData) {
    const { nombre, costo, tipo, descripcion, idSemilla } = materialData;
    const [result] = await pool.query('UPDATE material SET nombre = ?, costo = ?, tipo = ?, descripcion = ?, idSemilla = ? WHERE idMaterial = ?', [nombre, costo, tipo, descripcion, idSemilla, materialId]);
    return result.affectedRows > 0;
}  
export async function listarMateriales() {
    const [rows] = await pool.query('SELECT * FROM material');
    return rows;
}

// FUNCIONES PARA MATERIALADQUISICIÓN
export async function createMaterialAdquisicion(materialAdquisicionData) {
    const { idMaterial, idRAdquisicion } = materialAdquisicionData;
    const [result] = await pool.query('INSERT INTO materialAdquisicion (idMaterial, idRAdquisicion) VALUES (?, ?)', [idMaterial, idRAdquisicion]);
    return result.insertId;
}  
export async function getMaterialAdquisicionById(materialAdquisicionId) {
    const [rows] = await pool.query('SELECT * FROM materialAdquisicion WHERE idMaterialAdquisicion = ?', [materialAdquisicionId]);
    return rows[0];
}  
export async function deleteMaterialAdquisicion(materialAdquisicionId) {
    const [result] = await pool.query('DELETE FROM materialAdquisicion WHERE idMaterialAdquisicion = ?', [materialAdquisicionId]);
    return result.affectedRows > 0;
}  
export async function updateMaterialAdquisicion(materialAdquisicionId, materialAdquisicionData) {
    const { idMaterial, idRAdquisicion } = materialAdquisicionData;
    const [result] = await pool.query('UPDATE materialAdquisicion SET idMaterial = ?, idRAdquisicion = ? WHERE idMaterialAdquisicion = ?', [idMaterial, idRAdquisicion, materialAdquisicionId]);
    return result.affectedRows > 0;
}  
export async function listarMaterialesAdquisiciones() {
    const [rows] = await pool.query('SELECT * FROM materialAdquisicion');
    return rows;
}

// FUNCIONES PARA ADQUISICIÓN
export async function createAdquisicion(adquisicionData) {
    const { cantidad, observacion } = adquisicionData;
    const [result] = await pool.query('INSERT INTO rAdquisicion (cantidad, observacion) VALUES (?, ?)', [cantidad, observacion]);
    return result.insertId;
}
export async function getAdquisicionById(adquisicionId) {
    const [rows] = await pool.query('SELECT * FROM rAdquisicion WHERE idRAdquisicion = ?', [adquisicionId]);
    return rows[0];
}
export async function deleteAdquisicion(adquisicionId) {
    const [result] = await pool.query('DELETE FROM rAdquisicion WHERE idRAdquisicion = ?', [adquisicionId]);
    return result.affectedRows > 0;
}
export async function updateAdquisicion(adquisicionId, adquisicionData) {
    const { cantidad, observacion } = adquisicionData;
    const [result] = await pool.query('UPDATE rAdquisicion SET cantidad = ?, observacion = ? WHERE idRAdquisicion = ?', [cantidad, observacion, adquisicionId]);
    return result.affectedRows > 0;
}
export async function listarAdquisiciones() {
    const [rows] = await pool.query('SELECT * FROM rAdquisicion');
    return rows;
}

// FUNCIONES PARA SIEMBRA
export async function createSiembra(siembraData) {
    const { fecha, noPlantas, lote, observacion } = siembraData;
    const [result] = await pool.query('INSERT INTO rSiembra (fecha, noPlantas, lote, observacion) VALUES (?, ?, ?, ?)', [fecha, noPlantas, lote, observacion]);
    return result.insertId;
}
export async function getSiembraById(siembraId) {
    const [rows] = await pool.query('SELECT * FROM rSiembra WHERE idRSiembra = ?', [siembraId]);
    return rows[0];
}
export async function deleteSiembra(siembraId) {
    const [result] = await pool.query('DELETE FROM rSiembra WHERE idRSiembra = ?', [siembraId]);
    return result.affectedRows > 0;
}
export async function updateSiembra(siembraId, siembraData) {
    const { fecha, noPlantas, lote, observacion } = siembraData;
    const [result] = await pool.query('UPDATE rSiembra SET fecha = ?, noPlantas = ?, lote = ?, observacion = ? WHERE idRSiembra = ?', [fecha, noPlantas, lote, observacion, siembraId]);
    return result.affectedRows > 0;
}
export async function listarSiembras() {
    const [rows] = await pool.query('SELECT * FROM rSiembra');
    return rows;
}

// FUNCIONES PARA FERTILIZACION
export async function createFertilizacion(fertilizacionData) {
    const { fecha, tipo, dosis, cantidadNitrogeno } = fertilizacionData;
    const [result] = await pool.query('INSERT INTO rFertilizacion (fecha, tipo, dosis, cantidadNitrogeno) VALUES (?, ?, ?, ?)', [fecha, tipo, dosis, cantidadNitrogeno]);
    return result.insertId;
}
export async function getFertilizacionById(fertilizacionId) {
    const [rows] = await pool.query('SELECT * FROM rFertilizacion WHERE idRFertilizacion = ?', [fertilizacionId]);
    return rows[0];
}
export async function deleteFertilizacion(fertilizacionId) {
    const [result] = await pool.query('DELETE FROM rFertilizacion WHERE idRFertilizacion = ?', [fertilizacionId]);
    return result.affectedRows > 0;
}
export async function updateFertilizacion(fertilizacionId, fertilizacionData) {
    const { fecha, tipo, dosis, cantidadNitrogeno } = fertilizacionData;
    const [result] = await pool.query('UPDATE rFertilizacion SET fecha = ?, tipo = ?, dosis = ?, cantidadNitrogeno = ? WHERE idRFertilizacion = ?', [fecha, tipo, dosis, cantidadNitrogeno, fertilizacionId]);
    return result.affectedRows > 0;
}
export async function listarFertilizaciones() {
    const [rows] = await pool.query('SELECT * FROM rFertilizacion');
    return rows;
}

// FUNCIONES PARA PLAGUICIDA
export async function createPlaguicida(plaguicidaData) {
    const { fecha, componenteActivo, fitosanitario, motivo, dosis, modoAplicacion, plazoSeguridad } = plaguicidaData;
    const [result] = await pool.query('INSERT INTO rPlaguicida (fecha, componenteActivo, fitosanitario, motivo, dosis, modoAplicacion, plazoSeguridad) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha, componenteActivo, fitosanitario, motivo, dosis, modoAplicacion, plazoSeguridad]);
    return result.insertId;
}
export async function getPlaguicidaById(plaguicidaId) {
    const [rows] = await pool.query('SELECT * FROM rPlaguicida WHERE idRPlaguicida = ?', [plaguicidaId]);
    return rows[0];
}
export async function deletePlaguicida(plaguicidaId) {
    const [result] = await pool.query('DELETE FROM rPlaguicida WHERE idRPlaguicida = ?', [plaguicidaId]);
    return result.affectedRows > 0;
}
export async function updatePlaguicida(plaguicidaId, plaguicidaData) {
    const { fecha, componenteActivo, fitosanitario, motivo, dosis, modoAplicacion, plazoSeguridad } = plaguicidaData;
    const [result] = await pool.query('UPDATE rPlaguicida SET fecha = ?, componenteActivo = ?, fitosanitario = ?, motivo = ?, dosis = ?, modoAplicacion = ?, plazoSeguridad = ? WHERE idRPlaguicida = ?', [fecha, componenteActivo, fitosanitario, motivo, dosis, modoAplicacion, plazoSeguridad, plaguicidaId]);
    return result.affectedRows > 0;
}
export async function listarPlaguicidas() {
    const [rows] = await pool.query('SELECT * FROM rPlaguicida');
    return rows;
}

// FUNCIONES PARA CULTIVO
export async function createCultivo(cultivoData) {
const { cultivo, fecha, observacion } = cultivoData;
    const [result] = await pool.query('INSERT INTO rCultivo (cultivo, fecha, observacion) VALUES (?, ?, ?)', [cultivo, fecha, observacion]);
    return result.insertId;
}
export async function getCultivoById(cultivoId) {
    const [rows] = await pool.query('SELECT * FROM rCultivo WHERE idRCultivo = ?', [cultivoId]);
    return rows[0];
}
export async function deleteCultivo(cultivoId) {
    const [result] = await pool.query('DELETE FROM rCultivo WHERE idRCultivo = ?', [cultivoId]);
    return result.affectedRows > 0;
}
export async function updateCultivo(cultivoId, cultivoData) {
    const { cultivo, fecha, observacion } = cultivoData;
    const [result] = await pool.query('UPDATE rCultivo SET cultivo = ?, fecha = ?, observacion = ? WHERE idRCultivo = ?', [cultivo, fecha, observacion, cultivoId]);
    return result.affectedRows > 0;
}
export async function listarCultivos() {
    const [rows] = await pool.query('SELECT * FROM rCultivo');
    return rows;
}

// FUNCIONES PARA COMERCIALIZACION
export async function createComercializacion(comercializacionData) {
    const { cultivo, fecha, vCosecha, vComercio, destino, retorno, observacion } = comercializacionData;
    const [result] = await pool.query('INSERT INTO rComercializacion (cultivo, fecha, vCosecha, vComercio, destino, retorno, observacion) VALUES (?, ?, ?, ?, ?, ?, ?)', [cultivo, fecha, vCosecha, vComercio, destino, retorno, observacion]);
    return result.insertId;
}
export async function getComercializacionById(comercializacionId) {
    const [rows] = await pool.query('SELECT * FROM rComercializacion WHERE idRComercializacion = ?', [comercializacionId]);
    return rows[0];
}
export async function deleteComercializacion(comercializacionId) {
    const [result] = await pool.query('DELETE FROM rComercializacion WHERE idRComercializacion = ?', [comercializacionId]);
    return result.affectedRows > 0;
}
export async function updateComercializacion(comercializacionId, comercializacionData) {
    const { cultivo, fecha, vCosecha, vComercio, destino, retorno, observacion } = comercializacionData;
    const [result] = await pool.query('UPDATE rComercializacion SET cultivo = ?, fecha = ?, vCosecha = ?, vComercio = ?, destino = ?, retorno = ?, observacion = ? WHERE idRComercializacion = ?', [cultivo, fecha, vCosecha, vComercio, destino, retorno, observacion, comercializacionId]);
    return result.affectedRows > 0;
}
export async function listarComercializaciones() {
    const [rows] = await pool.query('SELECT * FROM rComercializacion');
    return rows;
}

// FUNCIONES PARA PRÁCTICAS
export async function createPractica(practicaData) {
    const { fechaInicio, duracion, tipo, idCampo, idRPlaguicida, idRCultivo, idRSiembra, idRComercializacion, idRFertilizacion, idRAdquisicion, idUsuario } = practicaData;
    const [result] = await pool.query('INSERT INTO practica (fechaInicio, duracion, tipo, idCampo, idRPlaguicida, idRCultivo, idRSiembra, idRComercializacion, idRFertilizacion, idRAdquisicion, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [fechaInicio, duracion, tipo, idCampo, idRPlaguicida, idRCultivo, idRSiembra, idRComercializacion, idRFertilizacion, idRAdquisicion, idUsuario]);
    return result.insertId;
}
export async function getPracticaById(practicaId) {
    const [rows] = await pool.query('SELECT * FROM practica WHERE idPractica = ?', [practicaId]);
    return rows[0];
}
export async function deletePractica(practicaId) {
    const [result] = await pool.query('DELETE FROM practica WHERE idPractica = ?', [practicaId]);
    return result.affectedRows > 0;
}
export async function updatePractica(practicaId, practicaData) {
    const { fechaInicio, duracion, tipo, idCampo, idRPlaguicida, idRCultivo, idRSiembra, idRComercializacion, idRFertilizacion, idRAdquisicion, idUsuario } = practicaData;
    const [result] = await pool.query('UPDATE practica SET fechaInicio = ?, duracion = ?, tipo = ?, idCampo = ?, idRPlaguicida = ?, idRCultivo = ?, idRSiembra = ?, idRComercializacion = ?, idRFertilizacion = ?, idRAdquisicion = ?, idUsuario = ? WHERE idPractica = ?', [fechaInicio, duracion, tipo, idCampo, idRPlaguicida, idRCultivo, idRSiembra, idRComercializacion, idRFertilizacion, idRAdquisicion, idUsuario, practicaId]);
    return result.affectedRows > 0;
}
export async function listarPracticas() {
    const [rows] = await pool.query('SELECT * FROM practica');
    return rows;
}