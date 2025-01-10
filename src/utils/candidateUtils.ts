export interface CandidateSkills {
  skills?: string[];
}

export const normalizeSkills = (skills: unknown): string[] => {
  if (Array.isArray(skills)) {
    return skills.map(skill => String(skill));
  }
  
  if (typeof skills === 'object' && skills !== null) {
    const skillsObj = skills as CandidateSkills;
    if (Array.isArray(skillsObj.skills)) {
      return skillsObj.skills.map(skill => String(skill));
    }
  }
  
  return [];
};