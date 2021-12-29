package migration

import (
	"log"
	"zensho/connection"
)

func RunMigration() {
	statement := `CREATE TABLE IF NOT EXISTS users (
		user_id SERIAL PRIMARY KEY,
		username VARCHAR(20) NOT NULL UNIQUE,
		hashedpassword VARCHAR(100) NOT NULL,
		role VARCHAR(50) DEFAULT 'user' NOT NULL
		);`
	// statement = `DROP TABLE dataset;`
	_, e := connection.PostgresConnection.Exec(statement)
	if e != nil {
		log.Fatal(e.Error())
	}

	statement = `CREATE TABLE IF NOT EXISTS dataset (
		dataset_id SERIAL PRIMARY KEY,
		dataset_name VARCHAR(100) NOT NULL,
		dataset_url VARCHAR(1000) NOT NULL,
		username VARCHAR(20) NOT NULL,
		uploaded_date DATE DEFAULT NOW(),
		updated_date DATE DEFAULT NOW(),
		rating FLOAT(3)
	);`
	_, e = connection.PostgresConnection.Exec(statement)
	if e != nil {
		log.Fatal(e.Error())
	}
}
