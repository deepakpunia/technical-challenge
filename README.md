## Prerequisites

Ensure the following prerequisites are met before running the tests:

- Ubuntu 24 version
- Executable permissions for shell scripts (`install_rancher_ui.sh`)

Ref command:
```bash
$ chmod +x install_rancher_ui.sh
$ sh install_rancher_ui.sh
[sudo] password for deep:
....<snip>...
docker-ce is already the newest version (5:26.1.4-1~ubuntu.24.04~noble).
docker-ce-cli is already the newest version (5:26.1.4-1~ubuntu.24.04~noble).
containerd.io is already the newest version (1.6.33-1).
0 upgraded, 0 newly installed, 0 to remove and 36 not upgraded.
---------------------------------------------
Performing Rancher single node docker install
0f4bdc5390f103cc41783af55dc380ca3c936385a7a7900609c9309289d874d4
Done single node install of Rancher for UI

$ sudo docker ps -a
CONTAINER ID   IMAGE                    COMMAND           CREATED          STATUS          PORTS                                                                      NAMES
0f4bdc5390f1   rancher/rancher:stable   "entrypoint.sh"   13 seconds ago   Up 12 seconds   0.0.0.0:80->80/tcp, :::80->80/tcp, 0.0.0.0:443->443/tcp, :::443->443/tcp   rancher_ui
```
#### Note : ---PREREQUISITES--- need to run before executing below Test

## Running Tests

### Level 1 : UI Automation using Cypress framework
#### Cover these 3 cases in below cypress automated script.
##### - Login into Rancher web page
##### - Check the main web page opens up.
##### - Check the main web page title is correct
```bash
$ npm install cypress --save-dev

added 173 packages in 43s

39 packages are looking for funding
  run `npm fund` for details

$ cd Level-1/
$ npx cypress run
```

Attach screenshot: 'Cypress run.png'
![alt text](https://github.com/deepakpunia/technical-challenge/blob/main/Cypress_run.png?raw=true)

### Level 2 : API Automation using Go lang using Ginkgo & Gomega framework
#### Test to cover.
##### - Login into Rancher

```bash
$ cd Level-2/
$ ginkgo bootstrap
Generating ginkgo test suite bootstrap for main in:
	Level_2_suite_test.go

$ go test
Running Suite: Level2 Suite - /home/deep/technical-challenge/Level-2
====================================================================
Random Seed: 1718269464

Will run 1 of 1 specs
\u2022

Ran 1 of 1 Specs in 0.077 seconds
SUCCESS! -- 1 Passed | 0 Failed | 0 Pending | 0 Skipped
PASS
ok  	github.com/deepakpunia/technical-challenge/Level-2	0.082s
```

### Level 3: Deploy a VM on GCP
#### Terraform script to deploy VM on GCP

```bash
$ cd Level-3
$ terraform init
$ terraform plan
$ terraform apply -auto-approve
Plan: 1 to add, 0 to change, 0 to destroy.
google_compute_instance.vm_instance: Creating...
google_compute_instance.vm_instance: Still creating... [10s elapsed]
google_compute_instance.vm_instance: Creation complete after 20s [id=projects/playground-s-11-cfbd46c3/zones/us-central1-a/instances/rancher-suse-technical-challange]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

$ terraform destroy -auto-approve
google_compute_instance.vm_instance: Destroying... [id=projects/playground-s-11-cfbd46c3/zones/us-central1-a/instances/rancher-suse-technical-challange]
google_compute_instance.vm_instance: Still destroying... [id=projects/playground-s-11-cfbd46c3/zones...ances/rancher-suse-technical-challange, 10s elapsed]
google_compute_instance.vm_instance: Still destroying... [id=projects/playground-s-11-cfbd46c3/zones...ances/rancher-suse-technical-challange, 20s elapsed]
google_compute_instance.vm_instance: Destruction complete after 25s

Destroy complete! Resources: 1 destroyed.
```
### Thank You :)
