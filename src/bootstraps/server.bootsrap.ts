import "reflect-metadata";
import express, { Application } from "express";
import http, { Server } from "http";
import { logger } from "@Common/logs/logger";
import { errorHandler } from "@Common/middlewares/errorHandler";
import cors from "cors";
import { authRoutes } from "@Auth/presentation/auth.routes";
import { groupRoutes } from "@Group/presentation/group.routes";
import { categoryRoutes } from "@Category/presentation/category.routes";
import { vendorRoutes } from "@Vendor/presnetation/vendor.routes";
import { clientRoutes } from "@Client/presentation/client.routes";
import { skillRoutes } from "modules/skill/presentation/skill.routes";
import { profileVendorRoutes } from "@ProfileVendor/presentation/profile-vendor.routes";

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
        this.app.use("/group", groupRoutes);
        this.app.use("/category", categoryRoutes);
        this.app.use("/vendor", vendorRoutes);
        this.app.use("/client", clientRoutes);
        this.app.use("/skill", skillRoutes);
        this.app.use("/profile-vendor", profileVendorRoutes);
    }

    private setupErrorHandling() {
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
