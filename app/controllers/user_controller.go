package controllers

import (
	"crypto/sha256"
	"encoding/hex"
	"net/http"
	"time"

	"zensho/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

const salt = "123456"

var hmacSampleSecret []byte

func hashPassword(password string) string {
	hashedPassword := sha256.Sum256([]byte(password + salt))
	return hex.EncodeToString(hashedPassword[:])
}

func Register(c *gin.Context) {
	username := c.PostForm("username")
	password := c.PostForm("password")
	hashedPassword := hashPassword(password)

	user := &models.User{}
	user.UserName = username
	user.HashedPassword = hashedPassword
	user.Role = "user"

	err := user.Save()
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"success": true,
		"message": "Register success!",
	})
}

func Login(c *gin.Context) {
	username := c.PostForm("username")
	password := c.PostForm("password")

	hashedPassword := hashPassword(password)

	user := models.GetUserByUserName(username)
	if user.HashedPassword != hashedPassword {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "Invalid!",
		})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"usernamme": user.UserName,
		"role":      user.Role,
		"exp":       time.Now().Add(1 * time.Hour).Unix(), //1 hour
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString(hmacSampleSecret)

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"token":   tokenString,
	})
	// fmt.Println(tokenString, err)

}

func RemoveUser(c *gin.Context) {
	username := c.PostForm("username")

	e := models.DeleteUserByUserName(username)
	if e != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": e.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Success!",
	})
}
