package cloudstorage

import (
	"context"
	"io"
	"log"
	"mime/multipart"

	"path/filepath"

	"cloud.google.com/go/storage"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"google.golang.org/api/option"
)

var Bucket *storage.BucketHandle

func init() {

	ctx := context.Background()
	client, err := storage.NewClient(ctx, option.WithCredentialsFile("cloudstorage/account.json"))
	if err != nil {
		// TODO: Handle error.
	}

	Bucket = client.Bucket("zensho-335305.appspot.com")

	if err != nil {
		log.Fatalln(err)
	}
}

func Upload(file multipart.File, fileName string, c *gin.Context) (string, error) {
	extension := filepath.Ext(fileName)
	newFileName := uuid.New().String() + extension

	obj := Bucket.Object(newFileName)
	w := obj.NewWriter(c)

	if _, err := io.Copy(w, file); err != nil {
		return "", err
	}

	if err := w.Close(); err != nil {
		return "", err
	}

	return "http://storage.googleapis.com/zensho-335305.appspot.com/" + newFileName, nil
}
