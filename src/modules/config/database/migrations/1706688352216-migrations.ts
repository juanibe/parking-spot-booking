import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1706688352216 implements MigrationInterface {
    name = 'Migrations1706688352216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ef2fb839248017665e5033e730" ON "users" ("first_name") `);
        await queryRunner.query(`CREATE INDEX "IDX_0408cb491623b121499d4fa238" ON "users" ("last_name") `);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0408cb491623b121499d4fa238"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef2fb839248017665e5033e730"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
