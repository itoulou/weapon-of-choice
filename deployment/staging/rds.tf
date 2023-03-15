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