require('dotenv').config();

const SunburstJS = require('sunburst');
const express = require('express');

const app = express();
const PORT = process.env.PORT;
app.use(express.static('public')); 
app.use(express.json()); 

// *** API Routes ***
app.get('/v1/quality', async (req, res) => {
    try {
        const resp = await sunburst.quality({
            geo: [45.512794, -122.679565],
        });
        features.forEach(({ geometry, properties }) => {
            const { coordinates } = geometry;
            console.log({ coordinates, properties });
        });
    } catch (ex) {
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


app.post('/v1/login', async (req, res) => {
    try {
        const sunburst = new SunburstJS();
      
        const session = await sunburst.createSession({
            email: PROCESS.ENV.EMAIL,
            password: PROCESS.ENV.PASSWORD,
            type: 'permanent',
            scope: ['predictions'],
            Bearer: '6340beaa-7279-4055-a6ec-fc9422ee0ad8'
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
        scope: ['predictions'],
        Bearer: '6340beaa-7279-4055-a6ec-fc9422ee0ad8'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});