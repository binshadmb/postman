CREATE TABLE IF NOT EXISTS "CustomerOrder" (
  "id" TEXT NOT NULL,
  "publicId" TEXT NOT NULL,
  "module" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PAYMENT_PENDING',
  "amount" INTEGER NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'INR',
  "razorpayOrderId" TEXT,
  "razorpayPaymentId" TEXT,
  "customerName" TEXT,
  "customerEmail" TEXT,
  "customerPhone" TEXT,
  "recipientName" TEXT,
  "recipientAddress" TEXT,
  "recipientPin" TEXT,
  "recipientCity" TEXT,
  "recipientState" TEXT,
  "instructions" TEXT,
  "selections" JSONB NOT NULL DEFAULT '{}',
  "events" JSONB NOT NULL DEFAULT '[]',
  "fileName" TEXT,
  "fileMimeType" TEXT,
  "fileSize" INTEGER,
  "fileData" BYTEA,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "paidAt" TIMESTAMP(3),
  "fulfilledAt" TIMESTAMP(3),
  CONSTRAINT "CustomerOrder_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "CustomerOrder_publicId_key" ON "CustomerOrder"("publicId");
CREATE UNIQUE INDEX IF NOT EXISTS "CustomerOrder_razorpayOrderId_key" ON "CustomerOrder"("razorpayOrderId");
CREATE INDEX IF NOT EXISTS "CustomerOrder_status_createdAt_idx" ON "CustomerOrder"("status", "createdAt");
