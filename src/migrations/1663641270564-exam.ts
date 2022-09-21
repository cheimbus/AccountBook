import { MigrationInterface, QueryRunner } from 'typeorm';

export class exam1663641270564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `AlTER TABLE account_book MODIFY COLUMN name varchar(30) ,
      MODIFY COLUMN determination varchar(30),
      MODIFY COLUMN input_money int,
      MODIFY COLUMN current_money int,
      MODIFY COLUMN is_deleted varchar(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `refresh_token` RENAME COLUMN `refreshToken` TO `refresh_token`',
    );
  }
}

// migration test
