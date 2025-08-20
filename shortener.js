const express = require('express');
const router = express.Router();

const links = [];

router.post('/shorten', (req, res) => {
    try {
    const { url, validity, shortcode } = req.body;

    if (!url || !validity || !shortcode) {
        return res.status(400).json({ error: 'url, validity and shortcode are required' });
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + validity);

    const shortlink = `http://localhost:5000/${shortcode}`;
    links.push({ shortcode, url, expiry: expiryDate });

    res.json({
        shortlink,
        expiry: expiryDate
    });

    } catch (error) {
    res.status(500).json({ error: 'Server error' });
    }
});

router.get('/info/:shortcode', (req, res) => {
    const { shortcode } = req.params;
    const record = links.find(link => link.shortcode == shortcode);

    if (!record) return res.status(404).json({ error: 'Shortlink not found' });

    res.json({
    url: record.url,
    shortlink: `http://localhost:5000/${record.shortcode}`,
    expiry: record.expiry
    });
});

module.exports = router;
