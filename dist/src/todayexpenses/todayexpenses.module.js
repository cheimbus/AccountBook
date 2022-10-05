"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodayexpensesModule = void 0;
const common_1 = require("@nestjs/common");
const todayexpenses_service_1 = require("./todayexpenses.service");
const todayexpenses_controller_1 = require("./todayexpenses.controller");
const typeorm_1 = require("@nestjs/typeorm");
const Users_1 = require("../entities/Users");
const AccountBook_1 = require("../entities/AccountBook");
const TodayExpenses_1 = require("../entities/TodayExpenses");
const auth_module_1 = require("../auth/auth.module");
let TodayexpensesModule = class TodayexpensesModule {
};
TodayexpensesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Users_1.Users, AccountBook_1.AccountBook, TodayExpenses_1.TodayExpenses]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        providers: [todayexpenses_service_1.TodayexpensesService],
        controllers: [todayexpenses_controller_1.TodayexpensesController],
    })
], TodayexpensesModule);
exports.TodayexpensesModule = TodayexpensesModule;
//# sourceMappingURL=todayexpenses.module.js.map