provider "google" {
  credentials = file("~/gcp/service_account.json")
  project     = "playground-s-11-cfbd46c3"
  region      = "us-central1"
}

resource "google_compute_instance" "vm_instance" {
  name         = "rancher-suse-technical-challange"
  machine_type = "e2-medium"
  zone         = "us-central1-a"
  boot_disk {
    initialize_params {
      image = "opensuse-leap-15-6-v20240612-x86-64"
    }
  }

  metadata = {
    ssh-keys = "ubuntu:${file("~/.ssh/id_rsa.pub")}"
  }  

  network_interface {
    network = "default"  
    access_config {
    }
  }
}
