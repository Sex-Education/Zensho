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
		api.POST("/register", controllers.Register)
		api.POST("/login", controllers.Login)
		api.POST("/remove-user", controllers.RemoveUser)
		api.POST("/upload", controllers.UploadDataset)

		api.GET("/comment", controllers.GetComment)

	}
	r.Run(":8080")
}
