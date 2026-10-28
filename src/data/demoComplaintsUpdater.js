const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join(__dirname, 'demoComplaints.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Mapping of case IDs to their subjects and regions
const caseData = {
  'CASE-2024-001': {
    subject: 'Original Certificates Not Returned',
    region: 'Coimbatore',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210'
  },
  'CASE-2024-002': {
    subject: 'Academic Documents Withheld',
    region: 'Chennai',
    email: 'priya.sharma@email.com',
    phone: '+91 98234 56789'
  },
  'CASE-2024-003': {
    subject: 'Unauthorized Fee for Certificate Release',
    region: 'Madurai',
    email: 'arjun.reddy@email.com',
    phone: '+91 97123 45678'
  },
  'CASE-2024-004': {
    subject: 'Excess Fee Charged Without Disclosure',
    region: 'Salem',
    email: 'sneha.patel@email.com',
    phone: '+91 96543 21098'
  },
  'CASE-2024-005': {
    subject: 'Frequent Faculty Absence',
    region: 'Tiruchirappalli',
    email: 'vikram.singh@email.com',
    phone: '+91 95432 10987'
  },
  'CASE-2024-006': {
    subject: 'Examination Marks Error',
    region: 'Vellore',
    email: 'ananya.nair@email.com',
    phone: '+91 94321 09876'
  },
  'CASE-2024-007': {
    subject: 'Poor Laboratory Infrastructure',
    region: 'Erode',
    email: 'karthik.iyer@email.com',
    phone: '+91 93210 98765'
  },
  'CASE-2024-008': {
    subject: 'Unfair Admission Denial',
    region: 'Coimbatore',
    email: 'divya.menon@email.com',
    phone: '+91 92109 87654'
  },
  'CASE-2024-009': {
    subject: 'Ragging Incident Unreported',
    region: 'Chennai',
    email: 'arun.kumar@email.com',
    phone: '+91 91098 76543'
  },
  'CASE-2023-010': {
    subject: 'Certificates Withheld Due to False Dues',
    region: 'Thanjavur',
    email: 'meera.krishnan@email.com',
    phone: '+91 90987 65432'
  },
  'CASE-2024-011': {
    subject: 'Unauthorized Additional Fees',
    region: 'Tiruppur',
    email: 'rahul.verma@email.com',
    phone: '+91 89876 54321'
  },
  'CASE-2024-012': {
    subject: 'Non-Functional Lab Equipment',
    region: 'Madurai',
    email: 'lakshmi.raman@email.com',
    phone: '+91 88765 43210'
  },
  'CASE-2023-013': {
    subject: 'Transcript Denial Without Reason',
    region: 'Dindigul',
    email: 'suresh.babu@email.com',
    phone: '+91 87654 32109'
  },
  'CASE-2024-014': {
    subject: 'Caste-Based Discrimination',
    region: 'Tirunelveli',
    email: 'priya.devi@email.com',
    phone: '+91 86543 21098'
  },
  'CASE-2024-015': {
    subject: 'Insufficient Qualified Faculty',
    region: 'Chennai',
    email: 'vijay.kumar@email.com',
    phone: '+91 85432 10987'
  },
  'CASE-2024-016': {
    subject: 'Examination Paper Leak',
    region: 'Coimbatore',
    email: 'deepa.singh@email.com',
    phone: '+91 84321 09876'
  },
  'CASE-2024-017': {
    subject: 'Unsafe Hostel Building',
    region: 'Vellore',
    email: 'naveen.raj@email.com',
    phone: '+91 83210 98765'
  },
  'CASE-2024-018': {
    subject: 'Caution Deposit Not Refunded',
    region: 'Salem',
    email: 'kavya.reddy@email.com',
    phone: '+91 82109 87654'
  },
  'CASE-2023-019': {
    subject: 'Mark Sheets Not Provided',
    region: 'Erode',
    email: 'harish.kumar@email.com',
    phone: '+91 81098 76543'
  },
  'CASE-2024-020': {
    subject: 'Repeated Exam Postponement',
    region: 'Madurai',
    email: 'swati.sharma@email.com',
    phone: '+91 80987 65432'
  }
};

// Update each complaint
for (const [caseId, data] of Object.entries(caseData)) {
  // Find the pattern for this case ID
  const casePattern = `caseId: '${caseId}',`;
  const caseIndex = content.indexOf(casePattern);

  if (caseIndex !== -1) {
    // Find submittedById line after this caseId
    const submittedByPattern = /submittedById: 'user-student-1',/g;
    let match;
    let targetIndex = -1;

    while ((match = submittedByPattern.exec(content)) !== null) {
      if (match.index > caseIndex) {
        targetIndex = match.index + match[0].length;
        break;
      }
    }

    if (targetIndex !== -1) {
      // Check if fields already exist
      const nextLines = content.substring(targetIndex, targetIndex + 300);
      if (!nextLines.includes('submitterEmail:')) {
        const newFields = `\n    submitterEmail: '${data.email}',\n    submitterPhone: '${data.phone}',\n    submitterRegion: '${data.region}',\n    subject: '${data.subject}',`;
        content = content.substring(0, targetIndex) + newFields + content.substring(targetIndex);
      }
    }
  }
}

// Write back
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Updated all complaints with detailed information!');
