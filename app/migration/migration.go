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
	// statement := `DROP TABLE users;`
	_, e := connection.PostgresConnection.Exec(statement)
	if e != nil {
		log.Fatal(e.Error())
	}
}
