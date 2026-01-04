import { db } from "./db";
import { predictions } from "../shared/schema";
import { desc } from "drizzle-orm";
class Storage {
    async savePrediction(prediction) {
        const [result] = await db.insert(predictions).values(prediction).returning();
        return result;
    }
    async getPredictions(limit = 50) {
        return db.select().from(predictions).orderBy(desc(predictions.createdAt)).limit(limit);
    }
}
export const storage = new Storage();
