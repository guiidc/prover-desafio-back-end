const app = require('./index.js');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('server online!'));
