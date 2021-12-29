package models

import "zensho/connection"

type Dataset struct {
	DatasetId    string
	DatasetName  string
	DatasetUrl   string
	UserName     string
	UploadedDate string
	UpdatedDate  string
}

func (d *Dataset) Save() error {
	statement := `INSERT INTO dataset (dataset_name, username, dataset_url) values($1,$2,$3)`
	_, e := connection.PostgresConnection.Exec(statement, d.DatasetName, d.UserName, d.DatasetUrl)
	if e != nil {
		// log.Fatal(e.Error())
		return e
	}
	return nil
}
