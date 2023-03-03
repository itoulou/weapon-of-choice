variable "access_key" {
    description = "Access key to AWS console"
}
variable "secret_key" {
    description = "Secret key to AWS console"
}

variable "instance_name" {
    description = "Name of the instance to be created"
    default = "wop-staging"
}

variable "instance_type" {
    default = "t2.micro"
}

variable "ami_id" {
    description = "The AMI to use"
    default = "ami-09ee0944866c73f62"
}

variable "number_of_instances" {
    description = "number of instances to be created"
    default = 1
}

variable "ami_key_pair_name" {
    default = "wop-Ivan-kp"
}

variable "db_username" {
    description = "db username"
}

variable "db_password" {
    description = "db password"
}