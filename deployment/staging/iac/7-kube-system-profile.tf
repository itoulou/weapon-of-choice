
resource "aws_iam_role" "eks-fargate-profile" {
  name = "Ivan-EKS-fargate-profile"

  assume_role_policy = jsonencode({
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "eks-fargate-pods.amazonaws.com"
      }
    }]
    Version = "2012-10-17"
  })
}

resource "aws_iam_role_policy_attachment" "eks-fargate-profile" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSFargatePodExecutionRolePolicy"
  role       = aws_iam_role.eks-fargate-profile.name
}


resource "aws_eks_fargate_profile" "kube-system" {
  cluster_name           = aws_eks_cluster.cluster.name
  fargate_profile_name   = "kube-system"
  pod_execution_role_arn = aws_iam_role.eks-fargate-profile.arn

  # These subnets must have the following resource tag: 
  # kubernetes.io/cluster/<CLUSTER_NAME>.
  subnet_ids = [
    aws_subnet.private-eu-west-2a.id,
    aws_subnet.private-eu-west-2b.id
  ]

  selector {
    namespace = "kube-system"
  }
}

/*
==========================
Uncomment the following if applying from infrastucre from scratch.
https://antonputra.com/amazon/create-aws-eks-fargate-using-terraform/#update-coredns-to-run-on-aws-fargate

This resource uses the kubectl patch command to remove this eks.amazonaws.com~1compute-type annotation from CoreDNS deployment.
CoreDNS pods which get spun up by default come with compute-type:ec2 annotation which prevents them from being scheduled on fargate nodes

==========================
*/

# data "aws_eks_cluster_auth" "eks" {
#   name = aws_eks_cluster.cluster.id
# }

# resource "null_resource" "k8s_patcher" {
#   depends_on = [aws_eks_fargate_profile.kube-system]

#   triggers = {
#     endpoint = aws_eks_cluster.cluster.endpoint
#     ca_crt   = base64decode(aws_eks_cluster.cluster.certificate_authority[0].data)
#     token    = data.aws_eks_cluster_auth.eks.token
#   }

#   provisioner "local-exec" {
#     command = <<EOH
# cat >/tmp/ca.crt <<EOF
# ${base64decode(aws_eks_cluster.cluster.certificate_authority[0].data)}
# EOF
# kubectl \
#   --server="${aws_eks_cluster.cluster.endpoint}" \
#   --certificate_authority=/tmp/ca.crt \
#   --token="${data.aws_eks_cluster_auth.eks.token}" \
#   patch deployment coredns \
#   -n kube-system --type json \
#   -p='[{"op": "remove", "path": "/spec/template/metadata/annotations/eks.amazonaws.com~1compute-type"}]'
# EOH
#   }

#   lifecycle {
#     ignore_changes = [triggers]
#   }
# }

resource "aws_eks_fargate_profile" "fatboy-staging" {
  cluster_name           = aws_eks_cluster.cluster.name
  fargate_profile_name   = "fatboy-staging"
  pod_execution_role_arn = aws_iam_role.eks-fargate-profile.arn

  # These subnets must have the following resource tag: 
  # kubernetes.io/cluster/<CLUSTER_NAME>.
  subnet_ids = [
    aws_subnet.private-eu-west-2a.id,
    aws_subnet.private-eu-west-2b.id
  ]

  selector {
    namespace = "fatboy-staging"
  }
}