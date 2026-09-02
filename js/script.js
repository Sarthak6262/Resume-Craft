/* ==========================================================================
   ResumeCraft - Master JavaScript Application Logic
   Pure Vanilla JS (ES6+) - 100% Client-Side Static Architecture
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

/* --- Default Data & Application State --- */
const STORAGE_KEY = 'resumecraft_user_data_v1';

let resumeData = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
    photoUrl: ''
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certifications: [],
  languages: [],
  achievements: [],
  settings: {
    template: 'academic',
    font: 'inter',
    fontSize: 'medium',
    lineSpacing: 'normal'
  }
};

/* Job Keyword Dictionary for Client-Side ATS Suggester */
const KEYWORD_DICTIONARY = {
  'frontend': ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Vue.js', 'Responsive Design', 'REST APIs', 'Git', 'Webpack', 'Tailwind CSS', 'UI/UX'],
  'backend': ['Node.js', 'Express.js', 'Python', 'Django', 'Java', 'Spring Boot', 'SQL', 'PostgreSQL', 'MongoDB', 'RESTful APIs', 'GraphQL', 'Docker'],
  'full stack': ['JavaScript', 'TypeScript', 'Node.js', 'React', 'HTML/CSS', 'SQL', 'MongoDB', 'REST APIs', 'Git', 'CI/CD', 'AWS', 'System Design'],
  'data scientist': ['Python', 'R', 'SQL', 'Machine Learning', 'Pandas', 'NumPy', 'Scikit-Learn', 'TensorFlow', 'Data Visualization', 'Tableau', 'Statistics'],
  'product manager': ['Agile/Scrum', 'Product Roadmap', 'User Stories', 'Market Research', 'KPI Tracking', 'Cross-functional Leadership', 'Jira', 'Data Analytics'],
  'devops': ['Linux', 'Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Ansible', 'Bash', 'Git', 'Monitoring', 'Jenkins', 'Cloud Security'],
  'ui/ux': ['Figma', 'Wireframing', 'Prototyping', 'User Research', 'Information Architecture', 'Design Systems', 'Usability Testing', 'Adobe XD'],
  'software': ['Data Structures', 'Algorithms', 'Object-Oriented Programming', 'Git', 'Software Architecture', 'Unit Testing', 'Code Review', 'Problem Solving']
};

/* Sample Data Pre-loader */
const SAMPLE_DATA = {
  personal: {
    fullName: 'SARTHAK DATTATRAY WAKCHAURE',
    jobTitle: 'Software Engineer / Data Analyst Fresher',
    email: 'sarthakwakchaure2058@gmail.com',
    phone: '9834375622',
    location: 'Katraj, Pune – 411046',
    linkedin: 'https://linkedin.com/in/sarthakwakchaure',
    github: 'https://github.com/sarthakwakchaure',
    portfolio: '',
    summary: 'Ambitious and detail-oriented B.Com (Computer Applications) fresher, ranked 1st with a 9.82 CGPA at Sarhad College, Pune. Proficient in SQL, HTML, CSS, and JavaScript, with basic working knowledge of Python and Java, and hands-on experience in web development and database management. Certified in Data Analytics (NIIT) and Application Fundamentals (NASSCOM). Passionate about technology, problem-solving, and continuous learning — seeking a Software Engineer, Data Analyst, or AI Intern role to contribute and grow within a dynamic organization.',
    photoUrl: ''
  },
  education: [
    {
      id: 'edu_1',
      degree: 'B.Com (Computer Applications) – FY 2024 – Present',
      institution: 'Sarhad College, Pune',
      location: '',
      startYear: '',
      endYear: '',
      grade: 'CGPA: 9.82 / 10 | 1st Rank',
      description: ''
    },
    {
      id: 'edu_2',
      degree: 'HSC – Commerce (12th)',
      institution: 'Shahu College, Pune | Maharashtra Board',
      location: '',
      startYear: '',
      endYear: 'May 2024',
      grade: '78.17% | 3rd Rank (College)',
      description: ''
    },
    {
      id: 'edu_3',
      degree: 'SSC (10th)',
      institution: 'Gagangiri Madhyamik Mahavidyalaya, Pune',
      location: '',
      startYear: '',
      endYear: 'April 2022',
      grade: '74.63%',
      description: ''
    }
  ],
  experience: [],
  projects: [
    {
      id: 'proj_1',
      projectName: 'Resume Builder Website',
      role: '',
      techStack: 'Python · HTML · CSS · JavaScript',
      projectLink: '',
      description: '• Designed and developed a web application that generates formatted resumes from user input.\n• Implemented form validation, data handling, and PDF export functionality.\n• Managed source code using Git and GitHub for version control.'
    },
    {
      id: 'proj_2',
      projectName: 'Pacific Fitness Club App',
      role: '',
      techStack: 'HTML · CSS · JavaScript (Frontend)',
      projectLink: '',
      description: '• Designed and developed a responsive frontend-only web app for a fitness club, covering membership, class schedules, and trainer information.\n• Built interactive UI screens including member sign-up forms, class booking layout, and a dashboard view using HTML, CSS, and JavaScript.\n• Implemented client-side form validation and dynamic UI interactions for a smooth user experience.'
    }
  ],
  skills: [
    'Programming Languages: SQL; basic knowledge of Python, Java, C, C++',
    'Web Technologies: HTML, CSS, JavaScript',
    'Database: MySQL',
    'Developer Tools: Git, GitHub, VS Code, MS Excel, MS Word, PowerPoint, Google Workspace',
    'AI Tools: ChatGPT, Claude AI',
    'Soft Skills: Problem Solving, Analytical Thinking, Attention to Detail, Teamwork, Time Management'
  ],
  certifications: [
    {
      id: 'cert_1',
      name: 'Data Analytics',
      organization: 'NIIT Foundation',
      issueDate: '',
      credentialUrl: ''
    },
    {
      id: 'cert_2',
      name: 'Application Fundamentals',
      organization: 'NASSCOM Digital Skilling Institute',
      issueDate: '',
      credentialUrl: ''
    }
  ],
  languages: [
    { id: 'lang_1', name: 'English', proficiency: '' },
    { id: 'lang_2', name: 'Hindi', proficiency: '' },
    { id: 'lang_3', name: 'Marathi', proficiency: '' }
  ],
  achievements: [
    {
      id: 'ach_1',
      title: '1st Rank — FY B.Com (Computer Applications), Sarhad College, Pune',
      description: 'CGPA: 9.82 / 10'
    },
    {
      id: 'ach_2',
      title: '1st Place — Inter-College Coding Champion',
      description: 'HV Desai College, Pune'
    },
    {
      id: 'ach_3',
      title: '3rd Rank — HSC Commerce',
      description: 'Shahu College, Pune (2024 Batch)'
    }
  ],
  settings: {
    template: 'academic',
    font: 'inter',
    fontSize: 'medium',
    lineSpacing: 'normal'
  }
};

/* --- Main Initialization --- */
function initializeApp() {
  setupEventListeners();
  loadSavedResume(true); // Load saved data silently on startup if present
  updatePreview();
  calculateATSScore();
  suggestKeywords();
}

/* --- Setup Global Event Listeners --- */
function setupEventListeners() {
  // Navigation Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Bind Form Static Field Listeners (Personal Info)
  const personalInputs = document.querySelectorAll('#personal-form input, #personal-form textarea');
  personalInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const field = e.target.dataset.field;
      if (field) {
        resumeData.personal[field] = e.target.value;
        autoSaveData();
        updatePreview();
        if (field === 'jobTitle') {
          suggestKeywords();
        }
        calculateATSScore();
      }
    });
  });

  // Controls Toolbar Listeners (Font, Size, Spacing, Template)
  const templateSelect = document.getElementById('setting-template');
  const fontSelect = document.getElementById('setting-font');
  const sizeSelect = document.getElementById('setting-font-size');
  const spacingSelect = document.getElementById('setting-line-spacing');

  if (templateSelect) {
    templateSelect.addEventListener('change', (e) => {
      selectTemplate(e.target.value);
    });
  }
  if (fontSelect) {
    fontSelect.addEventListener('change', (e) => {
      resumeData.settings.font = e.target.value;
      autoSaveData();
      updatePreview();
    });
  }
  if (sizeSelect) {
    sizeSelect.addEventListener('change', (e) => {
      resumeData.settings.fontSize = e.target.value;
      autoSaveData();
      updatePreview();
    });
  }
  if (spacingSelect) {
    spacingSelect.addEventListener('change', (e) => {
      resumeData.settings.lineSpacing = e.target.value;
      autoSaveData();
      updatePreview();
    });
  }

  // Skills input field listener (Add on Enter or Button)
  const skillInput = document.getElementById('skill-input');
  const addSkillBtn = document.getElementById('add-skill-btn');
  if (skillInput && addSkillBtn) {
    addSkillBtn.addEventListener('click', () => handleAddSkillInput());
    skillInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddSkillInput();
      }
    });
  }
}

/* --- Dynamic Field Adders & Removers --- */

// Helper to generate unique IDs
function generateId(prefix = 'item') {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

/* Education */
function addEducation(data = {}) {
  const newItem = {
    id: data.id || generateId('edu'),
    degree: data.degree || '',
    institution: data.institution || '',
    location: data.location || '',
    startYear: data.startYear || '',
    endYear: data.endYear || '',
    grade: data.grade || '',
    description: data.description || ''
  };
  resumeData.education.push(newItem);
  renderEducationForms();
  updatePreview();
  calculateATSScore();
}

function removeEducation(id) {
  resumeData.education = resumeData.education.filter(item => item.id !== id);
  renderEducationForms();
  updatePreview();
  calculateATSScore();
  autoSaveData();
}

function renderEducationForms() {
  const container = document.getElementById('education-container');
  if (!container) return;
  container.innerHTML = '';

  resumeData.education.forEach((item, index) => {
    const entryEl = document.createElement('div');
    entryEl.className = 'dynamic-entry';
    entryEl.innerHTML = `
      <div class="entry-header-row">
        <span class="entry-title">Education #${index + 1}</span>
        <button type="button" class="btn btn-sm btn-danger" onclick="removeEducation('${item.id}')">Delete</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Degree / Qualification</label>
          <input type="text" placeholder="e.g. B.Tech in Computer Science" value="${escapeHtml(item.degree)}" oninput="updateEducationItem('${item.id}', 'degree', this.value)">
        </div>
        <div class="form-group">
          <label>School / Institution</label>
          <input type="text" placeholder="e.g. Stanford University" value="${escapeHtml(item.institution)}" oninput="updateEducationItem('${item.id}', 'institution', this.value)">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Location</label>
          <input type="text" placeholder="e.g. California, USA" value="${escapeHtml(item.location)}" oninput="updateEducationItem('${item.id}', 'location', this.value)">
        </div>
        <div class="form-group">
          <label>Grade / CGPA</label>
          <input type="text" placeholder="e.g. 3.8 / 4.0" value="${escapeHtml(item.grade)}" oninput="updateEducationItem('${item.id}', 'grade', this.value)">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Start Year</label>
          <input type="text" placeholder="2018" value="${escapeHtml(item.startYear)}" oninput="updateEducationItem('${item.id}', 'startYear', this.value)">
        </div>
        <div class="form-group">
          <label>End Year (or Expected)</label>
          <input type="text" placeholder="2022" value="${escapeHtml(item.endYear)}" oninput="updateEducationItem('${item.id}', 'endYear', this.value)">
        </div>
      </div>
      <div class="form-group">
        <label>Description / Honors</label>
        <textarea placeholder="Key coursework, honors, or activities..." oninput="updateEducationItem('${item.id}', 'description', this.value)">${escapeHtml(item.description)}</textarea>
      </div>
    `;
    container.appendChild(entryEl);
  });
}

function updateEducationItem(id, field, value) {
  const item = resumeData.education.find(i => i.id === id);
  if (item) {
    item[field] = value;
    autoSaveData();
    updatePreview();
    calculateATSScore();
  }
}

/* Experience */
function addExperience(data = {}) {
  const newItem = {
    id: data.id || generateId('exp'),
    jobTitle: data.jobTitle || '',
    company: data.company || '',
    location: data.location || '',
    startDate: data.startDate || '',
    endDate: data.endDate || '',
    isCurrent: data.isCurrent || false,
    description: data.description || ''
  };
  resumeData.experience.push(newItem);
  renderExperienceForms();
  updatePreview();
  calculateATSScore();
}

function removeExperience(id) {
  resumeData.experience = resumeData.experience.filter(item => item.id !== id);
  renderExperienceForms();
  updatePreview();
  calculateATSScore();
  autoSaveData();
}

function renderExperienceForms() {
  const container = document.getElementById('experience-container');
  if (!container) return;
  container.innerHTML = '';

  resumeData.experience.forEach((item, index) => {
    const entryEl = document.createElement('div');
    entryEl.className = 'dynamic-entry';
    entryEl.innerHTML = `
      <div class="entry-header-row">
        <span class="entry-title">Work Experience #${index + 1}</span>
        <button type="button" class="btn btn-sm btn-danger" onclick="removeExperience('${item.id}')">Delete</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Job Title</label>
          <input type="text" placeholder="e.g. Frontend Engineer" value="${escapeHtml(item.jobTitle)}" oninput="updateExperienceItem('${item.id}', 'jobTitle', this.value)">
        </div>
        <div class="form-group">
          <label>Company / Organization</label>
          <input type="text" placeholder="e.g. Google" value="${escapeHtml(item.company)}" oninput="updateExperienceItem('${item.id}', 'company', this.value)">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Location</label>
          <input type="text" placeholder="e.g. New York, NY" value="${escapeHtml(item.location)}" oninput="updateExperienceItem('${item.id}', 'location', this.value)">
        </div>
        <div class="form-group">
          <label>Start Date</label>
          <input type="text" placeholder="e.g. Jan 2021" value="${escapeHtml(item.startDate)}" oninput="updateExperienceItem('${item.id}', 'startDate', this.value)">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>End Date</label>
          <input type="text" id="exp-end-${item.id}" placeholder="e.g. Present" value="${escapeHtml(item.endDate)}" ${item.isCurrent ? 'disabled' : ''} oninput="updateExperienceItem('${item.id}', 'endDate', this.value)">
        </div>
        <div class="form-group" style="display: flex; align-items: flex-end; padding-bottom: 0.6rem;">
          <label class="checkbox-label">
            <input type="checkbox" ${item.isCurrent ? 'checked' : ''} onchange="toggleExperienceCurrent('${item.id}', this.checked)">
            Currently Working Here
          </label>
        </div>
      </div>
      <div class="form-group">
        <label>Job Responsibilities & Accomplishments</label>
        <textarea placeholder="• Bullet points detailing achievements and metrics..." oninput="updateExperienceItem('${item.id}', 'description', this.value)">${escapeHtml(item.description)}</textarea>
      </div>
    `;
    container.appendChild(entryEl);
  });
}

function updateExperienceItem(id, field, value) {
  const item = resumeData.experience.find(i => i.id === id);
  if (item) {
    item[field] = value;
    autoSaveData();
    updatePreview();
    calculateATSScore();
  }
}

function toggleExperienceCurrent(id, checked) {
  const item = resumeData.experience.find(i => i.id === id);
  if (item) {
    item.isCurrent = checked;
    if (checked) {
      item.endDate = 'Present';
    }
    renderExperienceForms();
    autoSaveData();
    updatePreview();
  }
}

/* Projects */
function addProject(data = {}) {
  const newItem = {
    id: data.id || generateId('proj'),
    projectName: data.projectName || '',
    role: data.role || '',
    techStack: data.techStack || '',
    projectLink: data.projectLink || '',
    description: data.description || ''
  };
  resumeData.projects.push(newItem);
  renderProjectsForms();
  updatePreview();
  calculateATSScore();
}

function removeProject(id) {
  resumeData.projects = resumeData.projects.filter(item => item.id !== id);
  renderProjectsForms();
  updatePreview();
  calculateATSScore();
  autoSaveData();
}

function renderProjectsForms() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  container.innerHTML = '';

  resumeData.projects.forEach((item, index) => {
    const entryEl = document.createElement('div');
    entryEl.className = 'dynamic-entry';
    entryEl.innerHTML = `
      <div class="entry-header-row">
        <span class="entry-title">Project #${index + 1}</span>
        <button type="button" class="btn btn-sm btn-danger" onclick="removeProject('${item.id}')">Delete</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Project Name</label>
          <input type="text" placeholder="e.g. E-Commerce Platform" value="${escapeHtml(item.projectName)}" oninput="updateProjectItem('${item.id}', 'projectName', this.value)">
        </div>
        <div class="form-group">
          <label>Role / Contribution</label>
          <input type="text" placeholder="e.g. Lead Developer" value="${escapeHtml(item.role)}" oninput="updateProjectItem('${item.id}', 'role', this.value)">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Technologies Used</label>
          <input type="text" placeholder="e.g. React, Node.js, MongoDB" value="${escapeHtml(item.techStack)}" oninput="updateProjectItem('${item.id}', 'techStack', this.value)">
        </div>
        <div class="form-group">
          <label>Project Link / URL</label>
          <input type="url" placeholder="https://github.com/..." value="${escapeHtml(item.projectLink)}" oninput="updateProjectItem('${item.id}', 'projectLink', this.value)">
        </div>
      </div>
      <div class="form-group">
        <label>Project Description</label>
        <textarea placeholder="Describe features, metrics, or technical implementation..." oninput="updateProjectItem('${item.id}', 'description', this.value)">${escapeHtml(item.description)}</textarea>
      </div>
    `;
    container.appendChild(entryEl);
  });
}

function updateProjectItem(id, field, value) {
  const item = resumeData.projects.find(i => i.id === id);
  if (item) {
    item[field] = value;
    autoSaveData();
    updatePreview();
    calculateATSScore();
  }
}

/* Skills Chip Handlers */
function handleAddSkillInput() {
  const skillInput = document.getElementById('skill-input');
  if (!skillInput) return;
  const value = skillInput.value.trim();
  if (value) {
    addSkill(value);
    skillInput.value = '';
  }
}

function addSkill(skillName) {
  const cleanSkill = skillName.trim();
  if (cleanSkill && !resumeData.skills.includes(cleanSkill)) {
    resumeData.skills.push(cleanSkill);
    renderSkillsChips();
    autoSaveData();
    updatePreview();
    calculateATSScore();
  }
}

function removeSkill(skillName) {
  resumeData.skills = resumeData.skills.filter(s => s !== skillName);
  renderSkillsChips();
  autoSaveData();
  updatePreview();
  calculateATSScore();
}

function renderSkillsChips() {
  const container = document.getElementById('skills-chips-container');
  if (!container) return;
  container.innerHTML = '';

  if (resumeData.skills.length === 0) {
    container.innerHTML = '<span style="color: var(--text-muted); font-size: 0.85rem;">No skills added yet. Add skills above or click suggested keywords.</span>';
    return;
  }

  resumeData.skills.forEach(skill => {
    const chip = document.createElement('div');
    chip.className = 'skill-chip';
    chip.innerHTML = `
      <span>${escapeHtml(skill)}</span>
      <button type="button" class="skill-chip-remove" onclick="removeSkill('${escapeHtml(skill)}')">&times;</button>
    `;
    container.appendChild(chip);
  });
}

/* Certifications */
function addCertification(data = {}) {
  const newItem = {
    id: data.id || generateId('cert'),
    name: data.name || '',
    organization: data.organization || '',
    issueDate: data.issueDate || '',
    credentialUrl: data.credentialUrl || ''
  };
  resumeData.certifications.push(newItem);
  renderCertificationsForms();
  updatePreview();
  calculateATSScore();
}

function removeCertification(id) {
  resumeData.certifications = resumeData.certifications.filter(item => item.id !== id);
  renderCertificationsForms();
  updatePreview();
  calculateATSScore();
  autoSaveData();
}

function renderCertificationsForms() {
  const container = document.getElementById('certifications-container');
  if (!container) return;
  container.innerHTML = '';

  resumeData.certifications.forEach((item, index) => {
    const entryEl = document.createElement('div');
    entryEl.className = 'dynamic-entry';
    entryEl.innerHTML = `
      <div class="entry-header-row">
        <span class="entry-title">Certification #${index + 1}</span>
        <button type="button" class="btn btn-sm btn-danger" onclick="removeCertification('${item.id}')">Delete</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Certification Name</label>
          <input type="text" placeholder="e.g. AWS Cloud Practitioner" value="${escapeHtml(item.name)}" oninput="updateCertificationItem('${item.id}', 'name', this.value)">
        </div>
        <div class="form-group">
          <label>Issuing Organization</label>
          <input type="text" placeholder="e.g. Amazon Web Services" value="${escapeHtml(item.organization)}" oninput="updateCertificationItem('${item.id}', 'organization', this.value)">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Issue Date</label>
          <input type="text" placeholder="e.g. May 2023" value="${escapeHtml(item.issueDate)}" oninput="updateCertificationItem('${item.id}', 'issueDate', this.value)">
        </div>
        <div class="form-group">
          <label>Credential URL</label>
          <input type="url" placeholder="https://..." value="${escapeHtml(item.credentialUrl)}" oninput="updateCertificationItem('${item.id}', 'credentialUrl', this.value)">
        </div>
      </div>
    `;
    container.appendChild(entryEl);
  });
}

function updateCertificationItem(id, field, value) {
  const item = resumeData.certifications.find(i => i.id === id);
  if (item) {
    item[field] = value;
    autoSaveData();
    updatePreview();
    calculateATSScore();
  }
}

/* Languages */
function addLanguage(data = {}) {
  const newItem = {
    id: data.id || generateId('lang'),
    name: data.name || '',
    proficiency: data.proficiency || 'Fluent'
  };
  resumeData.languages.push(newItem);
  renderLanguagesForms();
  updatePreview();
  calculateATSScore();
}

function removeLanguage(id) {
  resumeData.languages = resumeData.languages.filter(item => item.id !== id);
  renderLanguagesForms();
  updatePreview();
  calculateATSScore();
  autoSaveData();
}

function renderLanguagesForms() {
  const container = document.getElementById('languages-container');
  if (!container) return;
  container.innerHTML = '';

  resumeData.languages.forEach((item, index) => {
    const entryEl = document.createElement('div');
    entryEl.className = 'dynamic-entry';
    entryEl.innerHTML = `
      <div class="entry-header-row">
        <span class="entry-title">Language #${index + 1}</span>
        <button type="button" class="btn btn-sm btn-danger" onclick="removeLanguage('${item.id}')">Delete</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Language</label>
          <input type="text" placeholder="e.g. English" value="${escapeHtml(item.name)}" oninput="updateLanguageItem('${item.id}', 'name', this.value)">
        </div>
        <div class="form-group">
          <label>Proficiency</label>
          <select onchange="updateLanguageItem('${item.id}', 'proficiency', this.value)">
            <option value="Native" ${item.proficiency === 'Native' ? 'selected' : ''}>Native</option>
            <option value="Fluent" ${item.proficiency === 'Fluent' ? 'selected' : ''}>Fluent</option>
            <option value="Intermediate" ${item.proficiency === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
            <option value="Basic" ${item.proficiency === 'Basic' ? 'selected' : ''}>Basic</option>
          </select>
        </div>
      </div>
    `;
    container.appendChild(entryEl);
  });
}

function updateLanguageItem(id, field, value) {
  const item = resumeData.languages.find(i => i.id === id);
  if (item) {
    item[field] = value;
    autoSaveData();
    updatePreview();
  }
}

/* Achievements */
function addAchievement(data = {}) {
  const newItem = {
    id: data.id || generateId('ach'),
    title: data.title || '',
    description: data.description || ''
  };
  resumeData.achievements.push(newItem);
  renderAchievementsForms();
  updatePreview();
  calculateATSScore();
}

function removeAchievement(id) {
  resumeData.achievements = resumeData.achievements.filter(item => item.id !== id);
  renderAchievementsForms();
  updatePreview();
  calculateATSScore();
  autoSaveData();
}

function renderAchievementsForms() {
  const container = document.getElementById('achievements-container');
  if (!container) return;
  container.innerHTML = '';

  resumeData.achievements.forEach((item, index) => {
    const entryEl = document.createElement('div');
    entryEl.className = 'dynamic-entry';
    entryEl.innerHTML = `
      <div class="entry-header-row">
        <span class="entry-title">Achievement #${index + 1}</span>
        <button type="button" class="btn btn-sm btn-danger" onclick="removeAchievement('${item.id}')">Delete</button>
      </div>
      <div class="form-group">
        <label>Achievement / Honor Title</label>
        <input type="text" placeholder="e.g. 1st Place - Coding Competition" value="${escapeHtml(item.title)}" oninput="updateAchievementItem('${item.id}', 'title', this.value)">
      </div>
      <div class="form-group">
        <label>Details</label>
        <textarea placeholder="Brief description of the accomplishment..." oninput="updateAchievementItem('${item.id}', 'description', this.value)">${escapeHtml(item.description)}</textarea>
      </div>
    `;
    container.appendChild(entryEl);
  });
}

function updateAchievementItem(id, field, value) {
  const item = resumeData.achievements.find(i => i.id === id);
  if (item) {
    item[field] = value;
    autoSaveData();
    updatePreview();
  }
}

/* --- Populate Static Form Controls From Data --- */
function populateFormFromData() {
  const p = resumeData.personal;
  setInputValue('personal-fullname', p.fullName);
  setInputValue('personal-title', p.jobTitle);
  setInputValue('personal-email', p.email);
  setInputValue('personal-phone', p.phone);
  setInputValue('personal-location', p.location);
  setInputValue('personal-linkedin', p.linkedin);
  setInputValue('personal-github', p.github);
  setInputValue('personal-portfolio', p.portfolio);
  setInputValue('personal-summary', p.summary);

  // Settings
  setInputValue('setting-template', resumeData.settings.template || 'academic');
  setInputValue('setting-font', resumeData.settings.font || 'inter');
  setInputValue('setting-font-size', resumeData.settings.fontSize || 'medium');
  setInputValue('setting-line-spacing', resumeData.settings.lineSpacing || 'normal');

  // Dynamic Lists
  renderEducationForms();
  renderExperienceForms();
  renderProjectsForms();
  renderSkillsChips();
  renderCertificationsForms();
  renderLanguagesForms();
  renderAchievementsForms();
}

function setInputValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

/* --- Select Template System --- */
function selectTemplate(templateName) {
  resumeData.settings.template = templateName;
  setInputValue('setting-template', templateName);
  autoSaveData();
  updatePreview();
  
  // Smooth scroll to resume builder area if selected from gallery
  const builderSection = document.getElementById('builder-section');
  if (builderSection) {
    builderSection.scrollIntoView({ behavior: 'smooth' });
  }
  showToast(`Template changed to ${templateName.toUpperCase()}`, 'success');
}

/* Helper to format descriptions into clean paragraph or bulleted list HTML */
function formatDescriptionHTML(text) {
  if (!text || !text.trim()) return '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const hasBullets = lines.some(l => l.startsWith('•') || l.startsWith('●') || l.startsWith('-'));
  
  if (hasBullets) {
    const listItems = lines.map(l => {
      const cleanLine = l.replace(/^[•●-]\s*/, '');
      return `<li>${escapeHtml(cleanLine)}</li>`;
    }).join('');
    return `<ul class="paper-bullet-list">${listItems}</ul>`;
  } else {
    return `<div class="paper-entry-desc">${lines.map(l => escapeHtml(l)).join('<br>')}</div>`;
  }
}

/* --- LIVE PREVIEW RENDERER --- */
function updatePreview() {
  const paper = document.getElementById('resume-paper');
  if (!paper) return;

  const s = resumeData.settings;
  const p = resumeData.personal;

  // Apply Font, Size, Spacing & Template classes
  paper.className = `resume-paper template-${s.template} font-${s.font} size-${s.fontSize} spacing-${s.lineSpacing}`;

  let html = '';

  // 1. Header Section
  if (s.template === 'academic') {
    html += `
      <header class="paper-header">
        <h1 class="paper-name">${escapeHtml(p.fullName || 'YOUR NAME')}</h1>
        ${p.jobTitle ? `<div class="paper-title">${escapeHtml(p.jobTitle)}</div>` : ''}
        <div class="paper-contact">
          ${p.phone ? `<span>${escapeHtml(p.phone)}</span>` : ''}
          ${p.email ? `<span>${escapeHtml(p.email)}</span>` : ''}
          ${p.location ? `<span>${escapeHtml(p.location)}</span>` : ''}
          ${p.linkedin ? `<span>${escapeHtml(p.linkedin)}</span>` : ''}
          ${p.github ? `<span>${escapeHtml(p.github)}</span>` : ''}
          ${p.portfolio ? `<span>${escapeHtml(p.portfolio)}</span>` : ''}
        </div>
      </header>
    `;
  } else {
    html += `
      <header class="paper-header">
        <h1 class="paper-name">${escapeHtml(p.fullName || 'YOUR NAME')}</h1>
        ${p.jobTitle ? `<div class="paper-title">${escapeHtml(p.jobTitle)}</div>` : ''}
        <div class="paper-contact">
          ${p.email ? `<span><i class="fas fa-envelope"></i> ${escapeHtml(p.email)}</span>` : ''}
          ${p.phone ? `<span><i class="fas fa-phone"></i> ${escapeHtml(p.phone)}</span>` : ''}
          ${p.location ? `<span><i class="fas fa-map-marker-alt"></i> ${escapeHtml(p.location)}</span>` : ''}
          ${p.linkedin ? `<span><i class="fab fa-linkedin"></i> ${escapeHtml(p.linkedin)}</span>` : ''}
          ${p.github ? `<span><i class="fab fa-github"></i> ${escapeHtml(p.github)}</span>` : ''}
          ${p.portfolio ? `<span><i class="fas fa-globe"></i> ${escapeHtml(p.portfolio)}</span>` : ''}
        </div>
      </header>
    `;
  }

  // 2. Summary Section
  if (p.summary && p.summary.trim()) {
    html += `
      <section class="paper-section">
        <h2 class="paper-section-title">Professional Summary</h2>
        <div class="paper-entry-desc">${escapeHtml(p.summary)}</div>
      </section>
    `;
  }

  // 3. Technical Skills Section
  if (resumeData.skills.length > 0) {
    if (s.template === 'academic') {
      html += `
        <section class="paper-section">
          <h2 class="paper-section-title">Technical Skills</h2>
          <div class="paper-skills-academic">
            ${resumeData.skills.map(sk => {
              if (sk.includes(':')) {
                const parts = sk.split(':');
                const cat = parts[0].trim();
                const val = parts.slice(1).join(':').trim();
                return `<div class="paper-skill-line"><strong>${escapeHtml(cat)}:</strong> ${escapeHtml(val)}</div>`;
              }
              return `<div class="paper-skill-line">${escapeHtml(sk)}</div>`;
            }).join('')}
          </div>
        </section>
      `;
    } else {
      html += `
        <section class="paper-section">
          <h2 class="paper-section-title">Skills</h2>
          <div class="paper-skills-list">
            ${resumeData.skills.map(sk => `<span class="paper-skill-item">${escapeHtml(sk)}</span>`).join('')}
          </div>
        </section>
      `;
    }
  }

  // 4. Projects Section
  const validProj = resumeData.projects.filter(pr => pr.projectName);
  if (validProj.length > 0) {
    html += `
      <section class="paper-section">
        <h2 class="paper-section-title">Projects</h2>
        ${validProj.map(proj => {
          if (s.template === 'academic') {
            return `
              <div class="paper-entry">
                <div class="paper-entry-title">${escapeHtml(proj.projectName)}${proj.techStack ? ` | ${escapeHtml(proj.techStack)}` : ''}${proj.role ? ` (${escapeHtml(proj.role)})` : ''}</div>
                ${proj.projectLink ? `<div style="font-size: 0.85em; color: var(--primary);">${escapeHtml(proj.projectLink)}</div>` : ''}
                ${proj.description ? formatDescriptionHTML(proj.description) : ''}
              </div>
            `;
          }
          return `
            <div class="paper-entry">
              <div class="paper-entry-header">
                <span class="paper-entry-title">${escapeHtml(proj.projectName)}</span>
                ${proj.role ? `<span class="paper-entry-date">${escapeHtml(proj.role)}</span>` : ''}
              </div>
              ${proj.techStack ? `<div class="paper-entry-subtitle">Tech Stack: ${escapeHtml(proj.techStack)}</div>` : ''}
              ${proj.projectLink ? `<div style="font-size: 0.85em; color: var(--primary);">${escapeHtml(proj.projectLink)}</div>` : ''}
              ${proj.description ? formatDescriptionHTML(proj.description) : ''}
            </div>
          `;
        }).join('')}
      </section>
    `;
  }

  // 5. Work Experience Section
  const validExp = resumeData.experience.filter(e => e.jobTitle || e.company);
  if (validExp.length > 0) {
    html += `
      <section class="paper-section">
        <h2 class="paper-section-title">Work Experience</h2>
        ${validExp.map(exp => `
          <div class="paper-entry">
            <div class="paper-entry-header">
              <span class="paper-entry-title">${escapeHtml(exp.jobTitle)}</span>
              <span class="paper-entry-date">${escapeHtml(exp.startDate)} ${exp.startDate || exp.endDate ? '–' : ''} ${escapeHtml(exp.endDate || (exp.isCurrent ? 'Present' : ''))}</span>
            </div>
            <div class="paper-entry-subtitle">${escapeHtml(exp.company)}${exp.location ? `, ${escapeHtml(exp.location)}` : ''}</div>
            ${exp.description ? formatDescriptionHTML(exp.description) : ''}
          </div>
        `).join('')}
      </section>
    `;
  }

  // 6. Certifications Section
  const validCerts = resumeData.certifications.filter(c => c.name);
  if (validCerts.length > 0) {
    if (s.template === 'academic') {
      html += `
        <section class="paper-section">
          <h2 class="paper-section-title">Certifications</h2>
          <ul class="paper-bullet-list">
            ${validCerts.map(c => `
              <li><strong>${escapeHtml(c.name)}</strong>${c.organization ? ` — ${escapeHtml(c.organization)}` : ''}${c.issueDate ? ` (${escapeHtml(c.issueDate)})` : ''}</li>
            `).join('')}
          </ul>
        </section>
      `;
    } else {
      html += `
        <section class="paper-section">
          <h2 class="paper-section-title">Certifications</h2>
          ${validCerts.map(c => `
            <div class="paper-entry">
              <div class="paper-entry-header">
                <span class="paper-entry-title">${escapeHtml(c.name)}</span>
                <span class="paper-entry-date">${escapeHtml(c.issueDate)}</span>
              </div>
              <div class="paper-entry-subtitle">${escapeHtml(c.organization)}</div>
              ${c.credentialUrl ? `<div style="font-size: 0.85em; color: var(--primary);">${escapeHtml(c.credentialUrl)}</div>` : ''}
            </div>
          `).join('')}
        </section>
      `;
    }
  }

  // 7. Education Section
  const validEdu = resumeData.education.filter(e => e.degree || e.institution);
  if (validEdu.length > 0) {
    html += `
      <section class="paper-section">
        <h2 class="paper-section-title">Education</h2>
        ${validEdu.map(edu => {
          const dateStr = [edu.startYear, edu.endYear].filter(Boolean).join(' – ');
          if (s.template === 'academic') {
            return `
              <div class="paper-entry">
                <div class="paper-entry-header">
                  <span class="paper-entry-title">${escapeHtml(edu.degree)}</span>
                  ${dateStr ? `<span class="paper-entry-date">${escapeHtml(dateStr)}</span>` : ''}
                </div>
                <div class="paper-entry-header">
                  <span class="paper-entry-subtitle">${escapeHtml(edu.institution)}${edu.location ? `, ${escapeHtml(edu.location)}` : ''}</span>
                  ${edu.grade ? `<span class="paper-entry-date">${escapeHtml(edu.grade)}</span>` : ''}
                </div>
                ${edu.description ? formatDescriptionHTML(edu.description) : ''}
              </div>
            `;
          }
          return `
            <div class="paper-entry">
              <div class="paper-entry-header">
                <span class="paper-entry-title">${escapeHtml(edu.degree)}</span>
                <span class="paper-entry-date">${escapeHtml(dateStr)}</span>
              </div>
              <div class="paper-entry-subtitle">${escapeHtml(edu.institution)}${edu.location ? `, ${escapeHtml(edu.location)}` : ''} ${edu.grade ? `(${escapeHtml(edu.grade)})` : ''}</div>
              ${edu.description ? formatDescriptionHTML(edu.description) : ''}
            </div>
          `;
        }).join('')}
      </section>
    `;
  }

  // 8. Achievements Section
  const validAch = resumeData.achievements.filter(a => a.title);
  if (validAch.length > 0) {
    if (s.template === 'academic') {
      html += `
        <section class="paper-section">
          <h2 class="paper-section-title">Achievements</h2>
          <ul class="paper-bullet-list">
            ${validAch.map(a => `
              <li><strong>${escapeHtml(a.title)}</strong>${a.description ? ` — ${escapeHtml(a.description)}` : ''}</li>
            `).join('')}
          </ul>
        </section>
      `;
    } else {
      html += `
        <section class="paper-section">
          <h2 class="paper-section-title">Achievements</h2>
          ${validAch.map(a => `
            <div class="paper-entry">
              <span class="paper-entry-title">${escapeHtml(a.title)}</span>
              ${a.description ? formatDescriptionHTML(a.description) : ''}
            </div>
          `).join('')}
        </section>
      `;
    }
  }

  // 9. Languages Section
  const validLangs = resumeData.languages.filter(l => l.name);
  if (validLangs.length > 0) {
    if (s.template === 'academic') {
      html += `
        <section class="paper-section">
          <h2 class="paper-section-title">Languages Known</h2>
          <div class="paper-languages-inline">
            ${validLangs.map(l => escapeHtml(l.proficiency ? `${l.name} (${l.proficiency})` : l.name)).join(' | ')}
          </div>
        </section>
      `;
    } else {
      html += `
        <section class="paper-section">
          <h2 class="paper-section-title">Languages</h2>
          <div class="paper-skills-list">
            ${validLangs.map(l => `<span class="paper-skill-item">${escapeHtml(l.name)} (${escapeHtml(l.proficiency)})</span>`).join('')}
          </div>
        </section>
      `;
    }
  }

  paper.innerHTML = html;
}

/* --- ATS CHECKER SCORE CALCULATOR --- */
function calculateATSScore() {
  let score = 0;
  const checks = [];

  const p = resumeData.personal;

  // Contact Info Checks (max 25 pts)
  if (p.fullName && p.fullName.trim()) { score += 5; checks.push({ text: 'Full Name provided', pass: true }); }
  else { checks.push({ text: 'Missing Full Name', pass: false }); }

  if (p.jobTitle && p.jobTitle.trim()) { score += 5; checks.push({ text: 'Professional Title present', pass: true }); }
  else { checks.push({ text: 'Add a clear target Job Title', pass: false }); }

  if (p.email && p.email.includes('@')) { score += 5; checks.push({ text: 'Valid Email address', pass: true }); }
  else { checks.push({ text: 'Missing Email address', pass: false }); }

  if (p.phone && p.phone.trim()) { score += 5; checks.push({ text: 'Phone Number included', pass: true }); }
  else { checks.push({ text: 'Missing Phone Number', pass: false }); }

  if (p.location && p.location.trim()) { score += 5; checks.push({ text: 'Location details specified', pass: true }); }
  else { checks.push({ text: 'Add City / Country location', pass: false }); }

  if (p.linkedin && p.linkedin.trim()) { score += 5; checks.push({ text: 'LinkedIn profile provided (Mandatory)', pass: true }); }
  else { checks.push({ text: 'Missing LinkedIn profile URL (Mandatory)', pass: false }); }

  if (p.github && p.github.trim()) { score += 5; checks.push({ text: 'GitHub profile provided (Mandatory)', pass: true }); }
  else { checks.push({ text: 'Missing GitHub profile URL (Mandatory)', pass: false }); }

  // Summary (15 pts)
  if (p.summary && p.summary.trim().length >= 40) { score += 15; checks.push({ text: 'Robust Professional Summary', pass: true }); }
  else { checks.push({ text: 'Expand summary (at least 40 characters)', pass: false }); }

  // Experience (20 pts)
  const expCount = resumeData.experience.filter(e => e.jobTitle).length;
  if (expCount >= 1) { score += 20; checks.push({ text: `${expCount} Experience entry/entries added`, pass: true }); }
  else { checks.push({ text: 'Add at least 1 Work Experience entry', pass: false }); }

  // Education (15 pts)
  const eduCount = resumeData.education.filter(e => e.degree).length;
  if (eduCount >= 1) { score += 15; checks.push({ text: 'Education details specified', pass: true }); }
  else { checks.push({ text: 'Add at least 1 Education entry', pass: false }); }

  // Skills (15 pts)
  const skillCount = resumeData.skills.length;
  if (skillCount >= 5) { score += 15; checks.push({ text: `${skillCount} Skills specified (Good ATS density)`, pass: true }); }
  else { checks.push({ text: 'Add at least 5 relevant technical/soft skills', pass: false }); }

  // Projects / Certifications Bonus (10 pts)
  if (resumeData.projects.length > 0 || resumeData.certifications.length > 0) {
    score += 10;
    checks.push({ text: 'Projects / Certifications section active', pass: true });
  } else {
    checks.push({ text: 'Add Projects or Certifications for extra ATS weight', pass: false });
  }

  // Update UI Elements
  const scoreText = document.getElementById('ats-score-text');
  const scoreCircle = document.getElementById('ats-score-circle');
  const checksList = document.getElementById('ats-checks-list');

  if (scoreText) scoreText.innerText = `${score}`;
  if (scoreCircle) {
    const angle = (score / 100) * 360;
    let color = 'var(--primary)';
    if (score < 50) color = 'var(--danger)';
    else if (score < 80) color = 'var(--warning)';
    else color = 'var(--success)';
    scoreCircle.style.background = `conic-gradient(${color} ${angle}deg, #e2e8f0 0deg)`;
  }

  if (checksList) {
    checksList.innerHTML = checks.map(c => `
      <div class="ats-check-item ${c.pass ? 'pass' : 'warn'}">
        <i class="fas ${c.pass ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${c.text}</span>
      </div>
    `).join('');
  }
}

/* --- KEYWORD SUGGESTION ENGINE --- */
function suggestKeywords() {
  const container = document.getElementById('keyword-chips-container');
  if (!container) return;

  const jobTitle = (resumeData.personal.jobTitle || '').toLowerCase();
  let suggestions = [];

  // Match title keywords
  Object.keys(KEYWORD_DICTIONARY).forEach(key => {
    if (jobTitle.includes(key)) {
      suggestions = suggestions.concat(KEYWORD_DICTIONARY[key]);
    }
  });

  // Default fallback keywords if no specific match
  if (suggestions.length === 0) {
    suggestions = ['Communication', 'Project Management', 'Problem Solving', 'Teamwork', 'Git', 'Agile', 'Leadership', 'Critical Thinking'];
  }

  // Deduplicate and filter out already added skills
  const filteredSuggestions = [...new Set(suggestions)].filter(s => !resumeData.skills.includes(s));

  container.innerHTML = filteredSuggestions.map(kw => `
    <button type="button" class="keyword-chip-btn" onclick="addSkill('${escapeHtml(kw)}')">+ ${escapeHtml(kw)}</button>
  `).join('');
}

/* --- LOCALSTORAGE SAVE / LOAD / CLEAR --- */
function autoSaveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
  } catch (e) {
    console.error('LocalStorage error:', e);
  }
}

function saveResumeManually() {
  autoSaveData();
  showToast('Resume saved successfully!', 'success');
}

function loadSavedResume(silent = false) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      resumeData = parsed;
      populateFormFromData();
      updatePreview();
      calculateATSScore();
      suggestKeywords();
      if (!silent) showToast('Resume loaded from local storage!', 'success');
      return true;
    }
  } catch (e) {
    console.error('Failed to parse local storage data:', e);
  }
  if (!silent) showToast('No saved resume found.', 'danger');
  return false;
}

function loadSampleData() {
  resumeData = JSON.parse(JSON.stringify(SAMPLE_DATA));
  populateFormFromData();
  autoSaveData();
  updatePreview();
  calculateATSScore();
  suggestKeywords();
  showToast('Sample resume data filled!', 'success');
}

/* Modal Confirmation for Clear */
function openClearModal() {
  const modal = document.getElementById('clear-modal');
  if (modal) modal.classList.add('active');
}

function closeClearModal() {
  const modal = document.getElementById('clear-modal');
  if (modal) modal.classList.remove('active');
}

function confirmClearResume() {
  resumeData = {
    personal: { fullName: '', jobTitle: '', email: '', phone: '', location: '', linkedin: '', github: '', portfolio: '', summary: '', photoUrl: '' },
    education: [],
    experience: [],
    projects: [],
    skills: [],
    certifications: [],
    languages: [],
    achievements: [],
    settings: { template: 'classic', font: 'inter', fontSize: 'medium', lineSpacing: 'normal' }
  };
  localStorage.removeItem(STORAGE_KEY);
  populateFormFromData();
  updatePreview();
  calculateATSScore();
  suggestKeywords();
  closeClearModal();
  showToast('All resume data cleared.', 'danger');
}

/* --- EXPORT FUNCTIONALITIES --- */

/* PDF Export using html2pdf.js directly on live resume paper */
function downloadPDF() {
  const paper = document.getElementById('resume-paper');
  if (!paper) {
    showToast('Resume preview paper element not found!', 'danger');
    return;
  }

  if (typeof html2pdf === 'undefined') {
    showToast('PDF library could not be loaded. Opening print window...', 'danger');
    printResume();
    return;
  }

  const rawName = (resumeData.personal.fullName || 'Resume').trim();
  const cleanName = rawName.replace(/[^a-zA-Z0-9_-]/g, '_') || 'Resume';
  const filename = `${cleanName}_Resume.pdf`;

  showToast(`Generating PDF "${filename}"... Please wait.`, 'success');

  const scrollBox = document.getElementById('resume-paper-container');

  // Preserve original preview styles
  const originalTransform = paper.style.transform;
  const originalBoxShadow = paper.style.boxShadow;
  const originalMargin = paper.style.margin;
  const originalMinHeight = paper.style.minHeight;
  const originalHeight = paper.style.height;
  const originalMaxHeight = scrollBox ? scrollBox.style.maxHeight : '';
  const originalOverflow = scrollBox ? scrollBox.style.overflow : '';

  // Temporarily reset preview constraints & height so html2canvas captures exact content without extra page overflow
  if (scrollBox) {
    scrollBox.style.maxHeight = 'none';
    scrollBox.style.overflow = 'visible';
  }
  paper.style.transform = 'none';
  paper.style.boxShadow = 'none';
  paper.style.margin = '0 auto';
  paper.style.minHeight = 'auto';
  paper.style.height = 'auto';

  const opt = {
    margin: 0,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      scrollX: 0,
      scrollY: 0
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  html2pdf().set(opt).from(paper).toPdf().get('pdf').then((pdf) => {
    const blob = pdf.output('blob');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (a.parentNode) document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 250);
    showToast(`PDF downloaded successfully as "${filename}"!`, 'success');
  }).catch(err => {
    console.error('PDF Export error:', err);
    printResume();
  }).finally(() => {
    paper.style.transform = originalTransform;
    paper.style.boxShadow = originalBoxShadow;
    paper.style.margin = originalMargin;
    paper.style.minHeight = originalMinHeight;
    paper.style.height = originalHeight;
    if (scrollBox) {
      scrollBox.style.maxHeight = originalMaxHeight;
      scrollBox.style.overflow = originalOverflow;
    }
  });
}

/* Word (.docx) Export */
function downloadWord() {
  const element = document.getElementById('resume-paper');
  if (!element) {
    showToast('Resume paper element not found!', 'danger');
    return;
  }

  const rawName = (resumeData.personal.fullName || 'Resume').trim();
  const cleanName = rawName.replace(/[^a-zA-Z0-9_-]/g, '_') || 'Resume';
  const filename = `${cleanName}_Resume.docx`;

  showToast(`Generating Word document "${filename}"...`, 'success');

  const wordContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
    <meta charset='utf-8'>
    <title>${escapeHtml(rawName)} Resume</title>
    <!--[if gte mso 9]>
    <xml>
     <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForCustomXSL/>
     </w:WordDocument>
    </xml>
    <![endif]-->
    <style>
      @page {
        size: 210mm 297mm;
        margin: 15mm 15mm 15mm 15mm;
      }
      body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10.5pt;
        line-height: 1.4;
        color: #000000;
      }
      h1, .paper-name {
        font-size: 18pt;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 4pt;
      }
      .paper-title {
        font-size: 11pt;
        font-weight: bold;
        text-align: center;
        margin-bottom: 4pt;
      }
      .paper-contact {
        text-align: center;
        font-size: 9.5pt;
        margin-bottom: 12pt;
        border-bottom: 1.5pt solid #000000;
        padding-bottom: 6pt;
      }
      h2, .paper-section-title {
        font-size: 11pt;
        font-weight: bold;
        text-transform: uppercase;
        border-top: 1.5pt solid #000000;
        padding-top: 4pt;
        margin-top: 10pt;
        margin-bottom: 6pt;
      }
      .paper-entry {
        margin-bottom: 6pt;
      }
      .paper-entry-header {
        font-weight: bold;
      }
      .paper-entry-title {
        font-weight: bold;
      }
      ul, .paper-bullet-list {
        margin-top: 2pt;
        margin-bottom: 4pt;
        padding-left: 18pt;
      }
      li {
        margin-bottom: 2pt;
      }
      .paper-skill-line {
        margin-bottom: 3pt;
      }
      .paper-languages-inline {
        font-size: 10pt;
      }
    </style>
    </head>
    <body>
      ${element.innerHTML}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + wordContent], {
    type: 'application/vnd.ms-word;charset=utf-8'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    if (a.parentNode) document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Word document downloaded as "${filename}"!`, 'success');
  }, 200);
}

/* Print Resume using isolated iframe */
function printResume() {
  const paper = document.getElementById('resume-paper');
  if (!paper) return;

  const rawName = (resumeData.personal.fullName || 'Resume').trim();

  showToast('Preparing clean print view...', 'success');

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${escapeHtml(rawName)} Resume</title>
      <link rel="stylesheet" href="css/style.css">
      <style>
        body { background: #ffffff !important; margin: 0; padding: 0; }
        .resume-paper { width: 100% !important; max-width: none !important; box-shadow: none !important; margin: 0 !important; padding: 15mm 15mm 12mm 15mm !important; }
        @page { size: A4 portrait; margin: 0; }
      </style>
    </head>
    <body class="template-${resumeData.settings.template} font-${resumeData.settings.font} size-${resumeData.settings.fontSize} spacing-${resumeData.settings.lineSpacing}">
      ${paper.innerHTML}
    </body>
    </html>
  `);
  doc.close();

  iframe.contentWindow.focus();
  setTimeout(() => {
    iframe.contentWindow.print();
    setTimeout(() => {
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
    }, 1000);
  }, 400);
}

/* --- TOAST NOTIFICATIONS HELPER --- */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* Safe HTML string escaper */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
