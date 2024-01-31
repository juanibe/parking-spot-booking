import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1706726134590 implements MigrationInterface {
    name = 'Migrations1706726134590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "parking_spots" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_e0b54c8ecaf56846b47ef1f32f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "user_id" bigint, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "token" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_64cd97487c5c42806458ab5520c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_64cd97487c5c42806458ab5520c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "parking_spots"`);
    }

}
