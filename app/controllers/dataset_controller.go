package controllers

import (
	"net/http"
	"zensho/cloudstorage"
	"zensho/models"

	"github.com/gin-gonic/gin"
)

func UploadDataset(c *gin.Context) {
	file, err := c.FormFile("file")

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	blobFile, err := file.Open()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	datasetName := c.PostForm("dataset_name")
	username := c.PostForm("username")

	dataset := models.Dataset{}
	dataset.DatasetName = datasetName
	dataset.UserName = username
	dataset.DatasetUrl, err = cloudstorage.Upload(blobFile, file.Filename, c)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	err = dataset.Save()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}