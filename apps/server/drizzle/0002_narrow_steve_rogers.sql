ALTER TABLE `products` MODIFY COLUMN `name` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `category_id` bigint NOT NULL;