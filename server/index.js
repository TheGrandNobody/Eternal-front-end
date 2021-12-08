const express = require('express');
const next = require('next');
const handleError = require('./middlewares/errorhandling');
const mongooseConnectionHandler = require('./lib/mongooseConnectionHandler');
const bodyParser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    const routes = require('./routes/index');
    server.use(bodyParser.json());
    server.use('/api', routes);
    server.use(handleError);

    // mongooseConnectionHandler
    //   .connect('mongodb+srv://tamjeed:Macbookpro1@cluster0.f92lg.mongodb.net/eternal?retryWrites=true&w=majority', {
    //     useNewUrlParser: true,
    //   })
    //   .catch((err) => console.log(err));

    mongooseConnectionHandler
      .connect('mongodb://localhost:27017/eternal', {
        useNewUrlParser: true,
      })
      .catch((err) => console.log(err));

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
