DO $$ BEGIN
 CREATE TYPE "public"."meal" AS ENUM('breakfast', 'brunch', 'lunch', 'dinner');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('publish', 'draft');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'member', 'guest');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."visibility" AS ENUM('public', 'private');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "recipe_categories_title_unique" UNIQUE("title"),
	CONSTRAINT "recipe_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_cuisines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "recipe_cuisines_title_unique" UNIQUE("title"),
	CONSTRAINT "recipe_cuisines_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_families" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"image" text,
	"organization_id" uuid,
	CONSTRAINT "recipe_families_title_unique" UNIQUE("title"),
	CONSTRAINT "recipe_families_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_favorites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"recipe_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"image" text,
	CONSTRAINT "recipe_organizations_title_unique" UNIQUE("title"),
	CONSTRAINT "recipe_organizations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_password_reset_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_recipe_cuisines" (
	"recipe_id" uuid NOT NULL,
	"cuisine_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_recipe_tags" (
	"recipe_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_recipes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"image" text,
	"serving_size" integer NOT NULL,
	"status" "status" DEFAULT 'draft' NOT NULL,
	"visibility" "visibility" DEFAULT 'public' NOT NULL,
	"user_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"instructions" jsonb NOT NULL,
	"ingredients" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "recipe_recipes_title_unique" UNIQUE("title"),
	CONSTRAINT "recipe_recipes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"recipe_id" uuid NOT NULL,
	"date_time" timestamp NOT NULL,
	"meal" "meal" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "recipe_tags_title_unique" UNIQUE("title"),
	CONSTRAINT "recipe_tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL GENERATED ALWAYS AS (substring("recipe_users"."email" from '^[^@]+')) STORED,
	"hashed_password" text NOT NULL,
	"image" text,
	"role" "role" DEFAULT 'member' NOT NULL,
	"organization_id" uuid,
	"family_id" uuid,
	CONSTRAINT "recipe_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_families" ADD CONSTRAINT "recipe_families_organization_id_recipe_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."recipe_organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_favorites" ADD CONSTRAINT "recipe_favorites_user_id_recipe_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."recipe_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_favorites" ADD CONSTRAINT "recipe_favorites_recipe_id_recipe_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe_recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_password_reset_tokens" ADD CONSTRAINT "recipe_password_reset_tokens_userId_recipe_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."recipe_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_recipe_cuisines" ADD CONSTRAINT "recipe_recipe_cuisines_recipe_id_recipe_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe_recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_recipe_cuisines" ADD CONSTRAINT "recipe_recipe_cuisines_cuisine_id_recipe_cuisines_id_fk" FOREIGN KEY ("cuisine_id") REFERENCES "public"."recipe_cuisines"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_recipe_tags" ADD CONSTRAINT "recipe_recipe_tags_recipe_id_recipe_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe_recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_recipe_tags" ADD CONSTRAINT "recipe_recipe_tags_tag_id_recipe_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."recipe_tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_recipes" ADD CONSTRAINT "recipe_recipes_user_id_recipe_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."recipe_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_recipes" ADD CONSTRAINT "recipe_recipes_category_id_recipe_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."recipe_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_schedules" ADD CONSTRAINT "recipe_schedules_family_id_recipe_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."recipe_families"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_schedules" ADD CONSTRAINT "recipe_schedules_recipe_id_recipe_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe_recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_sessions" ADD CONSTRAINT "recipe_sessions_userId_recipe_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."recipe_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_users" ADD CONSTRAINT "recipe_users_organization_id_recipe_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."recipe_organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_users" ADD CONSTRAINT "recipe_users_family_id_recipe_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."recipe_families"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
