import React, { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { Chip } from "@nextui-org/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const allSkills = [
  // Web Development
  "JavaScript",
  "HTML",
  "CSS",
  "React",
  "Angular",
  "Vue.js",
  "Bootstrap",
  "SASS",
  "jQuery",
  "TypeScript",
  "WebAssembly",
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "Ruby on Rails",
  "Spring Boot",
  "ASP.NET",
  "PHP",
  "RESTful APIs",
  "GraphQL",
  "MERN Stack",
  "MEAN Stack",
  "LAMP Stack",

  // Data Science & Analytics
  "Python",
  "R",
  "SQL",
  "Julia",
  "Matplotlib",
  "Seaborn",
  "Plotly",
  "Tableau",
  "Power BI",
  "Pandas",
  "NumPy",
  "SciPy",
  "Excel",
  "SAS",
  "Scikit-learn",
  "TensorFlow",
  "Keras",
  "PyTorch",
  "XGBoost",
  "NLP",
  "OpenCV",

  // Software Engineering
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "Git",
  "GitHub",
  "GitLab",
  "Jenkins",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "Spring",
  ".NET",
  "Flask",
  "Express",
  "Hibernate",

  // System Administration & DevOps
  "Linux",
  "Windows Server",
  "macOS",
  "Bash",
  "PowerShell",
  "Python",
  "Ansible",
  "Puppet",
  "Chef",
  "AWS",
  "Azure",
  "Google Cloud Platform",
  "Docker",
  "Kubernetes",
  "OpenShift",

  // Mobile Development
  "Android",
  "iOS",
  "Java",
  "Kotlin",
  "Swift",
  "Objective-C",
  "React Native",
  "Flutter",
  "Xamarin",

  // Database Management
  "SQL",
  "MySQL",
  "PostgreSQL",
  "Oracle",
  "Microsoft SQL Server",
  "MongoDB",
  "Cassandra",
  "Redis",
  "CouchDB",
  "Firebase",

  // Cybersecurity
  "Penetration Testing",
  "Encryption",
  "Firewalls",
  "IDS/IPS",
  "Ethical Hacking",
  "OWASP Top Ten",
  "Metasploit",
  "Wireshark",
  "Nessus",
  "Nmap",

  // Networking
  "TCP/IP",
  "DNS",
  "HTTP/HTTPS",
  "FTP/SFTP",
  "DHCP",
  "Cisco",
  "Juniper",
  "VPNs",
  "Load Balancers",
  "Network Monitoring Tools",

  // Game Development
  "Unity",
  "Unreal Engine",
  "C#",
  "C++",
  "Lua",
  "Blender",
  "Substance Painter",

  // Business Intelligence
  "Tableau",
  "Power BI",
  "QlikView",
  "Data Warehousing",
  "ETL",
  "Data Modeling",

  // Project Management
  "Jira",
  "Trello",
  "Asana",
  "Microsoft Project",
  "Agile",
  "Scrum",
  "Kanban",
  "Waterfall",

  // Electronics and Telecommunication (ENTC)
  "Analog Electronics",
  "Digital Electronics",
  "Circuit Design",
  "PCB Design",
  "Embedded Systems",
  "Microcontrollers",
  "Signal Processing",
  "RF Engineering",
  "VHDL",
  "Verilog",
  "Network Protocols",
  "Wireless Communication",
  "Satellite Communication",
  "Mobile Networks",
  "Optical Communication",
  "VoIP",
  "IoT",

  // Mechanical Engineering
  "Thermodynamics",
  "Fluid Mechanics",
  "Heat Transfer",
  "Mechanics of Materials",
  "Dynamics and Vibrations",
  "Mechanical Design",
  "Manufacturing Processes",
  "Robotics",
  "CAD Software",
  "CAM Software",
  "Finite Element Analysis",
  "Computational Fluid Dynamics",
  "Material Science",
  "Control Systems",
  "HVAC Systems",
  "Energy Systems",

  // Electrical Engineering
  "Circuit Theory",
  "Electromagnetics",
  "Power Systems",
  "Control Systems",
  "Electrical Machines",
  "Power Electronics",
  "Signal Processing",
  "Analog Electronics",
  "Digital Electronics",
  "Electrical Safety Standards",
  "PLC",
  "SCADA",
  "Renewable Energy Systems",
  "Smart Grid Technologies",
  "Electrical Instrumentation",

  // Civil Engineering
  "Structural Engineering",
  "Geotechnical Engineering",
  "Transportation Engineering",
  "Environmental Engineering",
  "Hydraulic Engineering",
  "Construction Management",
  "Surveying",
  "Building Information Modeling",
  "Soil Mechanics",
  "Concrete Design",
  "Steel Design",
  "Construction Materials",
  "Earthquake Engineering",
  "Urban Planning",

  // Chemical Engineering
  "Chemical Process Engineering",
  "Thermodynamics",
  "Reaction Engineering",
  "Separation Processes",
  "Heat and Mass Transfer",
  "Biochemical Engineering",
  "Process Simulation Software",
  "Chemical Plant Design",
  "Safety and Hazard Analysis",
  "Catalysis",
  "Environmental Engineering",

  // Industrial Engineering
  "Operations Research",
  "Production Planning and Control",
  "Quality Control",
  "Systems Engineering",
  "Ergonomics",
  "Supply Chain Management",
  "Lean Manufacturing",
  "Six Sigma",
  "Simulation Modeling",
  "Facility Layout Design",
  "Inventory Management",

  // Aerospace Engineering
  "Aerodynamics",
  "Propulsion Systems",
  "Flight Dynamics",
  "Space Systems",
  "Aircraft Design",
  "Satellite Systems",
  "Computational Fluid Dynamics",
  "Avionics",
  "Aerospace Materials",
  "Guidance, Navigation, and Control Systems",
  "Spacecraft Design and Analysis",

  // Bioengineering / Biomedical Engineering
  "Biomechanics",
  "Biomaterials",
  "Medical Imaging",
  "Systems Physiology",
  "Rehabilitation Engineering",
  "Medical Device Design",
  "Computational Biology",
  "Tissue Engineering",
  "Clinical Engineering",
  "Health Informatics",

  // Environmental Engineering
  "Environmental Chemistry",
  "Water Resources Engineering",
  "Waste Management",
  "Environmental Impact Assessment",
  "Air Quality Management",
  "Environmental Modeling",
  "Sustainable Engineering",
  "Renewable Energy Systems",
  "Environmental Regulations and Compliance",
  "Remediation Technologies",
];

const PortfolioAndHealthDetailsPage = () => {
  const [healthDetails, setHealthDetails] = useState({
    height: "",
    weight: "",
    bloodGroup: "",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [competitions, setCompetitions] = useState<
    { name: string; result: string }[]
  >([]);
  const [internships, setInternships] = useState<
    { companyName: string; duration: string; role: string }[]
  >([]);
  const [newCompetition, setNewCompetition] = useState({
    name: "",
    result: "",
  });
  const [newInternship, setNewInternship] = useState({
    companyName: "",
    duration: "",
    role: "",
  });

  const handleAddCompetition = () => {
    if (newCompetition.name && newCompetition.result) {
      setCompetitions([...competitions, newCompetition]);
      setNewCompetition({ name: "", result: "" });
    } else {
      toast.error("Please fill in both fields.");
    }
  };

  const handleAddInternship = () => {
    if (
      newInternship.companyName &&
      newInternship.duration &&
      newInternship.role
    ) {
      setInternships([...internships, newInternship]);
      setNewInternship({ companyName: "", duration: "", role: "" });
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  const handleSkillChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSkills(event.target.value as string[]);
  };
  const filteredSkills = allSkills.filter((skill) => !skills.includes(skill));
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const animatedComponents = makeAnimated();

  return (
    <Box className="p-4">
      <Typography variant="h4" gutterBottom>
        Portfolio and Health Details
      </Typography>

      {/* Skills */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <Select
            options={filteredSkills.map((skill) => ({
              value: skill,
              label: skill,
            }))}
            components={animatedComponents}
            isMulti
            value={skills}
            onChange={handleSkillChange}
            closeMenuOnSelect={false}
            className="bg-gray-50 dark:bg-gray-600 dark:text-white"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "0.5rem",
                borderColor: "black",
                color: "white",
                backgroundColor: "#4b5563",
                height: "3rem",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "black",
                backgroundColor: "white",
              }),
            }}
            required
          />
        </Grid>
      </Grid>
      {/* Competitions */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <Typography variant="h6">Competitions</Typography>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Competition Name"
                fullWidth
                value={newCompetition.name}
                onChange={(e) =>
                  setNewCompetition({ ...newCompetition, name: e.target.value })
                }
                className="bg-gray-50 dark:bg-gray-600 dark:text-white"
                InputLabelProps={{
                  className: "text-gray-700 dark:text-gray-300",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Result"
                fullWidth
                value={newCompetition.result}
                onChange={(e) =>
                  setNewCompetition({
                    ...newCompetition,
                    result: e.target.value,
                  })
                }
                className="bg-gray-50 dark:bg-gray-600 dark:text-white"
                InputLabelProps={{
                  className: "text-gray-700 dark:text-gray-300",
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddCompetition}
            startIcon={<AddCircleOutline />}
          >
            Add Competition
          </Button>
          <Box mt={2}>
            {competitions.map((comp, index) => (
              <Box
                key={index}
                mb={1}
                className="rounded-lg border p-2 dark:bg-gray-700"
              >
                <Typography variant="body1">
                  <strong>Competition:</strong> {comp.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Result:</strong> {comp.result}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Internships */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <Typography variant="h6">Internships</Typography>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Company Name"
                fullWidth
                value={newInternship.companyName}
                onChange={(e) =>
                  setNewInternship({
                    ...newInternship,
                    companyName: e.target.value,
                  })
                }
                className="bg-gray-50 dark:bg-gray-600 dark:text-white"
                InputLabelProps={{
                  className: "text-gray-700 dark:text-gray-300",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Duration"
                fullWidth
                value={newInternship.duration}
                onChange={(e) =>
                  setNewInternship({
                    ...newInternship,
                    duration: e.target.value,
                  })
                }
                className="bg-gray-50 dark:bg-gray-600 dark:text-white"
                InputLabelProps={{
                  className: "text-gray-700 dark:text-gray-300",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Role"
                fullWidth
                value={newInternship.role}
                onChange={(e) =>
                  setNewInternship({ ...newInternship, role: e.target.value })
                }
                className="bg-gray-50 dark:bg-gray-600 dark:text-white"
                InputLabelProps={{
                  className: "text-gray-700 dark:text-gray-300",
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddInternship}
            startIcon={<AddCircleOutline />}
          >
            Add Internship
          </Button>
          <Box mt={2}>
            {internships.map((intern, index) => (
              <Box
                key={index}
                mb={1}
                className="rounded-lg border p-2 dark:bg-gray-700"
              >
                <Typography variant="body1">
                  <strong>Company:</strong> {intern.companyName}
                </Typography>
                <Typography variant="body1">
                  <strong>Duration:</strong> {intern.duration}
                </Typography>
                <Typography variant="body1">
                  <strong>Role:</strong> {intern.role}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Health Details Section */}
      <Typography variant="h6" mb={2} className="dark:text-white">
        Health Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Height"
            fullWidth
            value={healthDetails.height}
            onChange={(e) =>
              handleChangeHealthDetails("height", e.target.value)
            }
            className="bg-gray-50 dark:bg-gray-600 dark:text-white"
            InputProps={{ className: "rounded-md" }}
            InputLabelProps={{ className: "text-gray-700 dark:text-gray-300" }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Weight"
            fullWidth
            value={healthDetails.weight}
            onChange={(e) =>
              handleChangeHealthDetails("weight", e.target.value)
            }
            className="bg-gray-50 dark:bg-gray-600 dark:text-white"
            InputProps={{ className: "rounded-md" }}
            InputLabelProps={{ className: "text-gray-700 dark:text-gray-300" }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Blood Group"
            fullWidth
            value={healthDetails.bloodGroup}
            onChange={(e) =>
              handleChangeHealthDetails("bloodGroup", e.target.value)
            }
            className="bg-gray-50 dark:bg-gray-600 dark:text-white"
            InputProps={{ className: "rounded-md" }}
            InputLabelProps={{ className: "text-gray-700 dark:text-gray-300" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortfolioAndHealthDetailsPage;
