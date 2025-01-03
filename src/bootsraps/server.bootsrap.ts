import express, { Application } from "express";
import http, { Server } from "http";

export class ServerBootstrap {
    private readonly app: Application;
    private server: Server | null = null;

    constructor() {
        this.app = express();
    }

    public async initialize(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server = http.createServer(this.app);

            this.server
                .listen(4000)
                .on("listening", () => {
                    console.log("Server is running on port 4000");
                    resolve();
                })
                .on("error", (error) => {
                    reject(error);
                });
        });
    }

    public async close(): Promise<void> {
        if (this.server) {
            return new Promise((resolve) => {
                this.server?.close(() => {
                    console.log("Server is closed");
                    resolve();
                });
            });
        }
    }
}
