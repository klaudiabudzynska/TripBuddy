import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const app = express();

app.use(cors());
dotenv.config({ path: '../.env' });

const TRIPADVISOR_API_URI = 'https://api.content.tripadvisor.com/api/v1/location';

app.get('/tripadvisor-api/search', async (req, res) => {
  try {
    const tripAdvisorResponse = await fetch(
      `${TRIPADVISOR_API_URI}/search?key=${process.env.TRIPADVISOR_API_KEY}&searchQuery=${req.query.searchString}&language=en`
    );
    const data = await tripAdvisorResponse.json();
    res.json(data);
  } catch (error) {
    console.error('Error occurred TripAdvisor API:', error);
    res.status(500).json({ error: 'Server error occurred' });
  }
});

app.get('/tripadvisor-api/location-details', async (req, res) => {
  try {
    const tripAdvisorResponse = await fetch(
      `${TRIPADVISOR_API_URI}/location/${req.query.locationId}/details?key=${process.env.TRIPADVISOR_API_KEY}&language=en&currency=USD`
    );
    const data = await tripAdvisorResponse.json();
    res.json(data);
  } catch (error) {
    console.error('Error occurred TripAdvisor API:', error);
    res.status(500).json({ error: 'Server error occurred' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
