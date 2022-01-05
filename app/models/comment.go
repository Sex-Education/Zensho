package models

type Comment struct {
	AvatarSrc string `json:"avatarSrc"`
	Username  string `json:"username"`
	Body      string `json:"commentBody"`
}
