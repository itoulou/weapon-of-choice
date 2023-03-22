resource "aws_vpc" "main" {
    cidr_block = "10.0.0.0/16"

    # must be enabled for EFS
    enable_dns_support = true
    enable_dns_hostnames = true

    tags = {
        Name = "main"
    }
}