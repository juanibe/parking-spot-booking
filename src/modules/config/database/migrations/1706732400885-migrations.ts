import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1706732400885 implements MigrationInterface {
  name = 'Migrations1706732400885';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_token"`);
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "privacy" TO "role"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."users_privacy_enum" RENAME TO "users_role_enum"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."users_role_enum" RENAME TO "users_privacy_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "role" TO "privacy"`,
    );
    await queryRunner.query(`CREATE INDEX "idx_token" ON "users" ("token") `);
  }
}
