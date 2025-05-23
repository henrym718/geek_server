import fs from "fs";
import readline from "readline";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const prisma = new PrismaClient();

async function loadSuggestionsFromCSV(filename: string) {
    const csvPath = path.resolve(__dirname, filename);    
    const existFile = fs.existsSync(csvPath);

    if (!existFile) {
        console.error("No se encontró el archivo");
        return;
    }

    const rl = readline.createInterface({
        input: fs.createReadStream(csvPath),
        crlfDelay: Infinity,
    });

    let isHeader = true;
    let headers: string[] = [];

    rl.on("line", async (line: string) => {
        const row = line.trim().split("-");

        if (isHeader) {
            headers = row.map((header) => header.trim());
            isHeader = false;
            return;
        }

        const suggestion: Record<string, string> = {};
        headers.forEach((header, index) => {
            suggestion[header] = row[index].trim();
        });

        console.log(suggestion);

        try {
            // Crear o actualizar el grupo
            let group = await prisma.group.upsert({
                where: { name: suggestion.groupName },
                update: {},
                create: {
                    id: uuidv4(),
                    name: suggestion.groupName,
                },
            });

            // Crear o actualizar la categoría
            let category = await prisma.category.upsert({
                where: { name: suggestion.categoryName },
                update: { groupId: group.id },
                create: {
                    id: uuidv4(),
                    name: suggestion.categoryName,
                    groupId: group.id,
                },
            });

            // Crear o actualizar el skill
            let skill = await prisma.skill.upsert({
                where: { name: suggestion.skillName },
                update: { categoryId: category.id },
                create: {
                    id: uuidv4(),
                    name: suggestion.skillName,
                    categoryId: category.id,
                },
            });

            // Crear la sugerencia
            await prisma.suggestion.upsert({
                where: { text_skillId: { text: suggestion.suggestion, skillId: skill.id } },
                update: {},
                create: {
                    id: uuidv4(),
                    text: suggestion.suggestion,
                    skillId: skill.id,
                    categoryId: category.id,
                },
            });

            console.log(`✅ Insertado: ${suggestion.suggestion}`);
        } catch (err) {
            console.error(`❌ Error al insertar ${suggestion.suggestion}:`);
        }
    });

    rl.on("close", async () => {
        console.log("✔️  Carga completada");
        await prisma.$disconnect();
    });
}

loadSuggestionsFromCSV("suggestions.csv");
