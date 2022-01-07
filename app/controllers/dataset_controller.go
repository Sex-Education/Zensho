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
	description := c.PostForm("description")

	dataset := models.Dataset{}
	dataset.DatasetName = datasetName
	dataset.UserName = username
	dataset.Description = description
	dataset.ImageUrl = "https://"
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

func GetDatasetById(c *gin.Context) {
	id := c.Param("id")

	if len(id) == 0 {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": "id must be set",
		})
		return
	}

	dataset := models.FindDatasetById(id)
	if dataset == nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": "dataset not found",
			"data":    nil,
		})
		return
	}

	// dataJson, _ := json.Marshal(dataset)

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    dataset,
	})
}

func GetAllDataset(c *gin.Context) {
	datasetName := c.Query("name")
	page := c.Query("page")
	limit := c.Query("limit")

	filters := map[string]string{
		"datasetName": datasetName,
		"page":        page,
		"limit":       limit,
	}
	datasets := models.GetAllDataset(filters)
	if datasets == nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": "dataset not found",
			"data":    nil,
		})
		return
	}

	// dataJson, _ := json.Marshal(dataset)

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    datasets,
	})
}
