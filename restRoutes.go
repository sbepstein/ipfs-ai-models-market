package main

type Routes []Route

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/",
		Index,
	},
	Route{
		"CreateUser",
		"POST",
		"/createuser",
		CreateUser,
	},
	Route{
		"GetUser",
		"GET",
		"/user",
		GetUser,
	},
	Route{
		"PostModel",
		"POST",
		"/model",
		PostModel,
	},
	Route{
		"PostEncrypt",
		"POST",
		"/encrypt/{keyid}",
		PostEncrypt,
	},
	Route{
		"PostDecrypt",
		"POST",
		"/decrypt/{keyid}",
		PostDecrypt,
	},
}
