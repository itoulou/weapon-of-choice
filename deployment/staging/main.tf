provider "aws" {
    access_key = var.access_key
    secret_key = var.secret_key
    region = "eu-west-2"
}

resource "aws_instance" "ec2_instance" {
    count = var.number_of_instances
    instance_type = var.instance_type
    ami = var.ami_id
    key_name = var.ami_key_pair_name
}

resource "aws_db_instance" "default" {
  allocated_storage    = 10
  db_name              = "fatboyslimdb"
  engine               = "postgres"
  engine_version       = "15"
  instance_class       = "db.t3.micro"
  username             = var.db_username
  password             = var.db_password
  skip_final_snapshot  = true
}