package models

import (
	"zensho/connection"
)

type Dataset struct {
	DatasetId    string `json:"id"`
	DatasetName  string `json:"name"`
	DatasetUrl   string `json:"datasetUrl"`
	UserName     string `json:"username"`
	UploadedDate string `json:"uploadedDate"`
	UpdatedDate  string `json:"updatedDate"`
	Description  string `json:"description"`
	ImageUrl     string `json:"iamgeSrc"`
}

func (d *Dataset) Save() error {
	statement := `INSERT INTO dataset (dataset_name, username, dataset_url, description, image_url) values($1,$2,$3)`
	_, e := connection.PostgresConnection.Exec(statement, d.DatasetName, d.UserName, d.DatasetUrl)
	if e != nil {
		// log.Fatal(e.Error())
		return e
	}
	return nil
}

func FindDatasetById(id string) *Dataset {
	statement := `SELECT "dataset_id", "dataset_name", "username", "dataset_url", "description", "image_url", "uploaded_date" 
	FROM dataset WHERE "dataset_id" = $1`
	// _, e := connection.PostgresConnection.Exec(statement, d.DatasetName, d.UserName, d.DatasetUrl)
	row := connection.PostgresConnection.QueryRow(statement, id)
	if row != nil {
		// log.Fatal(e.Error())
		dataset := &Dataset{}
		row.Scan(&dataset.DatasetId, &dataset.DatasetName, &dataset.UserName, &dataset.DatasetUrl,
			&dataset.Description, &dataset.ImageUrl, &dataset.UploadedDate)

		return dataset
	}
	return nil
}
