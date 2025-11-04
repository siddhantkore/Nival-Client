import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setIsAuthenticated(true);
    loadData();
  }, [navigate]);

  const loadData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const [jobsRes, contactsRes, applicationsRes] = await Promise.all([
        fetch("http://localhost:3000/api/v1/jobs/all"),
        fetch("http://localhost:3000/api/v1/contact/all", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("http://localhost:3000/api/v1/applications/all", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        setJobs(jobsData.data?.jobs || []);
      }
      if (contactsRes.ok) {
        const contactsData = await contactsRes.json();
        setContacts(contactsData.data?.contacts || []);
      }
      if (applicationsRes.ok) {
        const applicationsData = await applicationsRes.json();
        setApplications(applicationsData.data?.applications || []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/api/v1/jobs/${jobId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setJobs(jobs.filter(job => job._id !== jobId));
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "jobs"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Job Postings ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "contacts"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Contact Forms ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "applications"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Job Applications ({applications.length})
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {activeTab === "jobs" && (
              <JobsTab jobs={jobs} onDelete={handleDeleteJob} onRefresh={loadData} />
            )}
            {activeTab === "contacts" && <ContactsTab contacts={contacts} />}
            {activeTab === "applications" && <ApplicationsTab applications={applications} />}
          </>
        )}
      </div>
    </div>
  );
}

function JobsTab({ jobs, onDelete, onRefresh }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    role: "",
    location: { location: "", mode: "remote" },
    description: "",
    requirements: [],
    benefits: [],
    other: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/api/v1/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Job created successfully!");
        setShowAddForm(false);
        setFormData({
          title: "",
          role: "",
          location: { location: "", mode: "remote" },
          description: "",
          requirements: [],
          benefits: [],
          other: ""
        });
        onRefresh();
      }
    } catch (error) {
      alert("Failed to create job");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Job Postings</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showAddForm ? "Cancel" : "+ Add New Job"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Add New Job</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Job Title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Role"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Location"
                required
                value={formData.location.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, location: e.target.value }
                  })
                }
                className="px-4 py-2 border rounded-lg"
              />
              <select
                value={formData.location.mode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, mode: e.target.value }
                  })
                }
                className="px-4 py-2 border rounded-lg"
              >
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>
            <textarea
              placeholder="Job Description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Job
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                <p className="text-gray-600">{job.role} • {job.location.location} • {job.location.mode}</p>
                <p className="text-gray-700 mt-2">{job.description}</p>
              </div>
              <button
                onClick={() => onDelete(job._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsTab({ contacts }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Forms</h2>
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact._id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {contact.name} {contact.lastName}
                </h3>
                <p className="text-gray-600">{contact.email}</p>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(contact.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 mt-2">{contact.query}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApplicationsTab({ applications }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Applications</h2>
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app._id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{app.fullName}</h3>
                <p className="text-gray-600">{app.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Applied for: {app.jobId?.title || "Unknown Position"}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                app.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                app.status === "shortlisted" ? "bg-blue-100 text-blue-800" :
                app.status === "rejected" ? "bg-red-100 text-red-800" :
                "bg-green-100 text-green-800"
              }`}>
                {app.status}
              </span>
            </div>
            {app.coverLetter && (
              <p className="text-gray-700 mt-2">{app.coverLetter}</p>
            )}
            {app.resume && (
              <a
                href={app.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                View Resume
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

