# Memory Timeline Backend

A REST API for managing personal timelines and memories. Built with Node.js, Express, PostgreSQL, and Prisma.

## Features

- Timeline management (CRUD operations)
- Memory management with timeline associations
- Database-driven with PostgreSQL
- Comprehensive test suite with Jest
- Database isolation for testing
- ES modules configuration

## Tech Stack

- **Runtime**: Node.js v20.19.6 with ES modules
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Testing**: Jest with Supertest
- **Database Provider**: Neon (cloud PostgreSQL)

## Database Models

### Timeline

- `id`: Unique identifier (cuid)
- `personName`: Name of the person
- `relationshipType`: Type of relationship (friend, family, etc.)
- `shareId`: Unique sharing identifier
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp
- `memories`: Array of associated memories

### Memory

- `id`: Unique identifier (cuid)
- `timelineId`: Associated timeline ID
- `date`: Memory date
- `text`: Memory description
- `imageUrl`: Optional image URL
- `isFavorite`: Favorite status (boolean)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Installation

```bash
npm install
```

## Environment Setup

Create `.env` file:

```
DATABASE_URL="your_postgresql_connection_string"
PORT=3000
```

Create `.env.test` file for testing:

```
DATABASE_URL="your_test_postgresql_connection_string"
```

## Database Setup

1. Generate Prisma client:

```bash
npx prisma generate
```

2. Run migrations:

```bash
npx prisma migrate dev
```

3. For test database setup:

```bash
npm run test:setup
```

## Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Endpoints

### Timelines

- `GET /api/timelines` - Get all timelines
- `GET /api/timelines/:id` - Get timeline by ID
- `POST /api/timelines` - Create new timeline
- `PATCH /api/timelines/:id` - Update timeline
- `DELETE /api/timelines/:id` - Delete timeline

### Memories

- `GET /api/timelines/:timelineId/memories` - Get memories for a timeline
- `GET /api/memories/:id` - Get memory by ID
- `POST /api/timelines/:timelineId/memories` - Create new memory
- `PATCH /api/memories/:id` - Update memory
- `DELETE /api/memories/:id` - Delete memory

### Health Check

- `GET /health` - API health status

## Request/Response Examples

### Create Timeline

```bash
POST /api/timelines
Content-Type: application/json

{
  "personName": "John Doe",
  "relationshipType": "friend"
}
```

### Create Memory

```bash
POST /api/timelines/:timelineId/memories
Content-Type: application/json

{
  "date": "2026-02-19T10:00:00Z",
  "text": "Had a great conversation about programming",
  "imageUrl": "https://example.com/photo.jpg",
  "isFavorite": true
}
```

## Testing

Run all tests:

```bash
npm test
```

The test suite includes:

- 9 Timeline API tests
- 8 Memory API tests
- Complete CRUD operation coverage
- Error handling validation
- Database isolation between tests

## Project Structure

```
memory-timeline-backend/
├── src/
│   ├── controllers/
│   │   ├── timelineController.js
│   │   └── memoryController.js
│   ├── routes/
│   │   ├── timelineRoutes.js
│   │   └── memoryRoutes.js
│   └── utils/
│       └── prisma.js
├── tests/
│   ├── timelines.test.js
│   └── memory.test.js
├── prisma/
│   └── schema.prisma
├── index.js
├── package.json
└── jest.config.json
```

## Development Notes

- Uses ES modules (`"type": "module"` in package.json)
- Jest configured for ES modules with experimental VM modules
- Separate test database for isolated testing
- Database cascading deletes for data integrity
- Comprehensive error handling and validation
- CORS enabled for frontend integration

## Database Management

Open Prisma Studio:

```bash
npm run studio
```

Deploy migrations:

```bash
npm run migrate
```
