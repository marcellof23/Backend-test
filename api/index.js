const express = require('express');
const { logger } = require('../logger');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verifyToken = require('../middlewares/jwt');
const router = express.Router();
const axios = require('axios');

const db = require('../models');
const User = db.User;
const JobList = db.JobList;

const API_PREFIX = process.env.API_PREFIX;

router.get('/api/jobs/recruitment-positions', verifyToken, (req, res) => {
    logger.info('Fetch recruitment position by search term and pagination');
    const API_PREF = API_PREFIX + '/recruitment/positions.json';
    axios.get(API_PREF).then((response) => {
        response = response.data;
        if (req.query.description) {
            response = response.filter((el) =>
                el.description.toLowerCase().includes(req.query.description.toLowerCase())
            );
        }
        if (req.query.location) {
            response = response.filter((el) => {
                return el.location == req.query.location;
            });
        }

        if (req.query.full_time) {
            if (req.query.full_time == 'true') {
                response = response.filter((el) => {
                    return el.type == 'Full Time';
                });
            } else {
                response = response.filter((el) => {
                    return el.type == 'Part Time';
                });
            }
        }
        return res.json(response);
    });
});

router.post('/api/register', async (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const users = {
            username: req.body.username,
            password: hash,
        };
        User.create(users)
            .then((datas) => {
                const user_data = datas.toJSON();
                delete user_data['password'];
                return res.json(user_data);
            })
            .catch((err) => {
                return res.status(403).send({
                    message: err.message || 'Some error occurred while creating the User.',
                });
            });
    });
});

router.post('/api/login', async (req, res) => {
    let user_data;
    let where = { username: req.body.username };
    User.findOne({
        where,
        raw: true,
    })
        .then(async (user) => {
            if (!user) {
                return res.status(401).json({
                    message: 'Authentication failed',
                });
            }
            user_data = user;

            const verified = await bcrypt.compare(req.body.password, user.password);
            if (!verified) {
                return res.status(401).json({
                    message: 'Authentication failed',
                });
            }
            let jwtToken = jwt.sign(
                {
                    username: user_data.username,
                },
                'secretkey',
                {
                    expiresIn: '1h',
                }
            );
            return res.status(200).json({
                token: jwtToken,
                expiresIn: 3600,
                msg: user_data,
            });
        })
        .catch((err) => {
            return res.status(403).send({ message: 'Terjadi error di server' });
        });
});

module.exports = router;
