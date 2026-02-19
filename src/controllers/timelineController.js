import prisma from "../utils/prisma.js";

export async function createTimeline(req, res) {
  try {
    const { personName, relationshipType } = req.body;

    if (!personName || !relationshipType) {
      return res
        .status(400)
        .json({ message: "personName and relationshipType are required" });
    }

    await prisma.timeline.create({
      data: {
        personName,
        relationshipType,
        userId: req.userId,
      },
    });

    res.status(201).json({ message: "Timeline created successfully" });
  } catch (e) {
    console.error(`Error creating timeline: ${e.message}`);
    res.status(500).json({ message: "Error creating timeline" });
  }
}

export async function getTimelines(req, res) {
  try {
    const timelines = await prisma.timeline.findMany({
      where: { userId: req.userId },
    });
    res.status(200).json(timelines);
  } catch (e) {
    console.error(`Error fetching timelines: ${e.message}`);
    res.status(500).json({ message: "Error fetching timelines" });
  }
}

export async function getTimelineById(req, res) {
  try {
    const { id } = req.params;
    const timeline = await prisma.timeline.findUnique({
      where: { id, userId: req.userId },
    });
    if (!timeline) {
      return res.status(404).json({ message: "Timeline not found" });
    }

    res.json(timeline);
  } catch (error) {
    console.error(`Error fetching timeline: ${error.message}`);
    res.status(500).json({ message: "Error fetching timeline" });
  }
}

export async function updateTimeline(req, res) {
  const { id } = req.params;
  const { personName, relationshipType } = req.body;
  const data = {};
  if (typeof personName === "string" && personName.trim() !== "") {
    data.personName = personName;
  }
  if (typeof relationshipType === "string" && relationshipType.trim() !== "") {
    data.relationshipType = relationshipType;
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      message:
        "At least one of personName or relationshipType must be provided and non-empty",
    });
  }

  try {
    const updatedTimeline = await prisma.timeline.update({
      where: { id, userId: req.userId },
      data,
    });

    return res
      .status(200)
      .json({ message: "Timeline updated successfully", updatedTimeline });
  } catch (e) {
    if (e?.code === "P2025") {
      return res.status(404).json({ message: "Timeline not found" });
    }
    console.error(`Error updating timeline: ${e.message}`);
    res.status(500).json({ message: "Error updating timeline" });
  }
}

export async function deleteTimeline(req, res) {
  const { id } = req.params;

  try {
    const deleteTimeline = await prisma.timeline.delete({
      where: { id, userId: req.userId },
    });

    if (!deleteTimeline) {
      return res.status(404).json({ message: "Timeline not found" });
    }

    return res.status(200).json({ message: "Timeline deleted successfully" });
  } catch (e) {
    if (e?.code === "P2025") {
      return res.status(404).json({ message: "Timeline not found" });
    }
    console.error(`Error deleting timeline: ${e.message}`);
    res.status(500).json({ message: "Error deleting timeline" });
  }
}
