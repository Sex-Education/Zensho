package models

import (
	"database/sql"
	"zensho/connection"
)

type Comment struct {
	AvatarSrc   string `json:"avatarSrc"`
	Username    string `json:"username"`
	CommentBody string `json:"commentBody"`
	DatasetId   int    `json:"-"`
	CreatedDate string `json:"createdDate"`
}

func (c *Comment) Save() error {
	statement := `INSERT INTO comments ("username", "comment_body", "dataset_id") VALUES($1,$2,$3);`

	_, err := connection.PostgresConnection.Exec(statement, c.Username, c.CommentBody, c.DatasetId)
	if err != nil {
		return err
	}
	return nil
}

func GetAllCommentInPost(datasetId string) ([]Comment, error) {
	statement := `SELECT comments."username", "comment_body", "created_date", users."avatar_url"
	FROM comments
	LEFT JOIN users ON comments.username = users.username
	WHERE dataset_id = $1
	`
	rows, err := connection.PostgresConnection.Query(statement, datasetId)
	if err != nil {
		return nil, err
	}
	comments := []Comment{}
	defer rows.Close()

	for rows.Next() {
		var username, commendBody, createdDate, avatarUrl sql.NullString
		if err := rows.Scan(&username, &commendBody, &createdDate, &avatarUrl); err != nil {
			return nil, err
		}
		comment := &Comment{
			Username:    username.String,
			CommentBody: commendBody.String,
			CreatedDate: createdDate.String,
			AvatarSrc:   avatarUrl.String,
		}
		comments = append(comments, *comment)
	}
	return comments, nil
}
