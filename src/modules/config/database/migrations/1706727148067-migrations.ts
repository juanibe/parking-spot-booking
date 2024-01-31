import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1706727148067 implements MigrationInterface {
    name = 'Migrations1706727148067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_privacy_enum" AS ENUM('ADMIN', 'STANDARD')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "privacy" "public"."users_privacy_enum" NOT NULL DEFAULT 'STANDARD'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "privacy"`);
        await queryRunner.query(`DROP TYPE "public"."users_privacy_enum"`);
    }

}
