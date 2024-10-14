DO $$ BEGIN
 CREATE TYPE "public"."measurement" AS ENUM('imperial', 'metric');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."plan" AS ENUM('free', 'premium', 'custom');
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
 CREATE TYPE "public"."theme" AS ENUM('light', 'dark', 'system');
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
 CREATE TYPE "public"."visibility" AS ENUM('public', 'private');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."meal" AS ENUM('breakfast', 'lunch', 'dinner');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"role" "role" DEFAULT 'member' NOT NULL,
	"plan" "plan" DEFAULT 'free' NOT NULL,
	"theme" "theme" DEFAULT 'system' NOT NULL,
	"measurement" "measurement" DEFAULT 'imperial' NOT NULL,
	"default_serving_size" integer DEFAULT 4 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
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
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
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
CREATE TABLE IF NOT EXISTS "recipe_ingredient_groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipe_id" uuid NOT NULL,
	"title" text NOT NULL,
	"step" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_instruction_groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipe_id" uuid NOT NULL,
	"title" text NOT NULL,
	"step" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"family_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_password_reset_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_recipe_cuisines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipe_id" uuid NOT NULL,
	"cuisine_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_recipe_ingredients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipe_id" uuid NOT NULL,
	"group_id" uuid,
	"amount" integer,
	"unit" text,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_recipe_instructions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipe_id" uuid NOT NULL,
	"group_id" uuid,
	"step" integer NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_recipe_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipe_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_recipes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"prep_time" text,
	"cook_time" text,
	"total_time" text,
	"serving_size" integer NOT NULL,
	"status" "status" DEFAULT 'draft' NOT NULL,
	"visibility" "visibility" DEFAULT 'public' NOT NULL,
	"user_id" uuid,
	"category_id" uuid NOT NULL,
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
	"meal" "meal" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
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
	"hashed_password" text DEFAULT 'password' NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "recipe_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_accounts" ADD CONSTRAINT "recipe_accounts_userId_recipe_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."recipe_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_favorites" ADD CONSTRAINT "recipe_favorites_user_id_recipe_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."recipe_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_favorites" ADD CONSTRAINT "recipe_favorites_recipe_id_recipe_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe_recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_ingredient_groups" ADD CONSTRAINT "recipe_ingredient_groups_recipe_id_recipe_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe_recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_instruction_groups" ADD CONSTRAINT "recipe_instruction_groups_recipe_id_recipe_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe_recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_memberships" ADD CONSTRAINT "recipe_memberships_user_id_recipe_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."recipe_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_memberships" ADD CONSTRAINT "recipe_memberships_family_id_recipe_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."recipe_families"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "recipe_recipe_cuisines" ADD CONSTRAINT "recipe_recipe_cuisines_recipe_id_recipe_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe_recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_recipe_cuisines" ADD CONSTRAINT "recipe_recipe_cuisines_cuisine_id_recipe_cuisines_id_fk" FOREIGN KEY ("cuisine_id") REFERENCES "public"."recipe_cuisines"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_recipe_ingredients" ADD CONSTRAINT "recipe_recipe_ingredients_recipe_id_recipe_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe_recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_recipe_ingredients" ADD CONSTRAINT "recipe_recipe_ingredients_group_id_recipe_ingredient_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."recipe_ingredient_groups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_recipe_instructions" ADD CONSTRAINT "recipe_recipe_instructions_recipe_id_recipe_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe_recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_recipe_instructions" ADD CONSTRAINT "recipe_recipe_instructions_group_id_recipe_instruction_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."recipe_instruction_groups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_recipe_tags" ADD CONSTRAINT "recipe_recipe_tags_recipe_id_recipe_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe_recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_recipe_tags" ADD CONSTRAINT "recipe_recipe_tags_tag_id_recipe_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."recipe_tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_recipes" ADD CONSTRAINT "recipe_recipes_user_id_recipe_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."recipe_users"("id") ON DELETE set null ON UPDATE no action;
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
 ALTER TABLE "recipe_schedules" ADD CONSTRAINT "recipe_schedules_family_id_recipe_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."recipe_families"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_schedules" ADD CONSTRAINT "recipe_schedules_recipe_id_recipe_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe_recipes"("id") ON DELETE cascade ON UPDATE no action;
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
CREATE UNIQUE INDEX IF NOT EXISTS "unique_user_recipe" ON "recipe_favorites" USING btree ("user_id","recipe_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uniqueUserFamily" ON "recipe_memberships" USING btree ("user_id","family_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_schedule" ON "recipe_schedules" USING btree ("family_id","recipe_id","date_time");