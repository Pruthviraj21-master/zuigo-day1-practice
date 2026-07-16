require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/day9practice';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

const collaborationRequestSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  budget: { type: Number, required: true, min: 0.01 },
  city: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
});

const CollaborationRequest = mongoose.model('CollaborationRequest', collaborationRequestSchema);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Collaboration Request API',
      version: '1.0.0',
      description: 'Practice CRUD API with auth and Swagger docs'
    }
  },
  apis: ['./server.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

app.post('/login', (req, res) => {
  const { username = 'demo', password = 'demo' } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  return res.json({ token });
});

/**
 * @swagger
 * /requests:
 *   get:
 *     summary: List collaboration requests
 *     responses:
 *       200:
 *         description: Successful response
 */
app.get('/requests', async (req, res) => {
  try {
    const requests = await CollaborationRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @swagger
 * /requests/{id}:
 *   get:
 *     summary: Get a collaboration request by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Request not found
 */
app.get('/requests/:id', async (req, res) => {
  try {
    const request = await CollaborationRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(400).json({ error: 'Invalid request id' });
  }
});

/**
 * @swagger
 * /requests:
 *   post:
 *     summary: Create a collaboration request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 */
app.post('/requests', authenticate, async (req, res) => {
  try {
    const { title, budget, city, category, description } = req.body;

    if (!title || !city || !category) {
      return res.status(400).json({ error: 'Title, city and category are required' });
    }

    if (typeof budget !== 'number' || Number.isNaN(budget) || budget <= 0) {
      return res.status(400).json({ error: 'Budget must be a positive number' });
    }

    const request = new CollaborationRequest({ title, description, budget, city, category });
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/requests/:id', authenticate, async (req, res) => {
  try {
    const { title, budget, city, category, description } = req.body;

    if (title !== undefined && !title) {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }

    if (budget !== undefined && (typeof budget !== 'number' || Number.isNaN(budget) || budget <= 0)) {
      return res.status(400).json({ error: 'Budget must be a positive number' });
    }

    if (city !== undefined && !city) {
      return res.status(400).json({ error: 'City cannot be empty' });
    }

    const request = await CollaborationRequest.findByIdAndUpdate(
      req.params.id,
      { title, budget, city, category, description },
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(400).json({ error: 'Invalid update' });
  }
});

app.delete('/requests/:id', authenticate, async (req, res) => {
  try {
    const request = await CollaborationRequest.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Invalid request id' });
  }
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  });
