import { MongoClient } from 'mongodb';
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function crearBD() {
  try {
    await client.connect();
    const db = client.db('banco_nexus');

    const clientes = db.collection('clientes');
    const cuentas = db.collection('cuentas');
    const transacciones = db.collection('transacciones');

    // Limpiar datos anteriores
    await clientes.deleteMany({});
    await cuentas.deleteMany({});
    await transacciones.deleteMany({});

    // Nuevos datos
    const clientesData = [
      { nombre: 'Valeria Mendoza', curp: 'MEOV950101MDFXVL01' },
      { nombre: 'Esteban Ríos', curp: 'RIEE870202HDFXES02' },
      { nombre: 'Daniela Campos', curp: 'CADD920303MDFXDC03' },
      { nombre: 'Alonso García', curp: 'GAOA810404HDFXAG04' },
      { nombre: 'Fernanda Ortiz', curp: 'ORIF990505MDFXFO05' }
    ];

    const cuentasData = [
      { cuenta: '200', cliente: 'MEOV950101MDFXVL01', saldo: 6000 },
      { cuenta: '201', cliente: 'RIEE870202HDFXES02', saldo: 8200 },
      { cuenta: '202', cliente: 'CADD920303MDFXDC03', saldo: 4500 },
      { cuenta: '203', cliente: 'GAOA810404HDFXAG04', saldo: 9900 },
      { cuenta: '204', cliente: 'ORIF990505MDFXFO05', saldo: 7300 }
    ];

    const transaccionesData = [
      { cuenta: '200', tipo: 'deposito', monto: 1200, fecha: new Date('2025-05-11T10:00:00Z') },
      { cuenta: '201', tipo: 'retiro', monto: 700, fecha: new Date('2025-05-12T11:30:00Z') },
      { cuenta: '202', tipo: 'deposito', monto: 2500, fecha: new Date('2025-05-13T14:15:00Z') },
      { cuenta: '203', tipo: 'retiro', monto: 1300, fecha: new Date('2025-05-14T16:45:00Z') },
      { cuenta: '204', tipo: 'deposito', monto: 1600, fecha: new Date('2025-05-15T09:20:00Z') }
    ];

    // Insertar nuevos datos
    await clientes.insertMany(clientesData);
    await cuentas.insertMany(cuentasData);
    await transacciones.insertMany(transaccionesData);

    console.log('Base de datos "banco_nexus" reiniciada y cargada con nuevos datos.');
  } catch (error) {
    console.error('Error al crear la base de datos:', error);
  } finally {
    await client.close();
  }
}

crearBD();
