package main

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"time"
)

type ModelModel struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	IPFS        string `json:"ipfs"` //IPFS hash
	Accuracy    string `json:"accuracy"`
}
type UserModel struct {
	Username    string       `json:"username"`
	Description string       `json:"description"`
	Github      string       `json:"github"`
	Twitter     string       `json:"twitter"`
	Password    string       `json:"password"` //to encrypt and decrypt the RSA Keys
	PrivK       string       `json:"privK"`    //path of the PrivK file
	PubK        string       `json:"pubK"`     //path of the PubK file
	Date        time.Time    `json:"date"`
	Models      []ModelModel `json:"models"`
}

func readUser() (UserModel, error) {
	path := keysDir + "/user.txt"
	var user UserModel

	file, err := ioutil.ReadFile(path)
	if err != nil {
		return user, errors.New("no user")
	}
	content := string(file)
	json.Unmarshal([]byte(content), &user)

	return user, nil
}

func saveUser(user UserModel) {
	jsonUser, err := json.Marshal(user)
	check(err)
	err = ioutil.WriteFile(keysDir+"/user.txt", jsonUser, 0644)
	check(err)
}
