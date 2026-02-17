import request from "supertest";
import app from "../../index.js";
import prisma from "../../src/utils/prisma.js";

describe("Timeline API", () => {
  beforeAll(async () => {
    await prisma.timeline.deleteMany();
    await prisma.timeline.createMany({
      data: [{ personName: "Alice", relationshipType: "friend" }],
    });
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("POST /api/timelines - create timeline", async () => {
    const res = await request(app).post("/api/timelines").send({
      personName: "Bob",
      relationshipType: "family",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Timeline created successfully");
  });

  test("GET /api/timelines - get all timelines", async () => {
    const res = await request(app).get("/api/timelines");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test("GET /api/timelines/:id - get timeline by id", async () => {
    const timelines = await prisma.timeline.findMany();
    const timeline = timelines[0];
    const res = await request(app).get(`/api/timelines/${timeline.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", timeline.id);
  });

  test("PATCH /api/timelines/:id - update timeline", async () => {
    const timelines = await prisma.timeline.findMany();
    const timeline = timelines[0];
    const res = await request(app).patch(`/api/timelines/${timeline.id}`).send({
      personName: "Alice Updated",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Timeline updated successfully");
    expect(res.body).toHaveProperty("updatedTimeline");
  });

  test("DELETE /api/timelines/:id - delete timeline", async () => {
    const timelines = await prisma.timeline.findMany();
    const timeline = timelines[0];
    const res = await request(app).delete(`/api/timelines/${timeline.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Timeline deleted successfully");
  });

  test("GET non-existent timeline -should return 404", async () => {
    const res = await request(app).get("/api/timelines/non-existent-id");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Timeline not found");
  });

  test("DELETE non-existent timeline -should return 404", async () => {
    const res = await request(app).delete("/api/timelines/non-existent-id");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Timeline not found");
  });

  test("POST /api/timelines - missing fields should return 400", async () => {
    const res = await request(app).post("/api/timelines").send({
      personName: "Charlie",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      "message",
      "personName and relationshipType are required",
    );
  });

  test("PATCH /api/timelines/:id - no valid fileds should return 400", async () => {
    const timelines = await prisma.timeline.findMany();
    const timeline = timelines[0];
    const res = await request(app).patch(`/api/timelines/${timeline.id}`).send({
      invalidField: "Invalid",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      "message",
      "At least one of personName or relationshipType must be provided and non-empty",
    );
  });
});
