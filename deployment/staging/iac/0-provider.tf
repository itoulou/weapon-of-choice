provider "aws" {
    region = "eu-west-2"
}

variable "cluster_name" {
    default = "ivan-devops-training-cluster"
}

variable "cluster_version" {
    default = "1.25"
}

terraform {
  required_version = ">= 0.12"
  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "~> 4.0"
    }
  }
  
}
