import "reflect-metadata";
import express, { Application } from "express";
import http, { Server } from "http";
import { authRoutes } from "@Auth/presentation/routes/auth.routes";
import { logger } from "@Common/logger";

export class ServerBootstrap {
    private readonly app: Application;
    private server: Server | null = null;

    constructor() {
        this.app = express();
        this.configureMiddlewares();
        this.configureRoutes();
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

    private configureMiddlewares() {
        this.app.use(express.json());
    }

    private configureRoutes() {
        this.app.use("/authenticate", authRoutes);
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
