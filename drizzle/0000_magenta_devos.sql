CREATE TABLE "predictions" (
	"id" serial PRIMARY KEY NOT NULL,
	"sepal_length" real NOT NULL,
	"sepal_width" real NOT NULL,
	"petal_length" real NOT NULL,
	"petal_width" real NOT NULL,
	"predicted_species" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
