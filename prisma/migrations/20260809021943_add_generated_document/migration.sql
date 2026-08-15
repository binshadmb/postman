-- CreateTable
CREATE TABLE "PrintConfig" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "bondPaperAvailable" BOOLEAN NOT NULL DEFAULT true,
    "premiumPaperAvailable" BOOLEAN NOT NULL DEFAULT true,
    "standardPaperAvailable" BOOLEAN NOT NULL DEFAULT true,
    "envelopeSizes" JSONB NOT NULL DEFAULT '["C4","C5","C6"]',
    "foldingAvailable" BOOLEAN NOT NULL DEFAULT true,
    "foldTypes" JSONB NOT NULL DEFAULT '["Single fold","Tri-fold","No fold"]',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrintConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerOrder" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PAYMENT_PENDING',
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "paymentProvider" TEXT,
    "paypalOrderId" TEXT,
    "paypalCaptureId" TEXT,
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
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "fulfilledAt" TIMESTAMP(3),

    CONSTRAINT "CustomerOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneratedDocument" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "docType" TEXT NOT NULL,
    "orderId" TEXT,
    "customerName" TEXT,
    "customerEmail" TEXT,
    "fields" JSONB NOT NULL DEFAULT '{}',
    "pdfData" BYTEA NOT NULL,
    "pdfMimeType" TEXT NOT NULL DEFAULT 'application/pdf',
    "sentAt" TIMESTAMP(3),
    "sentTo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeneratedDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerOrder_publicId_key" ON "CustomerOrder"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerOrder_razorpayOrderId_key" ON "CustomerOrder"("razorpayOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerOrder_paypalOrderId_key" ON "CustomerOrder"("paypalOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedDocument_publicId_key" ON "GeneratedDocument"("publicId");

-- AddForeignKey
ALTER TABLE "GeneratedDocument" ADD CONSTRAINT "GeneratedDocument_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "CustomerOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
