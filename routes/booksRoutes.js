import express from 'express';
import { Books } from '../models/bookmodel.js';

const router = express.Router()
//save and new books

router.post('/', async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({message: "send all requred fileds: title, author, publisyear"})
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Books.create(newBook);
        res.status(200).send({message: book})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//get all books

router.get('/', async(req, res) => {
    try {
        const books = await Books.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//get one book by id

router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Books.findById(id)
        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//update book by id

router.put('/:id', async(req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({message: "send all requred fileds: title, author, publisyear"})
        }
        const {id} = req.params;
        const result = await Books.findByIdAndUpdate(id, req.body)
        if(!result) {
            return res.status(404).json({message: "book not found"})
        }
        return res.status(200).send({message: 'book updated successfully'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//delete a book

router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const result = await Books.findByIdAndDelete(id);
        if(!result) {
             return res.status(404).json({message: "book not found"})
        }
        return res.status(200).send({message: 'book deleted successfully'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

export default router;