import { useState } from "react";
import toast from "react-hot-toast";
const initialEducation = { school: "", degree: "", year: "" };
const initialProject = { name: "", description: "", points: [""] };
const initialCertification = { name: "", year: "" };
const initialSkill = { points: [""] };
export const useResume = () => {
  const [profile, setProfile] = useState({
    name: "Your Name",
    title: "Your Professional Title",
    phone: "",
    email: "",
    address: "",
    linkedin: "",
    imageUrl: "",
  });
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState([initialEducation]);
  const [projects, setProjects] = useState([initialProject]);
  const [certifications, setCertifications] = useState([initialCertification]);
  const [skills, setSkills] = useState([initialSkill]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected or access denied.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, imageUrl: reader.result }));
      toast.success("Image Added!!");
    };
    reader.onerror = (error) => {
      console.error("FileReader error:", error);
      toast.error("Error reading the file.");
    };
    reader.readAsDataURL(file);
  };
  const handleArrayChange = (setter, index, e) => {
    const { name, value } = e.target;
    setter((prev) => {
      const newArr = [...prev];
      newArr[index] = { ...newArr[index], [name]: value };
      return newArr;
    });
  };

  //   functions to add/remove items from any section
  const addArrayItem = (setter, newItem) => {
    setter((prev) => [...prev, newItem]);
  };
  const removeArrayItem = (setter, index) => {
    setter((prev) => {
      if (prev.length === 1) {
        toast.error("You must have at least one item!");
        return prev;
      }
      prev.filter((_, i) => i !== index);
    });
  };

  const handlePointChange = (setter, sectionIndex, pointIndex, value) => {
    setter((prev) => {
      const newSection = [...prev];
      const newPoints = [...newSection[sectionIndex].points];
      newPoints[pointIndex] = value;
      newSection[sectionIndex] = {
        ...newSection[sectionIndex],
        points: newPoints,
      };
      return newSection;
    });
  };

  const addPoint = (setter, sectionIndex) => {
    setter((prev) => {
      const newSection = [...prev];
      const newPoints = [...newSection[sectionIndex].points, ""];
      newSection[sectionIndex] = {
        ...newSection[sectionIndex],
        points: newPoints,
      };
      return newSection;
    });
  };

  const removePoint = (setter, sectionIndex, pointIndex) => {
    setter((prev) => {
      const newSection = [...prev];
      const newPoints = newSection[sectionIndex].points.filter(
        (_, i) => i !== pointIndex
      );
      newSection[sectionIndex] = {
        ...newSection[sectionIndex],
        points: newPoints,
      };
      return newSection;
    });
  };

  return {
    profile,
    summary,
    education,
    projects,
    certifications,
    skills,
    setSummary,
    handleProfileChange,
    handleImageUpload,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    addEducation: () => addArrayItem(setEducation, initialEducation),
    addProject: () => addArrayItem(setProjects, initialProject),
    addCertification: () =>
      addArrayItem(setCertifications, initialCertification),
    handlePointChange,
    addPoint,
    removePoint,
    setEducation,
    setProjects,
    setCertifications,
    setSkills,
  };
};
