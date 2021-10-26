package main

import (
	_ "zensho/connection"
	"zensho/controllers"
	"zensho/migration"

	"github.com/gin-gonic/gin"
)

func main() {
	migration.RunMigration()

	r := gin.Default()

	api := r.Group("/api")
	{
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "pong",
			})
		})
		api.POST("/register", controllers.Register)
		api.POST("/login", controllers.Login)
	}
	r.Run(":8080")
}
