"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerentesRouter = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const gerenteController_1 = require("../controllers/gerenteController");
exports.gerentesRouter = (0, express_1.Router)();
exports.gerentesRouter.use((0, cors_1.default)());
exports.gerentesRouter.post('/', gerenteController_1.createUserGerente);
