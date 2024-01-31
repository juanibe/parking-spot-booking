import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1706688583164 implements MigrationInterface {
    name = 'Migrations1706688583164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
