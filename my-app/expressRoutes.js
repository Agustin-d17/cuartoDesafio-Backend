import express, { Router } from 'express';
import Contenedor from './classContenedor.js'

const content = new Contenedor("./my-app/data/productos.json");

const router = Router();

router.get('/', (req, res) => {
    content.getAll()
    .then((response) => res.send(response))
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    
    content.getById(id)
    .then((response) => {
        if(response) {
            res.send(response)
        }else{
            res.send({ error : 'Producto no encontrado'})
        }
    })

})

router.post('/', (req, res) => {
    const newProduct = req.body;

    content.save(newProduct)
    res.status(201).send({ status: 'Guardado'})

    // console.log(req)
})

router.put('/:id', (req, res) => {
    const { id } = req.params

    const modifiedProduct = req.body

    content.getById(id)
    .then((response) => {
        if(response) {
            content.modifyById(id, modifiedProduct)
            res.status(201).send({ status: 'Producto modificado' })
        }else{
            res.send({ error : 'Producto no encontrado'})
        }
    })

})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    content.deleteById(id)
    .then((response) => res.status(201).send(response))
})

export { router } 