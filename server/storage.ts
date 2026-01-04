import { db } from "./db";
import { predictions, type InsertPrediction, type Prediction } from "../shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  savePrediction(prediction: InsertPrediction): Promise<Prediction>;
  getPredictions(limit?: number): Promise<Prediction[]>;
}

class Storage implements IStorage {
  async savePrediction(prediction: InsertPrediction): Promise<Prediction> {
    const [result] = await db.insert(predictions).values(prediction).returning();
    return result;
  }

  async getPredictions(limit: number = 50): Promise<Prediction[]> {
    return db.select().from(predictions).orderBy(desc(predictions.createdAt)).limit(limit);
  }
}

export const storage = new Storage();
