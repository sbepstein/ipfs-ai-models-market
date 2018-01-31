package main

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha1"
	"crypto/x509"
	"encoding/asn1"
	"encoding/pem"
	"errors"
	"fmt"
	"io/ioutil"
	"os"

	"github.com/fatih/color"
)

func Encrypt(encryptData EncryptData) EncryptData {
	user, err := readUser()
	check(err)
	pubK, err := openPublicPEMKey(keysDir + "/" + user.PubK)
	check(err)
	out, err := rsa.EncryptOAEP(sha1.New(), rand.Reader, &pubK, []byte(encryptData.M), []byte("orders"))
	check(err)
	fmt.Println(string(out))
	encryptData.C = out
	return encryptData
}

func Decrypt(encryptData EncryptData) EncryptData {
	user, err := readUser()
	check(err)
	privK, err := openPEMKey(keysDir + "/" + user.PrivK)
	check(err)
	out, err := rsa.DecryptOAEP(sha1.New(), rand.Reader, privK, []byte(encryptData.C), []byte("orders"))
	check(err)
	fmt.Println(string(out))
	encryptData.M = string(out)
	return encryptData
}

func ExportRsaPrivateKeyAsPemStr(privkey *rsa.PrivateKey) string {
	privkey_bytes := x509.MarshalPKCS1PrivateKey(privkey)
	privkey_pem := pem.EncodeToMemory(
		&pem.Block{
			Type:  "RSA PRIVATE KEY",
			Bytes: privkey_bytes,
		},
	)
	return string(privkey_pem)
}

func ParseRsaPrivateKeyFromPemStr(privPEM string) (*rsa.PrivateKey, error) {
	block, _ := pem.Decode([]byte(privPEM))
	if block == nil {
		return nil, errors.New("failed to parse PEM block containing the key")
	}
	priv, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return nil, err
	}
	return priv, nil
}

func ExportRsaPublicKeyAsPemStr(pubkey rsa.PublicKey) (string, error) {
	asn1Bytes, err := asn1.Marshal(pubkey)
	check(err)
	pubkey_pem := pem.EncodeToMemory(
		&pem.Block{
			Type:  "PUBLIC KEY",
			Bytes: asn1Bytes,
		},
	)
	color.Red("pubkey_pem")
	fmt.Println(pubkey_pem)
	return string(pubkey_pem), nil
}

func ParseRsaPublicKeyFromPemStr(pubPEM string) (pub rsa.PublicKey, err error) {
	pemBlock, _ := pem.Decode([]byte(pubPEM))
	_, err = asn1.Unmarshal(pemBlock.Bytes, &pub)
	return
}

func savePEMKey(fileName string, key *rsa.PrivateKey) {
	outFile, err := os.Create(fileName)
	check(err)
	defer outFile.Close()

	var privateKey = &pem.Block{
		Type:  "PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(key),
	}

	err = pem.Encode(outFile, privateKey)
	check(err)
}
func savePublicPEMKey(fileName string, pubkey rsa.PublicKey) {
	asn1Bytes, err := asn1.Marshal(pubkey)
	check(err)

	var pemkey = &pem.Block{
		Type:  "PUBLIC KEY",
		Bytes: asn1Bytes,
	}

	pemfile, err := os.Create(fileName)
	check(err)
	defer pemfile.Close()

	err = pem.Encode(pemfile, pemkey)
	check(err)
}
func openPEMKey(path string) (key *rsa.PrivateKey, err error) {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		fmt.Print(err)
	}
	key, err = ParseRsaPrivateKeyFromPemStr(string(b))
	return
}
func openPublicPEMKey(path string) (key rsa.PublicKey, err error) {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		fmt.Print(err)
	}
	key, err = ParseRsaPublicKeyFromPemStr(string(b))
	return
}
