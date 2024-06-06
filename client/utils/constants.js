export const areasAndSubjects = {
    'Sciences': ['English', 'Mathematics', 'Civic Education', 'Data Processing', 'Biology', 'Physics', 'Chemistry', 'Futher Maths', 'Agric', 'Geography', 'Economics', 'Technical Drawing'],
    
    'Arts': ['English', 'Mathematics', 'Data Processing', 'Biology', 'Economics', 'Literature', 'Government', 'Commerce', 'C.R.S',  'Civic Education'],
    
    'Junior Subjects': ['English', 'Mathematics', 'Efik', 'Computer', 'Agric']
    // Add more areas and subjects as needed
  };

  export const navigation = [
    { name: "Dashboard", href: "/dashboard", current: false },
    { name: "Staffs", href: "/dashboard/staffs", current: false },
    { name: "Add Student", href: "/dashboard/add-student", current: false },
    {
      name: "JSS Students",
      href: "/dashboard/students",
      current: false,
      submenus: [
        {
          name: "JSS_1 Galaxy",
          href: "/dashboard/students/jss/jss1-galaxy",
          current: false,
        },
        {
          name: "JSS_1 Platinum",
          href: "/dashboard/students/jss/jss1-platinum",
          current: false,
        },
        {
          name: "JSS_1 Rose",
          href: "/dashboard/students/jss/jss1-rose",
          current: false,
        },
  
        {
          name: "JSS_2 Galaxy",
          href: "/dashboard/students/jss/jss2-galaxy",
          current: false,
        },
        {
          name: "JSS_2 Platinum",
          href: "/dashboard/students/jss/jss2-platinum",
          current: false,
        },
        {
          name: "JSS_2 Rose",
          href: "/dashboard/students/jss/jss2-rose",
          current: false,
        },
  
        {
          name: "JSS_3 Galaxy",
          href: "/dashboard/students/jss/jss3-galaxy",
          current: false,
        },
        {
          name: "JSS_3 Rose",
          href: "/dashboard/students/jss/jss3-rose",
          current: false,
        },
      ],
    },
    {
      name: "SSS Students",
      href: "/dashboard/students",
      current: false,
      submenus: [
        {
          name: "SS_1 Galaxy",
          href: "/dashboard/students/sss/ss1-galaxy",
          current: false,
        },
        {
          name: "SS_1 Platinum",
          href: "/dashboard/students/sss/ss1-platinum",
          current: false,
        },
  
        {
          name: "SS_2 Galaxy",
          href: "/dashboard/students/sss/ss2-galaxy",
          current: false,
        },
        {
          name: "SS_2 Platinum",
          href: "/dashboard/students/sss/ss2-platinum",
          current: false,
        },
  
        {
          name: "SS_3 Galaxy",
          href: "/dashboard/students/sss/ss3-galaxy",
          current: false,
        },
        {
          name: "SS_3 Platinum",
          href: "/dashboard/students/sss/ss3-platinum",
          current: false,
        },
      ],
    },
   
    { name: "Assessment", 
      href: "/dashboard/assessments", 
      current: false,
      submenus: [
        {
          name: "Add Assessment",
          href: "/dashboard/assessments/add-assessment",
          current: false,
        },
        {
          name: "View Assessment",
          href: "/dashboard/assessments/view-assessment",
          current: false,
        }
      ]
    },
    { name: "Remark", href: "#", current: false },
    { name: "Result Sheet", href: "#", current: false },
  ];