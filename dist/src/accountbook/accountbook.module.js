"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountbookModule = void 0;
const common_1 = require("@nestjs/common");
const accountbook_service_1 = require("./accountbook.service");
const accountbook_controller_1 = require("./accountbook.controller");
const typeorm_1 = require("@nestjs/typeorm");
const Users_1 = require("../entities/Users");
const RefreshToken_1 = require("../entities/RefreshToken");
const TodayExpenses_1 = require("../entities/TodayExpenses");
const AccountBook_1 = require("../entities/AccountBook");
let AccountbookModule = class AccountbookModule {
};
AccountbookModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Users_1.Users, RefreshToken_1.RefreshToken, TodayExpenses_1.TodayExpenses, AccountBook_1.AccountBook]),
        ],
        providers: [accountbook_service_1.AccountbookService],
        controllers: [accountbook_controller_1.AccountbookController],
    })
], AccountbookModule);
exports.AccountbookModule = AccountbookModule;
//# sourceMappingURL=accountbook.module.js.map