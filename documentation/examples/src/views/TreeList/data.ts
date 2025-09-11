import type { TreeNode } from "@firstnoodle-ui/bui";

export type OrgUnit = {
  name: string;
  acronym?: string;
  description?: string;
  timezone: string;
};

export const tree: TreeNode<OrgUnit> = {
  id: 1,
  label: "DTU",
  open: true,
  actions: [],
  data: {
    name: "Danmarks Tekniske Universitet",
    acronym: "DTU",
    description: "Lorem Ipsum",
    timezone: "Central European Summer Time (CEST)",
  },
  children: [
    {
      id: 2,
      label: "Aqua",
      open: false,
      actions: [],
      data: {
        name: "Aqua",
        description: "National Institute of Aquatic Resources conducts research, provides advice, educates at university level and contributes to innovation in sustainable exploitation and management of aquatic resources. We investigate the biology and population ecology of aquatic organisms, aquatic physical and chemical processes and ecosystem structure and dynamics, taking account of all relevant natural and anthropogenic drivers.",
        timezone: "Central European Summer Time (CEST)",
      },
    },
    {
      id: 3,
      label: "Bioengineering",
      open: false,
      actions: [],
      data: {
        name: "Bioengineering",
        description: "The Department of Biotechnology and Biomedicine adresses important social and scientific challenges within biotechnology, biomedicine, food technology and human and animal health.",
        timezone: "Central European Summer Time (CEST)",
      },
    },
    {
      id: 4,
      label: "Biosustain",
      open: true,
      actions: [],
      data: {
        name: "Bioengineering",
        description: "The Novo Nordisk Foundation Center for Biosustainability at the Technical University of Denmark aims at developing new knowledge and technologies to help facilitate the transformation from the existing oil-based chemical industry to a more sustainable bio-based society in which chemicals are produced biologically.",
        timezone: "Central European Summer Time (CEST)",
      },
      children: [
        {
          id: 8,
          label: "Natural Products",
          open: false,
          actions: [],
          data: {
            name: "Natural Products",
            description: "Developing new microbial cell factories to sustainably produce natural and novel products",
            timezone: "Central European Summer Time (CEST)",
          },
        },
        {
          id: 9,
          label: "Microbial Foods",
          open: false,
          actions: [],
          data: {
            name: "Microbial Foods",
            description: "Rethinking food production for sustainable development of foods using microbes",
            timezone: "Central European Summer Time (CEST)",
          },
        },
        {
          id: 10,
          label: "Sustainable Chemicals",
          open: false,
          actions: [],
          data: {
            name: "Sustainable Chemicals",
            description: "Developing bioprocesses for a sustainable and scalable production of relevant chemicals",
            timezone: "Central European Summer Time (CEST)",
          },
        },
      ],
    },
    {
      id: 5,
      label: "Chemical Engineering",
      open: false,
      actions: [],
      data: {
        name: "Chemical Engineering",
        description: "The main activities at Department of Chemical and Biochemical Engineering lie within the areas of product design, process design and production in the chemical, biotechnological, pharmaceutical, food technological and energy technological industries.",
        timezone: "Central European Summer Time (CEST)",
      },
    },
    {
      id: 6,
      label: "Chemistry",
      open: false,
      actions: [],
      data: {
        name: "Chemistry",
        description: "Department of Chemistry is a dynamic Department with a wide array of opportunities. The research is divided into two research areas each with underlying research groups.",
        timezone: "Central European Summer Time (CEST)",
      },
    },
    {
      id: 7,
      label: "Compute",
      open: false,
      actions: [],
      data: {
        name: "Compute",
        description: "Department of Applied Mathematics and Computer Science is an internationally unique academic environment spanning the scientific disciplines mathematics, statistics, computer science, and engineering. Our interdisciplinary research areas are big data and data science, artificial intelligence (AI), internet of things (IoT), smart and secure societies, smart manufacturing and life sciences.",
        timezone: "Central European Summer Time (CEST)",
      },
    },
  ],
};
