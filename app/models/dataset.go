package models

import (
	"database/sql"
	"log"
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
		var datasetId, datasetName, username, datasetUrl, description, imageUrl, uploadedDate sql.NullString

		err := row.Scan(&datasetId, &datasetName, &username, &datasetUrl,
			&description, &imageUrl, &uploadedDate)
		if err != nil {
			log.Fatal(err.Error())
		}
		dataset.DatasetId = datasetId.String
		dataset.DatasetName = datasetName.String
		dataset.UserName = username.String
		dataset.DatasetUrl = datasetUrl.String
		dataset.Description = description.String
		dataset.ImageUrl = imageUrl.String
		dataset.UpdatedDate = uploadedDate.String

		return dataset
	}
	return nil
}

func GetAllDataset() *[]Dataset {
	statement := `SELECT "dataset_id", "dataset_name", "username", "dataset_url", "description", "image_url", "uploaded_date" 
	FROM dataset
	ORDER BY "uploaded_date" DESC
	LIMIT 10
	;`
	// _, e := connection.PostgresConnection.Exec(statement, d.DatasetName, d.UserName, d.DatasetUrl)
	rows, err := connection.PostgresConnection.Query(statement)
	if err != nil {
		log.Print(err.Error())
		return nil
	}
	defer rows.Close()

	datasets := []Dataset{}
	for rows.Next() {
		var datasetId, datasetName, username, datasetUrl, description, imageUrl, uploadedDate sql.NullString

		dataset := &Dataset{}
		if err := rows.Scan(&datasetId, &datasetName, &username, &datasetUrl,
			&description, &imageUrl, &uploadedDate); err != nil {
			log.Print(err.Error())
		}
		dataset.DatasetId = datasetId.String
		dataset.DatasetName = datasetName.String
		dataset.UserName = username.String
		dataset.DatasetUrl = datasetUrl.String
		dataset.Description = description.String
		dataset.ImageUrl = imageUrl.String
		dataset.UpdatedDate = uploadedDate.String
		datasets = append(datasets, *dataset)
	}
	return &datasets
}
