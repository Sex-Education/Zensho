package controllers

import (
	"net/http"
	"strconv"
	"zensho/models"

	"github.com/gin-gonic/gin"
)

func GetComment(c *gin.Context) {
	datasetId := c.Param("id")

	comments, err := models.GetAllCommentInPost(datasetId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": comments,
	})
}

func CommentOnPost(c *gin.Context) {
	username := c.PostForm("username")
	postId, err := strconv.Atoi(c.PostForm("dataset_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	commendBody := c.PostForm("comment_body")

	comment := &models.Comment{
		Username:    username,
		DatasetId:   postId,
		CommentBody: commendBody,
	}

	err = comment.Save()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"mesasge": "success",
	})
}
