package main

import (
	_ "zensho/connection"
	"zensho/controllers"
	"zensho/migration"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

func main() {
	migration.RunMigration()
	r := gin.Default()

	corConfig := cors.DefaultConfig()
	corConfig.AllowOrigins = []string{"http://localhost:3000"}
	corConfig.AllowCredentials = true

	r.Use(cors.New(corConfig))

	api := r.Group("/api")
	{
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "pong",
			})
		})
		api.GET("/reset_database", func(c *gin.Context) {
			migration.ResetDatabase()
			c.JSON(200, gin.H{
				"message": "ok",
			})
		})
		api.POST("/register", controllers.Register)
		api.POST("/login", controllers.Login)
		api.POST("/remove-user", controllers.RemoveUser)
		api.POST("/upload", controllers.UploadDataset)

		api.GET("/comment/:id", controllers.GetComment)
		api.POST("/comment", controllers.CommentOnPost)

		api.GET("/dataset/:id", controllers.GetDatasetById)
		api.GET("/dataset", controllers.GetAllDataset)

	}
	r.Run(":8080")
}
