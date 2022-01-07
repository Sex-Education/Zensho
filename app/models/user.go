package models

import (
	"zensho/connection"
)

type User struct {
	UserId         string
	UserName       string
	HashedPassword string
	Role           string
	AvatarSrc      string
}

func (u *User) Save() error {

	statement := `INSERT INTO users (username, hashedpassword, role, avatar_url) values($1, $2, $3, $4);`
	_, e := connection.PostgresConnection.Exec(statement, u.UserName, u.HashedPassword, u.Role, u.AvatarSrc)
	if e != nil {
		// log.Fatal(e.Error())
		return e
	}
	return nil
}

func GetUserByUserName(username string) *User {
	statement := `SELECT "user_id", "username", "hashedpassword", "role", "avatar_url" FROM users 
				  WHERE "username" = $1`
	row := connection.PostgresConnection.QueryRow(statement, username)
	if row != nil {
		user := &User{}
		row.Scan(&user.UserId, &user.UserName, &user.HashedPassword, &user.Role, &user.AvatarSrc)
		return user
	}
	return nil
}

func DeleteUserByUserName(username string) error {
	statement := `DELETE FROM users WHERE "username" = $1`
	_, e := connection.PostgresConnection.Exec(statement, username)
	if e != nil {
		// log.Fatal(e.Error())
		return e
	}
	return nil
}
