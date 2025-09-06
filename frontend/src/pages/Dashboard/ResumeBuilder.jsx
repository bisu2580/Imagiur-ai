import { useRef, useState } from "react";
import { downloadPdf, downloadImage } from "../../utils/resumeUtils";
import {
  User,
  Phone,
  Mail,
  Linkedin,
  Home,
  Briefcase,
  PlusCircle,
  Trash2,
  Bold,
  Underline,
  Italic,
  Download,
  Image,
} from "lucide-react";
import toast from "react-hot-toast";
import "./resume.css";
import { useResume } from "../../hooks/useResume";
import { InputField } from "../../helpers/helpers";

const A4_PAGE_HEIGHT_PX = 1123;

const ResumeBuilder = () => {
  const {
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
    removeArrayItem,
    addEducation,
    addProject,
    addCertification,
    handlePointChange,
    addPoint,
    removePoint,
    setEducation,
    setProjects,
    setCertifications,
    setSkills,
  } = useResume();

  const [active, setActive] = useState({
    bold: false,
    underline: false,
    italic: false,
  });
  const toggle = (key) => {
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Feature Coming Soon!!");
  };

  const resumeRef = useRef(null);
  const printableResumeRef = useRef(null);

  const SectionHeader = ({ title, subtitle, isPresent }) => (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-md md:text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
      <div>
        {isPresent === "true" && (
          <div className="flex items-center gap-1 p-1 bg-black/30 border border-white/10 rounded-lg">
            <button
              className={`
              p-2 rounded-md text-gray-300 hover:bg-purple-600/50 hover:text-white transition-colors  ${
                active.bold
                  ? "bg-gradient-to-r from-indigo-600/70 to-purple-600/60 text-white"
                  : ""
              }`}
              title="Bold"
              onClick={() => toggle("bold")}
            >
              <Bold size={18} />
            </button>
            <button
              className={`
              p-2 rounded-md text-gray-300 hover:bg-purple-600/50 hover:text-white transition-colors ${
                active.underline
                  ? "bg-gradient-to-r from-indigo-600/70 to-purple-600/60 text-white"
                  : ""
              }`}
              onClick={() => toggle("underline")}
            >
              <Underline size={18} />
            </button>
            <button
              className={`
              p-2 rounded-md text-gray-300 hover:bg-purple-600/50 hover:text-white transition-colors
               ${
                 active.italic
                   ? "bg-gradient-to-r from-indigo-600/70 to-purple-600/60 text-white"
                   : ""
               }`}
              onClick={() => toggle("italic")}
            >
              <Italic size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const handleDownloadClick = (type) => {
    const filename = `${profile.name || "resume"}.${type}`;
    if (type === "pdf") downloadPdf(printableResumeRef, filename);
    else downloadImage(printableResumeRef, filename);
  };

  const hasSkillsToShow = skills.some((skill) =>
    skill.points.some((point) => point.trim() !== "")
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-[#0a001a] text-white hide-scrollbar">
      {/* --- Left Panel: Controls --- */}
      <aside
        className="lg:w-1/3 w-full bg-black/20 p-4 md:p-6 border-r border-white/10 overflow-y-auto custom-scrollbar space-y-3 lg:space-y-8"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorY: "contain",
        }}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center">
          Resume Builder
        </h2>
        <div className="flex items-center justify-center gap-4 pb-2 lg:pb-0">
          <button
            onClick={() => handleDownloadClick("pdf")}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-semibold shadow-lg transition hover:from-purple-500 hover:to-blue-500"
          >
            <Download size={16} />
            PDF
          </button>
          <button
            onClick={() => handleDownloadClick("png")}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-sm font-semibold shadow-lg transition hover:from-emerald-500 hover:to-teal-500"
          >
            <Image size={16} />
            Image
          </button>
        </div>
        {/* Profile Section */}
        <section className="space-y-4 lg:p-0">
          <SectionHeader
            title="Personal Details"
            subtitle="Let's start with the basics"
          />
          <div className="flex items-center gap-4">
            {profile.imageUrl ? (
              <img
                src={profile.imageUrl}
                alt="Profile"
                className="size-16 rounded-full object-cover"
              />
            ) : (
              <div className="size-16 rounded-full bg-white/10 flex items-center justify-center">
                <User size={24} className="text-gray-400" />
              </div>
            )}
            <label className="flex-1 cursor-pointer text-center bg-white/10 px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors">
              Upload Photo
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <InputField
            icon={<User size={16} className="text-gray-400" />}
            placeholder="Full Name"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
          />
          <InputField
            icon={<Briefcase size={16} className="text-gray-400" />}
            placeholder="Professional Title"
            name="title"
            value={profile.title}
            onChange={handleProfileChange}
          />
          <InputField
            icon={<Phone size={16} className="text-gray-400" />}
            placeholder="Phone Number"
            name="phone"
            value={profile.phone}
            onChange={handleProfileChange}
          />
          <InputField
            icon={<Mail size={16} className="text-gray-400" />}
            placeholder="Email Address"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
          />
          <InputField
            icon={<Home size={16} className="text-gray-400" />}
            placeholder="Address"
            name="address"
            value={profile.address}
            onChange={handleProfileChange}
          />
          <InputField
            icon={<Linkedin size={16} className="text-gray-400" />}
            placeholder="LinkedIn Profile URL"
            name="linkedin"
            value={profile.linkedin}
            onChange={handleProfileChange}
          />
        </section>

        {/* Summary Section */}
        <section className="space-y-4 lg:p-0">
          <SectionHeader
            title="Summary"
            subtitle="A brief professional overview"
            isPresent="true"
          />
          <textarea
            placeholder="Write a short summary about yourself..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full h-24 p-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
          />
        </section>

        {/* Education Section */}
        <section className="space-y-4 lg:p-0">
          <SectionHeader
            title="Education"
            subtitle="Your academic background"
          />
          {education.map((edu, index) => (
            <div
              key={index}
              className="p-3 bg-white/5 rounded-lg space-y-3 relative"
            >
              <InputField
                placeholder="School/University"
                name="school"
                value={edu.school}
                onChange={(e) => handleArrayChange(setEducation, index, e)}
              />
              <InputField
                placeholder="Degree/Field of Study"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleArrayChange(setEducation, index, e)}
              />
              <InputField
                placeholder="Year of Completion"
                name="year"
                value={edu.year}
                onChange={(e) => handleArrayChange(setEducation, index, e)}
              />
              <button
                onClick={() => removeArrayItem(setEducation, index)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-300"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={addEducation}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
          >
            <PlusCircle size={16} /> Add Education
          </button>
        </section>

        {/*Skills Section */}
        <section className="space-y-4 lg:p-0">
          <SectionHeader title="Skills" subtitle="Your expertise" />
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-3 bg-white/5 rounded-lg space-y-3 relative"
            >
              <div className="pl-4 space-y-2">
                <p className="text-xs text-gray-400">Skill Points</p>
                {skill.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Point ${pointIndex + 1}`}
                      value={point}
                      onChange={(e) =>
                        handlePointChange(
                          setSkills,
                          index,
                          pointIndex,
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-1 bg-black/40 border border-white/10 rounded-md text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                    />
                    <button
                      onClick={() => removePoint(setSkills, index, pointIndex)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addPoint(setSkills, index)}
                  className="text-xs flex items-center gap-1 text-purple-400 hover:text-purple-300"
                >
                  <PlusCircle size={14} /> Add Point
                </button>
              </div>
            </div>
          ))}
        </section>
        {/*Projects Section */}
        <section className="space-y-4 lg:p-0">
          <SectionHeader title="Projects" subtitle="Your Creativity" />
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-3 bg-white/5 rounded-lg space-y-3 relative"
            >
              <InputField
                placeholder="Project Name"
                name="name"
                value={project.name}
                onChange={(e) => handleArrayChange(setProjects, index, e)}
              />
              <InputField
                placeholder="Project Description"
                name="description"
                value={project.description}
                onChange={(e) => handleArrayChange(setProjects, index, e)}
              />
              <div className="pl-4 space-y-2">
                <p className="text-xs text-gray-400">
                  Key Points/Achievements:
                </p>
                {project.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Point ${pointIndex + 1}`}
                      value={point}
                      onChange={(e) =>
                        handlePointChange(
                          setProjects,
                          index,
                          pointIndex,
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-1 bg-black/40 border border-white/10 rounded-md text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                    />
                    <button
                      onClick={() =>
                        removePoint(setProjects, index, pointIndex)
                      }
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addPoint(setProjects, index)}
                  className="text-xs flex items-center gap-1 text-purple-400 hover:text-purple-300"
                >
                  <PlusCircle size={14} /> Add Point
                </button>
              </div>

              <button
                onClick={() => removeArrayItem(setProjects, index)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-300"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={addProject}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
          >
            <PlusCircle size={16} /> Add Projects
          </button>
        </section>

        <section className="space-y-4 lg:p-0 lg:pb-2">
          <SectionHeader
            title="Certification"
            subtitle="Show off your skills"
          />
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="p-3 bg-white/5 rounded-lg space-y-3 relative"
            >
              <InputField
                placeholder="Certification Heading"
                name="name"
                value={cert.name}
                onChange={(e) => handleArrayChange(setCertifications, index, e)}
              />
              <InputField
                placeholder="Certification year"
                name="year"
                value={cert.year}
                onChange={(e) => handleArrayChange(setCertifications, index, e)}
              />
              <button
                onClick={() => removeArrayItem(setCertifications, index)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-300"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={addCertification}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
          >
            <PlusCircle size={16} /> Add Certification
          </button>
        </section>
      </aside>

      <main className="resume-main custom-scrollbar">
        <div ref={resumeRef} className="resume-container lg:block hidden">
          {/* Header */}
          <header className="resume-header">
            <div className="resume-info">
              <h1 className="resume-name">{profile.name}</h1>
              <p className="resume-title">{profile.title}</p>
              <div className="resume-contact">
                <div className="resume-contact-container">
                  {profile.phone && (
                    <a href={`tel:${profile.phone}`}>
                      Phone: <span>{profile.phone}</span>
                    </a>
                  )}
                  {profile.email && (
                    <a href={`mailto:${profile.email}`}>
                      Email: <span>{profile.email}</span>
                    </a>
                  )}
                </div>
                <div className="resume-contact-container">
                  {profile.address && <span>Address: {profile.address}</span>}
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#2563eb", cursor: "pointer" }}
                    >
                      LinkedIn Profile
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div
              className={`resume-image ${profile.imageUrl ? "bordered" : ""}`}
            >
              {profile.imageUrl && <img src={profile.imageUrl} alt="Profile" />}
            </div>
          </header>

          {/* Body */}
          <div className="resume-body">
            {/* Summary */}
            {summary && (
              <section className="resume-section">
                <h2>Summary</h2>
                <p>{summary}</p>
              </section>
            )}

            {/* Education */}
            {education[0].school && (
              <section className="resume-section">
                <h2>Education</h2>
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="resume-heading">{edu.school}</h3>
                    <p className="italic">{edu.degree}</p>
                    <p className="muted">{edu.year}</p>
                  </div>
                ))}
              </section>
            )}

            {hasSkillsToShow && (
              <section className="resume-section">
                <h2>Skills</h2>
                {skills.map((skill, index) => (
                  <ul key={index}>
                    {skill.points.map(
                      (point, pointIndex) =>
                        point && <li key={pointIndex}>{point}</li>
                    )}
                  </ul>
                ))}
              </section>
            )}

            {projects[0].name && (
              <section className="resume-section projects">
                <h2>Projects</h2>
                {projects.map((proj, index) => (
                  <div key={index}>
                    <h3 className="resume-heading">{proj.name}</h3>
                    <p className="strong">{proj.description}</p>
                    <ul>
                      {proj.points.map(
                        (point, pointIndex) =>
                          point && <li key={pointIndex}>{point}</li>
                      )}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {certifications[0].name && (
              <section className="certification-section">
                <h2 className="certification-heading">Certifications</h2>
                {certifications.map((cert, index) => (
                  <div key={index} className="cert-item">
                    <a href="#">
                      <h3>{cert.name}</h3>
                    </a>
                    <p>{cert.year}</p>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
        <div
          ref={printableResumeRef}
          className="resume-container printable-resume"
        >
          {/* Header */}
          <header className="resume-header">
            <div className="resume-info">
              <h1 className="resume-name">{profile.name}</h1>
              <p className="resume-title">{profile.title}</p>
              <div className="resume-contact">
                <div className="resume-contact-container">
                  {profile.phone && (
                    <a href={`tel:${profile.phone}`}>
                      Phone: <span>{profile.phone}</span>
                    </a>
                  )}
                  {profile.email && (
                    <a href={`mailto:${profile.email}`}>
                      Email: <span>{profile.email}</span>
                    </a>
                  )}
                </div>
                <div className="resume-contact-container">
                  {profile.address && <span>Address: {profile.address}</span>}
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#2563eb" }}
                    >
                      LinkedIn Profile
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div
              className={`resume-image ${profile.imageUrl ? "bordered" : ""}`}
            >
              {profile.imageUrl && <img src={profile.imageUrl} alt="Profile" />}
            </div>
          </header>

          {/* Body */}
          <div className="resume-body">
            {/* Summary */}
            {summary && (
              <section className="resume-section">
                <h2>Summary</h2>
                <p>{summary}</p>
              </section>
            )}

            {/* Education */}
            {education[0].school && (
              <section className="resume-section">
                <h2>Education</h2>
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="resume-heading">{edu.school}</h3>
                    <p className="italic">{edu.degree}</p>
                    <p className="muted">{edu.year}</p>
                  </div>
                ))}
              </section>
            )}

            {hasSkillsToShow && (
              <section className="resume-section">
                <h2>Skills</h2>
                {skills.map((skill, index) => (
                  <ul key={index}>
                    {skill.points.map(
                      (point, pointIndex) =>
                        point && <li key={pointIndex}>{point}</li>
                    )}
                  </ul>
                ))}
              </section>
            )}

            {projects[0].name && (
              <section className="resume-section projects">
                <h2>Projects</h2>
                {projects.map((proj, index) => (
                  <div key={index}>
                    <h3 className="resume-heading">{proj.name}</h3>
                    <p className="strong">{proj.description}</p>
                    <ul>
                      {proj.points.map(
                        (point, pointIndex) =>
                          point && <li key={pointIndex}>{point}</li>
                      )}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {certifications[0].name && (
              <section className="certification-section">
                <h2 className="certification-heading">Certifications</h2>
                {certifications.map((cert, index) => (
                  <div key={index} className="cert-item">
                    <a href="#">
                      <h3>{cert.name}</h3>
                    </a>
                    <p>{cert.year}</p>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeBuilder;
