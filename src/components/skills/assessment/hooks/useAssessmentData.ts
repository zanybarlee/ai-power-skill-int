
import { useState, useEffect } from "react";

export const useAssessmentData = () => {
  const [assessments, setAssessments] = useState([
    {
      id: "tech-1",
      title: "Technical Skills Assessment",
      description: "Evaluate proficiency in programming, database management, and system architecture",
      duration: "45 mins",
      questions: 35,
      status: "ready"
    },
    {
      id: "soft-1",
      title: "Soft Skills Evaluation",
      description: "Assess communication, teamwork, problem-solving, and leadership capabilities",
      duration: "30 mins",
      questions: 25,
      status: "ready"
    },
    {
      id: "mgmt-1",
      title: "Management Competency",
      description: "Evaluate strategic planning, team management, and delegation skills",
      duration: "60 mins",
      questions: 40,
      status: "ready"
    },
    {
      id: "ai-1",
      title: "AI & Data Science Knowledge",
      description: "Assess understanding of AI concepts, machine learning, and data analytics",
      duration: "50 mins",
      questions: 30,
      status: "ready"
    }
  ]);

  return { assessments };
};
