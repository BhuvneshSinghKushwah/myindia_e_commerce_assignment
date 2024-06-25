require('dotenv').config();

const express = require('express');
const router = express.Router();

router.get('/details', async (req, res) => {
    try {
        return res.status(200).json({status: true, details: []});
    } catch (err) {
        
    }
})

router.post('/update/details', async (req, res) => {
    try {
        
    } catch (err) {
        
    }
})

router.post('/create', async (req, res) => {
    try {
        
    } catch (err) {
        
    }
})

router.delete('/remove', async (req, res) => {
    try {
        
    } catch (err) {
        
    }
})

module.exports = router;