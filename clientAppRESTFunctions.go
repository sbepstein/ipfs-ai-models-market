package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "clientApp")
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var user UserModel
	err := decoder.Decode(&user)
	check(err)
	defer r.Body.Close()

	fmt.Println(user)
	saveUser(user)

	jResp, err := json.Marshal(user)
	check(err)
	fmt.Fprintln(w, string(jResp))
}
func GetUser(w http.ResponseWriter, r *http.Request) {
	user, err := readUser()
	if err != nil {
		http.Error(w, "user not exist", http.StatusNotFound)
		return
	}
	jResp, err := json.Marshal(user)
	check(err)
	fmt.Fprintln(w, string(jResp))
}

type EncryptData struct {
	M string `json:"m"`
	C []byte `json:"c"`
}

func PostEncrypt(w http.ResponseWriter, r *http.Request) {
	//get ciphertext from POST json
	decoder := json.NewDecoder(r.Body)
	var encryptData EncryptData
	err := decoder.Decode(&encryptData)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	encryptData = Encrypt(encryptData)

	jResp, err := json.Marshal(encryptData)
	check(err)
	fmt.Fprintln(w, string(jResp))
}
func PostDecrypt(w http.ResponseWriter, r *http.Request) {
	//get ciphertext from POST json
	decoder := json.NewDecoder(r.Body)
	var encryptData EncryptData
	err := decoder.Decode(&encryptData)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	encryptData = Decrypt(encryptData)

	jResp, err := json.Marshal(encryptData)
	check(err)
	fmt.Fprintln(w, string(jResp))
}
