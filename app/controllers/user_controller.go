package controllers

import (
	"crypto/sha256"
	"encoding/hex"
	"math/rand"
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

func avatarUrls() []string {
	return []string{
		"https://gravatar.com/avatar/196584bfb0fb18d714613e9975675417?s=400&d=robohash&r=x",
		"https://gravatar.com/avatar/268a7eacd231ad0f66b02d5470bf3563?s=400&d=robohash&r=x",
		"https://gravatar.com/avatar/f20ce2fd43d380964974d70f7c8c0340?s=400&d=robohash&r=x",
		"https://gravatar.com/avatar/adf6ac998ecd68651a0af35be0871a47?s=400&d=robohash&r=x",
		"https://gravatar.com/avatar/c13cb66b30f55cc5dd321e5103b0373d?s=400&d=robohash&r=x",
		"https://gravatar.com/avatar/acb822ef577ad926587ba1d8cf4fddfc?s=400&d=robohash&r=x",
		"https://robohash.org/51a247001d85e415773daa3f44330e8f?set=set4&bgset=&size=400x400",
		"https://api.adorable.io/avatars/400/298bb33f5bd2b65fa05de77fd82b3ee2.png",
	}
}

func getRandomAvatarUrl() string {
	urls := avatarUrls()
	return urls[rand.Intn(len(avatarUrls()))]
}

func Register(c *gin.Context) {
	username := c.PostForm("username")
	password := c.PostForm("password")
	hashedPassword := hashPassword(password)

	user := &models.User{}
	user.UserName = username
	user.HashedPassword = hashedPassword
	user.Role = "user"
	user.AvatarSrc = getRandomAvatarUrl()

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

	// c.SetCookie("token", tokenString, 3600, "/", "https://zensho.herokuapp.com/", false, true)
	// c.SetCookie("username", user.UserName, 3600, "/", "https://zensho.herokuapp.com/", false, false)
	// c.SetCookie("avatar_url", user.AvatarSrc, 3600, "/", "https://zensho.herokuapp.com/", false, false)

	// c.SetCookie("token", tokenString, 3600, "/", "http://localhost:3000/", false, true)
	// c.SetCookie("username", user.UserName, 3600, "/", "http://localhost:3000/", false, false)
	// c.SetCookie("avatar_url", user.AvatarSrc, 3600, "/", "http://localhost:3000/", false, false)
	c.JSON(http.StatusOK, gin.H{
		"success":    true,
		"token":      tokenString,
		"avatar_url": user.AvatarSrc,
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
