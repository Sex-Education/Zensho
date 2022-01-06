package connection

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var PostgresConnection *sql.DB

func init() {
	var conninfo string = os.Getenv("DATABASE_URL")
	if len(conninfo) == 0 {
		log.Println("No connection string is set")
		return
	}

	var err error
	PostgresConnection, err = sql.Open("postgres", conninfo)
	if err != nil {
		log.Print(err.Error())
		return
	}

	err = PostgresConnection.Ping()
	if err != nil {
		panic(err)
	}

	log.Println("Connected to database")
}
