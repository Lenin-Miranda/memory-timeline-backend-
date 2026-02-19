import request from "supertest";
import app from "../index.js";
import prisma from "../src/utils/prisma.js";

describe("Memory API", () => {
  beforeAll(async () => {
    await prisma.memory.deleteMany();
    const timeline = await prisma.timeline.create({
      data: {
        personName: "Test Person",
        relationshipType: "friend",
      },
    });
    await prisma.memory.createMany({
      data: [
        { date: new Date(), text: "Test Memory 1", timelineId: timeline.id },
        { date: new Date(), text: "Test Memory 2", timelineId: timeline.id },
      ],
    });
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("POST /api/timelines/:timelineId/memories - create memory", async () => {
    const timelines = await prisma.timeline.findMany();
    const timeline = timelines[0];
    const res = await request(app)
      .post(`/api/timelines/${timeline.id}/memories`)
      .send({
        date: new Date(),
        text: "New Test Memory",
        imageUrl: "http://example.com/image.jpg",
        isFavorite: true,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Memory created successfully");
    expect(res.body).toHaveProperty("memory");
  });

  test("GET /api/timelines/:timelineId/memories - get memories by timeline", async () => {
    const timelines = await prisma.timeline.findMany();
    const timeline = timelines[0];
    const res = await request(app).get(
      `/api/timelines/${timeline.id}/memories`,
    );
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test("PATCH /api/memories/:id - update memory", async () => {
    const memories = await prisma.memory.findMany();
    const memory = memories[0];
    const res = await request(app).patch(`/api/memories/${memory.id}`).send({
      text: "Updated Test Memory",
      isFavorite: false,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Memory updated successfully");
    expect(res.body).toHaveProperty("updatedMemory");
  });

  test("DELETE /api/memories/:id - delete memory", async () => {
    const memories = await prisma.memory.findMany();
    const memory = memories[0];
    const res = await request(app).delete(`/api/memories/${memory.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Memory deleted successfully");
  });

  test("GET non-existent memory - should return 404", async () => {
    const res = await request(app).get("/api/memories/non-existent-id");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Memory not found");
  });

  test("DELETE non-existent memory - should return 404", async () => {
    const res = await request(app).delete("/api/memories/non-existent-id");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Memory not found");
  });

  test("POST memory with missing fields - should return 400", async () => {
    const timelines = await prisma.timeline.findMany();
    const timeline = timelines[0];
    const res = await request(app)
      .post(`/api/timelines/${timeline.id}/memories`)
      .send({
        text: "Memory without date",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      "message",
      "date and text are required to create a memory",
    );
  });

  test("PATCH memory with invalid fields - should return 400", async () => {
    const memories = await prisma.memory.findMany();
    const memory = memories[0];
    const res = await request(app).patch(`/api/memories/${memory.id}`).send({
      text: "",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      "message",
      "At least one valid field (text, date, imageUrl, isFavorite) must be provided for update",
    );
  });
});
