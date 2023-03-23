resource "aws_db_instance" "staging_db" {
  allocated_storage    = 10
  db_name              = "fatboyslimdb"
  engine               = "postgres"
  engine_version       = "15"
  instance_class       = "db.t3.micro"
  username             = var.db_username
  password             = var.db_password
  skip_final_snapshot  = true
  identifier           = "ivan-devops-db-staging"
  vpc_security_group_ids = ["sg-007012b44e425e330"]
  db_subnet_group_name = "${aws_db_subnet_group.db_subnet_group.name}"
}

variable "db_username" {
    description = "db username"
}

variable "db_password" {
    description = "db password"
}

resource "aws_db_subnet_group" "db_subnet_group" {
  name       = aws_eks_cluster.cluster.name
  subnet_ids = [aws_subnet.private-eu-west-2a.id, aws_subnet.private-eu-west-2b.id]

  tags = {
    Name = aws_eks_cluster.cluster.name
  }
}