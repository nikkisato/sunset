// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// Database Client
const client = require('./lib/client');
// Services
const charactersApi = require('./lib/characters-api');



// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); 
app.use(cors()); 
app.use(express.static('public')); 
app.use(express.json()); 

// // setup authentication routes
// app.use('/api/auth', authRoutes);

// // everything that starts with "/api" below here requires an auth token!
// app.use('/api', ensureAuth);

// *** API Routes ***
app.get('/v1/quality', async (req, res) => {

    try {
        const resp = await sunburst.quality({
            geo: [40.7933949, -77.8600012]
        });
        features.forEach(({ geometry, properties }) => {
            const { coordinates } = geometry;
            console.log({ coordinates, properties });
        });
    } catch (ex) {
        // Handle general network or parsing errors.
        return console.error(ex);
    }
});

app.post('/v1/quality', async (req, res) => {
    try {
        const now = new Date();
        const thisTimeTomorrow = now.setDate(now.getDate() + 1);
      
        const resp = await sunburst.batchQuality([
            {
                geo: [40.7933949, -77.8600012],
                type: 'sunrise'
            },
            {
                geo: [40.7933949, -77.8600012],
                type: 'sunset'
            },
            {
                geo: [40.7933949, -77.8600012],
                type: 'sunrise',
                after: thisTimeTomorrow
            },
            {
                geo: [40.7933949, -77.8600012],
                type: 'sunset',
                after: thisTimeTomorrow
            }
        ]);
      
        resp.forEach(({ collection, error }) => {
            if (error) {
            // Handle individual query errors separately,
            // as some queries may have still succeeded.
                return console.error(error);
            }
            collection.features.forEach(({ geometry, properties }) => {
                const { coordinates } = geometry;
                console.log({ coordinates, properties });
            });
        });
    } catch (ex) {
        // Handle general network or parsing errors.
        return console.error(ex);
    }
});


const stringHash = require('string-hash');

app.post('/v1/login', async (req, res) => {
    try {
        const sunburst = new SunburstJS();
      
        const session = await sunburst.createSession({
            email: 'email@example.com',
            password: '2fHYO3Ked(ez$G4bBg',
            type: 'permanent',
            scope: ['predictions']
        });
      
        console.log(session);
      
    } catch (ex) {
        // Handle general network or parsing errors.
        return console.error(ex);
    }
});


app.post('/v1/login/session', (req, res) => {
    let sunburst = new SunburstJS({
        clientId: 'f78fe615-8eb1-48c4-be21-e5f4f437e8ba',
        clientSecret: '18qwl0htsPX|[!NGQ@[qK{X;[&^EVzaH',
        scope: ['predictions']
    });
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});