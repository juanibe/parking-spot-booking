import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedWithUser1706787397739 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (first_name, last_name, email, token, role) VALUES ('Sample', 'Admin', 'sample_admin@gmail.com', 'parking_4aGVAhWcDPVW1zNbwbJ8UDxWAGjh90ykA8JiX6ne9stAN9HVTrjeJY0X', 'ADMIN')`,
    );

    await queryRunner.query(
      `INSERT INTO users (first_name, last_name, email, token, role) VALUES ('Sample', 'Standard', 'sample_standard@gmail.com', 'parking_x2T0FefbTNQuHrZKPz7Gxlsm5oHHcyTqTUWoRBbW9us8QZOelH5LUQ78', 'STANDARD')`,
    );

    await queryRunner.query(
      `INSERT INTO parking_spots (name) VALUES ('Sample Parking Spot')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
