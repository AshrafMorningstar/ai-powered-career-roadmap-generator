
import { RoadmapStep, Skill } from './types';

export const ROADMAP_DATA: RoadmapStep[] = [
  {
    id: 'phase1-week1',
    phase: 1,
    week: 'Weeks 1-2',
    title: 'Cloud Foundations & Infrastructure as Code (IaC)',
    description: 'Transition from manual console clicking to defining infrastructure with code. This is the bedrock of modern cloud engineering.',
    importance: 'Recruiters look for IaC skills (Terraform/CloudFormation) because it ensures consistency, versioning, and scalability in production environments.',
    keySkills: ['Terraform', 'HCL', 'AWS IAM', 'VPC Design', 'Azure VNet'],
    projects: [
      {
        name: 'The Global Secure Perimeter',
        difficulty: 'Beginner',
        tags: ['IaC', 'Networking', 'Security'],
        objective: 'Deploy a multi-region VPC/VNet infrastructure using Terraform with public/private subnets, NAT gateways, and strictly defined security groups.',
        tasks: [
          'Set up a Terraform backend in S3 with state locking (DynamoDB).',
          'Create a modularized VPC structure.',
          'Implement a Bastion Host for secure SSH/RDP access.',
          'Configure Route Tables and Network ACLs.'
        ]
      }
    ]
  },
  {
    id: 'phase1-week3',
    phase: 1,
    week: 'Weeks 3-4',
    title: 'Programming for Automation',
    description: 'Learn to manipulate cloud resources programmatically. This shifts you from a "user" to an "operator".',
    importance: 'Automation saves thousands of engineering hours. Knowing how to use Python (Boto3) or Node.js with Cloud SDKs is a high-value differentiator.',
    keySkills: ['Python', 'Bash', 'AWS Lambda', 'Azure Functions', 'EventBridge'],
    projects: [
      {
        name: 'The Automated Cost-Optimizer',
        difficulty: 'Intermediate',
        tags: ['Programming', 'Serverless', 'Cost Management'],
        objective: 'Write a Python script (Lambda) that scans your account for unattached EBS volumes or underutilized instances and sends a report to Slack.',
        tasks: [
          'Write a script using Boto3 to query EC2 and EBS APIs.',
          'Package the script as a Lambda function.',
          'Set up a weekly EventBridge trigger.',
          'Integrate with a Slack Webhook for notifications.'
        ]
      }
    ]
  },
  {
    id: 'phase2-week5',
    phase: 2,
    week: 'Weeks 5-6',
    title: 'Containerization & Modern App Stacks',
    description: 'Master Docker and Kubernetes. Most modern enterprises have shifted away from monoliths to microservices.',
    importance: 'Containers provide environment consistency. Every major company uses Kubernetes (EKS/AKS) or ECS to orchestrate their production traffic.',
    keySkills: ['Docker', 'Kubernetes (K8s)', 'HELM', 'Container Registry', 'Microservices'],
    projects: [
      {
        name: 'Multi-Container App Deployment',
        difficulty: 'Intermediate',
        tags: ['Docker', 'K8s', 'FullStack'],
        objective: 'Containerize a React frontend and Node.js backend, and deploy them into a managed Kubernetes cluster (EKS or AKS).',
        tasks: [
          'Write optimized multi-stage Dockerfiles.',
          'Create Kubernetes Manifests (Deployments, Services, Ingress).',
          'Implement ConfigMaps and Secrets for environment variables.',
          'Set up an Ingress Controller with Load Balancing.'
        ]
      }
    ]
  },
  {
    id: 'phase2-week7',
    phase: 2,
    week: 'Weeks 7-8',
    title: 'CI/CD Pipelines & DevOps Culture',
    description: 'Automate the software release process. Code to production should be a seamless, automated journey.',
    importance: 'The ability to ship code safely and frequently is the hallmark of a high-performing tech team. GitHub Actions is currently the market leader.',
    keySkills: ['GitHub Actions', 'Jenkins', 'Unit Testing', 'Deployment Strategies (Blue/Green)'],
    projects: [
      {
        name: 'The Zero-Downtime Pipeline',
        difficulty: 'Intermediate',
        tags: ['DevOps', 'CI/CD', 'GitHub'],
        objective: 'Build a GitHub Actions pipeline that builds, tests, and deploys a web app automatically on every git push.',
        tasks: [
          'Configure Linting and Unit Test steps in CI.',
          'Add a "Build & Push" step to Docker Hub or ECR.',
          'Use Terraform to update the infrastructure automatically.',
          'Implement a manual approval gate for Production deployments.'
        ]
      }
    ]
  },
  {
    id: 'phase3-week9',
    phase: 3,
    week: 'Weeks 9-12',
    title: 'The Capstone: High Availability & Monitoring',
    description: 'Synthesize everything. Build a production-grade system that is resilient, observable, and scalable.',
    importance: 'A capstone project proves you can handle complex, real-world constraints. It shows you think about reliability, not just "getting it to work."',
    keySkills: ['CloudWatch', 'Prometheus', 'Grafana', 'Auto Scaling', 'Global CDN'],
    projects: [
      {
        name: 'Resilient Cloud Native Architecture',
        difficulty: 'Advanced',
        tags: ['Capstone', 'Resilience', 'Monitoring'],
        objective: 'Create a globally distributed application with auto-scaling, disaster recovery, and deep observability dashboards.',
        tasks: [
          'Deploy a web app across multiple Availability Zones.',
          'Set up an Application Load Balancer with Health Checks.',
          'Configure CloudWatch Alarms and Grafana Dashboards for CPU/Memory metrics.',
          'Document the architecture using C4 or Architectural Diagrams.'
        ]
      }
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: 'Terraform', level: 90, description: 'Declarative infrastructure management for AWS/Azure.', category: 'IaC' },
  { name: 'AWS', level: 85, description: 'Core services: EC2, S3, Lambda, VPC, EKS.', category: 'Cloud' },
  { name: 'Kubernetes', level: 80, description: 'Orchestrating microservices at scale.', category: 'DevOps' },
  { name: 'Python', level: 85, description: 'Automation scripts and API integrations.', category: 'Coding' },
  { name: 'CI/CD', level: 90, description: 'GitHub Actions, GitLab CI, and Jenkins.', category: 'DevOps' },
  { name: 'Security', level: 75, description: 'IAM policies, encryption, and network security.', category: 'Cloud' }
];

export const PORTFOLIO_TIPS = [
  {
    title: 'Write Clear READMEs',
    content: 'Treat your GitHub README like a sales page. Include: The Problem, The Architecture Diagram, How to Deploy, and Key Challenges overcome.'
  },
  {
    title: 'Architectural Diagrams',
    content: 'Visuals are powerful. Use Lucidchart or Draw.io to show how your VPC, Lambda, and DB connect. It proves you understand the "big picture".'
  },
  {
    title: 'Show Your Screws',
    content: 'Don\'t just show the final product. Write a blog post or include a "Retrospective" section. What broke? How did you fix it? This shows seniority.'
  },
  {
    title: 'LinkedIn Optimization',
    content: 'Upload your architectural diagrams to LinkedIn. Use keywords like Terraform, AWS, DevOps, and Automation. Tag mentors to get visibility.'
  }
];

export const ASHRAF_BIO = {
  name: "Ashraf Morningstar",
  title: "Senior Cloud & DevOps Engineer",
  philosophy: "Infrastructure should be as fluid as the code it supports. I build systems that don't just work—they evolve.",
  bio: "With over a decade of experience in building cloud-native infrastructures, I specialize in transforming monolithic architectures into highly scalable, automated microservices ecosystems. My focus is on the intersection of networking, security, and developer productivity.",
  softSkills: ["Empathetic Leadership", "Systemic Thinking", "Technical Mentorship", "Cross-Functional Collaboration"],
  accomplishments: ["Migrated 500+ microservices to EKS", "Reduced cloud spend by 40% via automation", "AWS Certified Solutions Architect Professional"]
};
