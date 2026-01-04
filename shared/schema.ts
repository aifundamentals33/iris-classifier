import { pgTable, text, serial, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const predictions = pgTable("predictions", {
  id: serial("id").primaryKey(),
  sepalLength: real("sepal_length").notNull(),
  sepalWidth: real("sepal_width").notNull(),
  petalLength: real("petal_length").notNull(),
  petalWidth: real("petal_width").notNull(),
  predictedSpecies: text("predicted_species").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPredictionSchema = createInsertSchema(predictions).omit({
  id: true,
  createdAt: true,
});

export type InsertPrediction = z.infer<typeof insertPredictionSchema>;
export type Prediction = typeof predictions.$inferSelect;
