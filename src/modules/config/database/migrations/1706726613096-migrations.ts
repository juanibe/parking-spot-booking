import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1706726613096 implements MigrationInterface {
    name = 'Migrations1706726613096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ADD "start" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "end" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "parking_spot" bigint`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_eb02bd0030ca0e0984f4b671693" FOREIGN KEY ("parking_spot") REFERENCES "parking_spots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_eb02bd0030ca0e0984f4b671693"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "parking_spot"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "end"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "start"`);
    }

}
