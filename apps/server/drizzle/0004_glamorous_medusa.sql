CREATE TABLE `bills_snapshots` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`bill_id` bigint NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`data` json NOT NULL,
	CONSTRAINT `bills_snapshots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `bills` ADD `payment_method` enum('cash','card') NOT NULL;