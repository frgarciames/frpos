CREATE TABLE `bills` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`state` enum('open','printed','closed'),
	`deleted` boolean DEFAULT false,
	`z_report_id` bigint NOT NULL,
	`table_id` bigint,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`created_by` varchar(256) NOT NULL,
	`updated_by` varchar(256),
	CONSTRAINT `bills_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bills_products` (
	`product_id` bigint NOT NULL,
	`bill_id` bigint NOT NULL,
	`quantity` int NOT NULL,
	`overrides` json,
	CONSTRAINT `bills_products_bill_id_product_id` PRIMARY KEY(`bill_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`organization` varchar(256) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`created_by` varchar(256) NOT NULL,
	`updated_by` varchar(256),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`image` varchar(256),
	`price` float,
	`stock` int,
	`category_id` bigint,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`created_by` varchar(256) NOT NULL,
	`updated_by` varchar(256),
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tables` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`zone_id` bigint NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`created_by` varchar(256) NOT NULL,
	`updated_by` varchar(256),
	CONSTRAINT `tables_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `z_reports` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`organization` varchar(256) NOT NULL,
	`date_start` timestamp NOT NULL DEFAULT (now()),
	`date_end` timestamp,
	CONSTRAINT `z_reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `zones` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`organization` varchar(256) NOT NULL,
	`name` varchar(256) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`created_by` varchar(256) NOT NULL,
	`updated_by` varchar(256),
	CONSTRAINT `zones_id` PRIMARY KEY(`id`)
);
