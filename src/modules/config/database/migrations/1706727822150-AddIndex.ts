import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndex1706727822150 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX IDX_Token ON users(token)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS IDX_Token`);
  }
}
