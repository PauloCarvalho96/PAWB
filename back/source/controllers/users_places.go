package controllers

import (
	"api/model"
	"api/services"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddPlaceToUser(c *gin.Context) {
	var user model.Users
	var place model.Places

	id := c.Param("id")
	uname, exists := c.Get("username")

	services.Db.Where("username = ?", uname).First(&user)
	if exists == false {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "User not found!"})
		return
	}

	services.Db.First(&place, id)
	if place.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "Place not found!"})
		return
	}

	var alreadyExists model.Places
	services.Db.Model(&user).Association("Places").Find(&place)

	if alreadyExists.ID == 0 {
		services.Db.Model(&user).Association("Places").Append(&place)
		services.Db.Save(&user)
		fmt.Println("ADDED: ")
	}

	fmt.Println("EXISTS: ", alreadyExists.ID)

	places := []model.Places{}
	services.Db.Model(&user).Association("Places").Find(&places)

	c.JSON(http.StatusOK, gin.H{"status": http.StatusAccepted, "data": places})
}

func RemovePlaceFromUser(c *gin.Context) {
	var user model.Users
	var place model.Places

	id := c.Param("id")
	uname, exists := c.Get("username")

	services.Db.Where("username = ?", uname).First(&user)
	if exists == false {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "User not found!"})
		return
	}

	services.Db.First(&place, id)
	if place.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "Place not found!"})
		return
	}

	var alreadyExists model.Places
	services.Db.Model(&user).Association("Places").Find(&place)

	if alreadyExists.ID != 0 {
		services.Db.Model(&user).Association("Places").Delete(&place)
		services.Db.Save(&user)
	}

	places := []model.Places{}
	services.Db.Model(&user).Association("Places").Find(&places)

	c.JSON(http.StatusOK, gin.H{"status": http.StatusAccepted, "data": places})
}

func AddPlace(user *model.Users, place *model.Places) {
	var exists model.Places
	services.Db.Model(&user).Association("Places").Find(&exists)

	if exists.ID != 0 {
		services.Db.Model(&user).Association("Places").Append(&place)
		services.Db.Save(&user)
	}
}

func RemovePlace(user *model.Users, place *model.Places) {
	var exists model.Places
	services.Db.Model(&user).Association("Places").Find(&exists)

	if exists.ID != 0 {
		services.Db.Model(&user).Association("Places").Delete(&place)
		services.Db.Save(&user)
	}
}
