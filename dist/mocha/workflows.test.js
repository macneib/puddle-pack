"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @@@SNIPSTART hello-world-project-template-ts-workflow-test
const testing_1 = require("@temporalio/testing");
const mocha_1 = require("mocha");
const worker_1 = require("@temporalio/worker");
const workflows_1 = require("../workflows");
const activities = __importStar(require("../activities"));
const assert_1 = __importDefault(require("assert"));
(0, mocha_1.describe)('Example workflow', () => {
    let testEnv;
    (0, mocha_1.before)(async () => {
        testEnv = await testing_1.TestWorkflowEnvironment.createLocal();
    });
    after(async () => {
        await testEnv?.teardown();
    });
    (0, mocha_1.it)('successfully completes the Workflow', async () => {
        const { client, nativeConnection } = testEnv;
        const taskQueue = 'test';
        const worker = await worker_1.Worker.create({
            connection: nativeConnection,
            taskQueue,
            workflowsPath: require.resolve('../workflows'),
            activities,
        });
        const result = await worker.runUntil(client.workflow.execute(workflows_1.example, {
            args: ['Temporal'],
            workflowId: 'test',
            taskQueue,
        }));
        assert_1.default.equal(result, 'Hello, Temporal!');
    });
});
// @@@SNIPEND
//# sourceMappingURL=workflows.test.js.map