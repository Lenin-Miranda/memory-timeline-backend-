-- CreateTable
CREATE TABLE "Timeline" (
    "id" TEXT NOT NULL,
    "personName" TEXT NOT NULL,
    "relationshipType" TEXT NOT NULL,
    "shareId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Memory" (
    "id" TEXT NOT NULL,
    "timelineId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "imageUrl" TEXT,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Memory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Timeline_shareId_key" ON "Timeline"("shareId");

-- CreateIndex
CREATE INDEX "Memory_timelineId_idx" ON "Memory"("timelineId");

-- CreateIndex
CREATE INDEX "Memory_date_idx" ON "Memory"("date");

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_timelineId_fkey" FOREIGN KEY ("timelineId") REFERENCES "Timeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;
