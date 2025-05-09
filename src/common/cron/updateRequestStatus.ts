import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import cron from "node-cron";

cron.schedule("0 7 * * *", async () => {
    console.log("Ejecutando job para desactivar proyectos...");
    const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    try {
        await PrismaBootstrap.prisma.proformaRequest.updateMany({
            where: {
                status: "ACTIVE",
                createdAt: {
                    lt: THIRTY_DAYS_AGO,
                },
            },
            data: {
                status: "FINISHED",
            },
        });

        console.log("Job para desactivar proyectos ejecutado correctamente");
    } catch (error) {
        console.error("Error al ejecutar el job para desactivar proyectos:", error);
    }
});
