export const resumeData = {
  personal: {
    name: 'NEIL LEWIS',
    location: 'Bengaluru, Karnataka, IN',
    phone: '+91 9686195998',
    email: 'lewisneil2000@gmail.com'
  },

  objective:
    'Versatile Full Stack Engineer with a strong focus on designing and developing robust web applications. Proficient in a wide range of technologies, including Angular, .NET, Node.js, Python, and Azure. Experienced in crafting innovative solutions, from frontend, UI/UX to backend APIs and containerization. Passionate about building highly scalable, secure, and efficient systems, while collaborating effectively with cross-functional teams.',

  experience: [
    {
      title: 'Software, Senior Design Engineer',
      company: 'Schneider Electric',
      period: '2025 – 2026',
      projects: [
        {
          name: 'Blueprints Application (Infrastructure Management Tool)',
          description:
            'Tool for designing, visualizing, and managing Azure infrastructure. Key Features include infrastructure drafting, automatic diagramming, streamlined deployment, pre-deployment cost estimates, and detailed deployment status tracking.',
          contributions: [
            'Developed wireframes, prototypes, and high-fidelity mockups in Figma to effectively communicate design concepts and gather feedback.',
            'Integrated robust OAuth security using PingID, implemented granular RBAC, and utilized AUTH Guards to secure application routes.',
            'Developed comprehensive unit tests (Karma/Jasmine) and ensured application compliance with Checkmarx and SonarQube standards.',
            'Designed and developed an orchestrator backend service (.NET Core 10.0, MongoDB) to translate blueprint designs into dispatchable GitHub Actions for Azure Infrastructure across multiple environments.',
            'Implemented SMTP (SendGrid) integration for stakeholder notifications regarding new requests and completed deployments, enhancing communication and transparency.',
            'Designed and developed multiple APIs to provide data to the frontend application.',
            'Developed and maintained a CRON job on a Linux server using a daemon service to automate daily data imports from Azure into company inventory, ensuring up to date information.',
            'Established a robust logging system using Grafana for comprehensive monitoring and analysis of application behavior, crucial for auditing.'
          ]
        },
        {
          name: 'Azure Cloud Dashboards',
          description:
            'Developed a business-centric dashboard page providing real-time insights into Azure cloud environments. This included resource monitoring, cost analysis, and workflow management features, all tailored to provide key business metrics and information.',
          contributions: [
            'Utilized charting libraries like Highcharts for data visualization on the frontend.',
            'Integrated Grafana monitoring via iframe, enhancing user onboarding for cross-functional teams.',
            'Implemented secure auto-login for Grafana using HTTPS cookies, improving usability, and reducing authentication overhead.'
          ]
        }
      ]
    },
    {
      title: 'Engineer',
      company: 'Schneider Electric',
      period: '2022 – 2025',
      projects: [
        {
          name: 'Azure Inventory Builder',
          description:
            'Developed an Angular-based form builder that allows users to create and test Azure infrastructure & Application templates. It also features a Python editor for managing templates, streamlining resource deployment and management processes.',
          contributions: [
            'Improved UI/UX and streamlined workflow significantly reduced the learning curve for new teams adopting Azure.',
            'Developed and implemented custom components, featuring intuitive form elements, robust input validation, and clear error messaging.',
            'Facilitated onboarding for various teams, ensuring a smoother transition and better utilization of Azure resources.'
          ]
        },
        {
          name: 'VM Optimization ML Models',
          description:
            'Developed ML models using Python libraries to optimize the utilization of Virtual Machines (VMs). These models provided valuable insights into cost optimization by identifying and mitigating over-utilization of servers, ultimately leading to significant cost savings. This project leveraged data collected by the Azure Monitoring Service.'
        },
        {
          name: 'Third-party API Integration & Organization Automation',
          description:
            'Developed APIs using .NET to integrate with third-party services, enhancing system functionality and enabling seamless data exchange. The new organization API automated Azure subscription creation, including management groups, RBAC, budget allocation, manager assignment, network and monitoring setup, and Guacamole RDP hosting deployment. This API streamlined the organization configuration process, reducing manual effort by 97% (from 2 days to 45 minutes) and ensuring consistent and efficient provisioning.'
        },
        {
          name: 'CI/CD Pipeline Automation',
          description:
            'Automated Azure infrastructure deployments using a Jira Service Desk-driven CI/CD pipeline (Python, GitHub Actions, Terraform). Integrated Jira and GitHub Actions via webhooks to automate workflows based on change request approvals. Automated the lifecycle management of 25+ Azure resources (VMs, VMSS, Redis, databases, ACR) with Terraform. Implemented automated deployment and notification workflows using GitHub Actions and Python. This experience significantly expanded my Azure expertise.'
        }
      ]
    }
  ],

  education: [
    {
      degree: 'M. Tech Software Engineering',
      institution: 'Manipal Institute of Technology, Karnataka, India',
      cgpa: '8.75 CGPA',
      period: '2023-2025'
    },
    {
      degree: 'B. Tech Electronics and Communication',
      institution: 'CMR Institute of Technology, Karnataka, India',
      cgpa: '7.45 CGPA',
      period: '2018 – 2022'
    }
  ],

  certifications: [
    {
      name: 'Microsoft Certified: Azure Developer Associate',
      id: '995510485',
      year: '2024'
    }
  ],

  skills: {
    frontend: [
      'Angular',
      'ReactJs',
      'TypeScript',
      'D3.js',
      'Redux',
      'JavaScript',
      'HTML',
      'CSS',
      'Bootstrap',
      'Tailwind',
      'Material Design',
      'FabricJs',
      'KonvaJs'
    ],
    backend: [
      'ASP .NET 10, 8.0, 6.0',
      'C#',
      'Node.js',
      'Express.js',
      'LINQ',
      'MongoDB',
      'MySQL',
      'Python'
    ],
    devops: ['Azure', 'Docker', 'Git', 'GitHub Actions', 'Azure Devops', 'Terraform', 'Linux'],
    'ui/ux': ['Figma', 'Adobe Creative Suite', 'Canva']
  },

  achievements: [
    'Awarded "Best Graduate Engineer Trainee" (2022) and received the Accelerator Award (2024) and got recognized multiple times during the quarterly townhalls.',
    'Contributed to R&D Day stall, achieving first place (2023).',
    'Delivered multiple technical presentations on Infrastructure-as-Code (Terraform).',
    'Authored an AI/ML research paper for Schneider Electric, recognized by ETAP management.'
  ]
};

export const ASCII_ART = `
  _   _      _ _   _                    _
 | \\ | |    (_) | | |                  (_)
 |  \\| | ___ _| | | |     _____      ___ ___
 | . \` |/ _ \\ | | | |    / _ \\ \\ /\\ / / / __|
 | |\\  |  __/ | | | |___|  __/\\ V  V /| \\__ \\
 |_| \\_|\\___|_|_| |______\\___| \\_/\\_/ |_|___/
`;
