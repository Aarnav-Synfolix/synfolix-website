// Single source of truth for open roles. Add, edit or remove a job by editing
// this array only — every Careers page section (open positions list,
// department counts) reads from here, so nothing else needs to change.
export const DEPARTMENTS = ['Engineering', 'Product & Design', 'AI & Data', 'Customer Success', 'Sales & Marketing']

export const JOBS = [
  {
    id: 'eng-frontend',
    title: 'Frontend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    id: 'eng-backend',
    title: 'Backend Engineer (Node.js)',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    department: 'Product & Design',
    location: 'Hybrid — San Francisco',
    type: 'Full-time',
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    department: 'AI & Data',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    id: 'customer-success-manager',
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'San Francisco, CA',
    type: 'Full-time',
  },
]
