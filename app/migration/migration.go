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
		role VARCHAR(50) DEFAULT 'user' NOT NULL,
		email VARCHAR(100),
		avatar_url VARCHAR(1000)
		);`
	// statement = `DROP TABLE dataset;`
	_, e := connection.PostgresConnection.Exec(statement)
	if e != nil {
		log.Print(e.Error())
		return
	}

	statement = `CREATE TABLE IF NOT EXISTS dataset (
		dataset_id SERIAL PRIMARY KEY,
		dataset_name VARCHAR(100) NOT NULL,
		dataset_url VARCHAR(1000) NOT NULL,
		username VARCHAR(20) NOT NULL,
		uploaded_date DATE DEFAULT NOW(),
		updated_date DATE DEFAULT NOW(),
		rating FLOAT(3),
		description VARCHAR(1000),
		image_url VARCHAR(100)
	);`
	_, e = connection.PostgresConnection.Exec(statement)
	if e != nil {
		log.Print(e.Error())
		return
	}

	statement = `CREATE TABLE IF NOT EXISTS comments (
		comment_id SERIAL PRIMARY KEY,
		dataset_id INT NOT NULL,
		username VARCHAR(20) NOT NULL,
		comment_body VARCHAR(1000) NOT NULL,
		created_date DATE DEFAULT NOW()
	);`
	_, e = connection.PostgresConnection.Exec(statement)
	if e != nil {
		log.Print(e.Error())
		return
	}

	statement = `CREATE INDEX IF NOT EXISTS idx_on_dataset ON comments (dataset_id, created_date);`
	_, e = connection.PostgresConnection.Exec(statement)
	if e != nil {
		log.Print(e.Error())
		return
	}
}

func ResetDatabase() {
	statement := `DROP TABLE users;`
	_, e := connection.PostgresConnection.Exec(statement)
	if e != nil {
		log.Print(e.Error())
		return
	}

	statement = `DROP TABLE dataset;`
	_, e = connection.PostgresConnection.Exec(statement)
	if e != nil {
		log.Print(e.Error())
		return
	}

	statement = `DROP TABLE comments;`
	_, e = connection.PostgresConnection.Exec(statement)
	if e != nil {
		log.Print(e.Error())
		return
	}

	RunMigration()
}
