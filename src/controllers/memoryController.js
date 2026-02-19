import prisma from "../utils/prisma.js";

export async function createMemory(req, res) {
  try {
    const { timelineId } = req.params;
    const { date, text, imageUrl, isFavorite } = req.body;
    if (!date || !text) {
      return res
        .status(400)
        .json({ message: "date and text are required to create a memory" });
    }

    const timeline = await prisma.timeline.findUnique({
      where: { id: timelineId },
    });

    if (!timeline) {
      return res.status(404).json({ message: "Timeline not found" });
    }

    const memory = await prisma.memory.create({
      data: {
        date: new Date(date),
        text: text.trim(),
        imageUrl: imageUrl?.trim() || null,
        isFavorite: typeof isFavorite === "boolean" ? isFavorite : false,
        timelineId: timelineId,
      },
    });
    return res
      .status(201)
      .json({ message: "Memory created successfully", memory });
  } catch (e) {
    console.error(`Error creating memory: ${e.message}`);
    return res.status(500).json({ message: "Error creating memory" });
  }
}

export async function getMemoriesByTimeline(req, res) {
  try {
    const { timelineId } = req.params;
    const timeline = await prisma.timeline.findUnique({
      where: { id: timelineId },
      include: { memories: true },
    });
    if (!timeline) {
      return res.status(404).json({ message: "Timeline not found" });
    }

    return res.status(200).json(timeline.memories);
  } catch (e) {
    console.error(`Error fetching memories: ${e.message}`);
    return res.status(500).json({ message: "Error fetching memories" });
  }
}

export async function getMemoryById(req, res) {
  try {
    const { id } = req.params;
    const memory = await prisma.memory.findUnique({
      where: { id },
    });
    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }
    return res.status(200).json(memory);
  } catch (e) {
    console.error(`Error fetching memory: ${e.message}`);
    return res.status(500).json({ message: "Error fetching memory" });
  }
}

export async function updateMemory(req, res) {
  const { id } = req.params;
  const { date, text, imageUrl, isFavorite } = req.body;
  const data = {};

  if (typeof date === "string" && date.trim() !== "") {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res
        .status(400)
        .json({ message: "date must be a valid ISO string" });
    }
    data.date = parsedDate;
  }

  if (typeof text === "string" && text.trim() !== "") {
    data.text = text.trim();
  }

  if (typeof imageUrl === "string") {
    const clenaedImageUrl = imageUrl.trim();
    data.imageUrl = clenaedImageUrl === "" ? null : clenaedImageUrl;
  }

  if (typeof isFavorite === "boolean") {
    data.isFavorite = isFavorite;
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      message:
        "At least one valid field (text, date, imageUrl, isFavorite) must be provided for update",
    });
  }

  try {
    const updatedMemory = await prisma.memory.update({
      where: { id },
      data,
    });
    return res
      .status(200)
      .json({ message: "Memory updated successfully", updatedMemory });
  } catch (e) {
    if (e?.code === "P2025") {
      return res.status(404).json({ message: "Memory not found" });
    }
    console.error(`Error updating memory: ${e.message}`);
    return res.status(500).json({ message: "Error updating memory" });
  }
}

export async function deleteMemory(req, res) {
  try {
    const { id } = req.params;
    const deletedMemory = await prisma.memory.delete({
      where: { id },
    });
    if (!deletedMemory) {
      return res.status(404).json({ message: "Memory not found" });
    }
    return res
      .status(200)
      .json({ message: "Memory deleted successfully", deletedMemory });
  } catch (e) {
    if (e?.code === "P2025") {
      return res.status(404).json({ message: "Memory not found" });
    }
    console.error(`Error deleting memory: ${e.message}`);
    return res.status(500).json({ message: "Error deleting memory" });
  }
}
