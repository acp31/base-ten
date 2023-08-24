-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "business_model" TEXT NOT NULL,
    "hq_location" TEXT NOT NULL,
    "logo" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Finances" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "data_period" TEXT,
    "revenue" DOUBLE PRECISION,
    "burn" DOUBLE PRECISION,
    "gp_pct" DOUBLE PRECISION,
    "gp_amount" INTEGER,
    "ebitda" DOUBLE PRECISION,
    "cash" DOUBLE PRECISION,
    "ltv" DOUBLE PRECISION,
    "cac" INTEGER,
    "arpu" INTEGER,
    "customer_count" INTEGER,
    "next_fundraise" TIMESTAMP(3),
    "data_data" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Finances" ADD FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
