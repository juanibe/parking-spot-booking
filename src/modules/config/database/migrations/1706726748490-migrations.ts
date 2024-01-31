import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1706726748490 implements MigrationInterface {
    name = 'Migrations1706726748490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parking_spots" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parking_spots" DROP COLUMN "name"`);
    }

}
