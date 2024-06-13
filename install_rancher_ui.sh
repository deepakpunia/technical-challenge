#!/bin/bash

# Update the apt package list
sudo apt-get update -y

# Install Docker's package dependencies
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

# Download and add Docker's official public PGP key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Verify the fingerprint
sudo apt-key fingerprint 0EBFCD88 -y

# Add the stable Docker apt repository
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# Update the apt package list (for the new apt repo)
sudo apt-get update -y

# Install Docker
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Start Docker
sudo systemctl start docker

echo "---------------------------------------------"
echo "Performing Rancher single node docker install"
sudo docker run -d --name rancher_ui --restart=unless-stopped -p 80:80 -p 443:443 --privileged rancher/rancher:stable
if [ $? -eq 0 ]; then
echo "Done single node install of Rancher for UI"
else
echo "Rancher installation failed"
fi
