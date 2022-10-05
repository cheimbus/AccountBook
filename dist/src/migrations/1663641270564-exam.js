"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exam1663641270564 = void 0;
class exam1663641270564 {
    async up(queryRunner) {
        await queryRunner.query(`AlTER TABLE account_book MODIFY COLUMN name varchar(30) ,
      MODIFY COLUMN determination varchar(30),
      MODIFY COLUMN input_money int,
      MODIFY COLUMN current_money int,
      MODIFY COLUMN is_deleted varchar(255)`);
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE `refresh_token` RENAME COLUMN `refreshToken` TO `refresh_token`');
    }
}
exports.exam1663641270564 = exam1663641270564;
//# sourceMappingURL=1663641270564-exam.js.map