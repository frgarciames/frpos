ALTER TABLE `bills` MODIFY COLUMN `state` enum('open','printed','closed') DEFAULT 'open';--> statement-breakpoint
ALTER TABLE `bills_products` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `bills_products` ADD `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `bills_products` ADD `created_by` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `bills_products` ADD `updated_by` varchar(256);