-- DropForeignKey
ALTER TABLE "materialDetails" DROP CONSTRAINT "materialDetails_request_id_fkey";

-- AddForeignKey
ALTER TABLE "materialDetails" ADD CONSTRAINT "materialDetails_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
