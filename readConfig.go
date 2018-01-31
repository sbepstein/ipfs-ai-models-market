package main

import (
	"encoding/json"
	"io/ioutil"
)

//Config reads the config
type Config struct {
	APIPort string `json:"apiport"`
	WebPort string `json:"webport"`
}

var config Config

func readConfig(path string) {
	file, err := ioutil.ReadFile(path)
	check(err)
	content := string(file)
	json.Unmarshal([]byte(content), &config)
}
