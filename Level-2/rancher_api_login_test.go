package main_test

import (
	"bytes"
	"crypto/tls"
	"fmt"
	"net/http"

	g "github.com/onsi/ginkgo/v2"
	o "github.com/onsi/gomega"
)

var _ = g.Describe("Rancher Login Test", func() {
	g.It("Test rancher api login", func() {
		ip := "127.0.0.1"
		rancherTestPass := "TestPassword@123"

		reqData := []byte(fmt.Sprintf(`{"username": "admin", "password": "%s", "responseType":"cookie"}`, rancherTestPass))

		// Create a custom HTTP client with insecure transport
		httpClient := &http.Client{
			Transport: &http.Transport{
				TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
			},
		}

		// Create a new POST request
		req, err := http.NewRequest("POST", fmt.Sprintf("https://%s/v3-public/localProviders/local?action=login", ip), bytes.NewBuffer(reqData))
		o.Expect(err).NotTo(o.HaveOccurred())

		// Set headers
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("Accept", "application/json")

		// Send the request via the HTTP client
		resp, err := httpClient.Do(req)
		o.Expect(err).NotTo(o.HaveOccurred())
		defer resp.Body.Close()

		// Assert expected response
		o.Expect(resp.StatusCode).To(o.Equal(http.StatusOK))
	})
})
