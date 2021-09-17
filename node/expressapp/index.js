const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());



const home = require('./routes/home');
const auth = require('./routes/auth');
const proizvodi = require('./routes/proizvodi');
const register = require('./routes/register');
const admin_panel = require('./routes/admin_panel');
// const profile1 = require('./routes/profile1');
// const welcome = require('./routes/welcome');
const history = require('connect-history-api-fallback');
const path = require('path');


app.use('/auth' , auth);
app.use('/home' , home);
app.use('/proizvodi' , proizvodi);
app.use('/register' , register);
app.use('/admin_panel' , admin_panel);
// app.use('/wel' , welcome);
// app.use('/profile' , profile);
// app.use('/profile1' , profile1);

const staticMiddleware = express.static(path.join(__dirname, 'dist'));

app.use(staticMiddleware);
app.use(history);
app.use(staticMiddleware);

app.listen(8085, () => console.log('App listening on port 8085!'))
