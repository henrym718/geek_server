import "reflect-metadata";
import express, { Application } from "express";
import http, { Server } from "http";
import { logger } from "@Common/logs/logger";
import { errorHandler } from "@Common/middlewares/errorHandler";
import cors from "cors";
import { configureAuthRoutes } from "@Auth/presentation/auth.routes";
import { configureGroupRoutes } from "@Group/presentation/group.routes";
import { configureCategoryRoutes } from "@Category/presentation/category.routes";
import { configureVendorRoutes } from "@Vendor/presnetation/vendor.routes";
import { configureClientRoutes } from "@Client/presentation/client.routes";
import { configureSkillRoutes } from "modules/skill/presentation/skill.routes";
import { configureVendorProfileRoutes } from "@VendorProfile/presentation/vendor-profile.routes";
import { configureProformaRequestRoutes } from "@ProformaRequests/presnetation/proforma-requests.routes";
import { configureProformaResponseRoutes } from "modules/proforma-response/presentation/proforma-reponse.routes";
import { configureSuggestionRoutes } from "modules/suggestion/presentation/suggestion.routes";
import cookieParser from "cookie-parser";
import { Server as SocketIOServer } from "socket.io";
import { handleJoinChat } from "modules/chat/infraestructure/socket.io/socket.events";
import { configurecHATRoutes } from "modules/chat/presentation/chat.routes";
import { configureCityRouter } from "modules/city/presentation/city.routes";

export class ServerBootstrap {
    private app: Application | null = null;
    private server: Server | null = null;
    private io: SocketIOServer | null = null;

    public async initialize(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.app = express();
            this.server = http.createServer(this.app);
            this.io = new SocketIOServer(this.server, {
                cors: {
                    origin: "http://localhost:3000",
                    credentials: true,
                },
            });

            this.setupGeneralMiddlewares(this.app);
            this.setupRoutes(this.app);
            this.setupErrorHandling(this.app);
            this.setupSocketEvents(this.io);

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

    private setupGeneralMiddlewares(app: Application) {
        app.use(express.json());
        app.use(cors({ origin: "http://localhost:3000", credentials: true }));
        app.use(cookieParser());
    }

    private setupRoutes(app: Application) {
        app.use("/authenticate", configureAuthRoutes());
        app.use("/group", configureGroupRoutes());
        app.use("/category", configureCategoryRoutes());
        app.use("/vendor", configureVendorRoutes());
        app.use("/client", configureClientRoutes());
        app.use("/skill", configureSkillRoutes());
        app.use("/vendor-profile", configureVendorProfileRoutes());
        app.use("/proforma-request", configureProformaRequestRoutes());
        app.use("/proforma-response", configureProformaResponseRoutes());
        app.use("/suggestion", configureSuggestionRoutes());
        app.use("/chat", configurecHATRoutes());
        app.use("/city", configureCityRouter());
    }

    private setupErrorHandling(app: Application) {
        app.use(errorHandler);
    }

    private setupSocketEvents(io: SocketIOServer) {
        handleJoinChat(io);
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
