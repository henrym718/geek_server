import "reflect-metadata";
import express, { Application } from "express";
import http, { Server } from "http";
import { authRoutes } from "@Auth/presentation/auth.routes";
import { logger } from "@Common/logger";
import { errorLog } from "@Common/middlewares/errorLog";
import { errorHandler } from "@Common/middlewares/errorHandler";
import cors from "cors";
export class ServerBootstrap {
    private readonly app: Application;
    private server: Server | null = null;

    constructor() {
        this.app = express();
        this.setupGeneralMiddlewares();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    public async initialize(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server = http.createServer(this.app);

            this.server
                .listen(4000)
                .on("listening", () => {
                    logger.info("✅ Server is running on port 4000");
                    resolve();
                })
                .on("error", (error) => {
                    reject(error);
                });
        });
    }

    private setupGeneralMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    private setupRoutes() {
        this.app.use("/authenticate", authRoutes);
    }

    private setupErrorHandling() {
        this.app.use(errorLog);
        this.app.use(errorHandler);
    }

    public async close(): Promise<void> {
        if (this.server) {
            return new Promise((resolve) => {
                this.server?.close(() => {
                    logger.error("❌ Server is closed");
                    resolve();
                });
            });
        }
    }
}
