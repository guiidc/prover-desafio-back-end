const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const helmet = require('helmet')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(routes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('server online!'))