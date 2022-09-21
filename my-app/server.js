import express, { Router } from 'express';
import Contenedor from './classContenedor.js'
import randomInteger from 'random-int'

const content = new Contenedor("./productos.txt");

const app = express();
const router = Router();

app.use(express.json())

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

server.on('error', (err) => {console.log(err)});

app.use("/api/productos", router)


// app.get('/', (req, res) => {

//     res.send("Hola!")
// })

// app.get('/productos', (req, res) => {
//     content.getAll()
//     .then((products) => res.send(products))
// })

// app.get('/productoRandom', (req, res) => {
//     content.getAll()
//     .then((products) => {
//         let randomNumber = randomInteger(1, products.length);
//         content.getById(randomNumber)
//         .then(product => res.send(product))
//     })
// })