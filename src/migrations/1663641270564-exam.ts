import { MigrationInterface, QueryRunner } from 'typeorm';

export class exam1663641270564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `refresh_token` RENAME COLUMN `refresh_token` TO `refreshToken`',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `refresh_token` RENAME COLUMN `refreshToken` TO `refresh_token`',
    );
  }
}

// migration test
