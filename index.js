require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.DB_PATH);

//Creamos una clase siempre con mayuscula
const Gasto = require('./modelo/gasto');

//Middleware
app.use(express.json());

app.use((req, res, next) => {
  res.header('Content-type', 'application/json', 'charset=utf8');
  next();
});

//ENDOPOINT get
app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify("{ message:'SOY ROOT'}"));
});

app.get('/api/gastos', async (req, res) => {
  const gasto = await Gasto.find();
  res.status(200).send(JSON.stringify("{ message:'Hola Mundo'}"));
});

//Creo los gastos
app.post('/api/gastos', async (req, res) => {
  //recuperamos todos los gastos
  const gastos = Gasto.find();
  //a la estructura le sumamos 1 y vamos generando el id
  const id_gasto = (await gastos).length + 1;
  const datos_gasto = {
    id: id_gasto,
    ...req.body,
  };
  console.log(datos_gasto);
  const gasto1 = new Gasto(datos_gasto);
  await gasto1.save();
  res.status(201).send(JSON.stringify(gasto1));
});

const PORT = process.env.PORT || 3232;
const server = app.listen(PORT, () => {
  console.log(`Servidor APP corriendo en puerto ${PORT}`);
});
