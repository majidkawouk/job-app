"use client";

import { useUser } from "@/components/UserContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppForm from "./AppForm";

export default function Dashboard() {
  const { user } = useUser();
  const [applications, setApplications] = useState([]);
  const [showAddingForm, setShowAddingForm] = useState(false);
  const router = useRouter();

  const fetchApplications = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    const userObj = JSON.parse(storedUser);

    try {
      const response = await fetch(
        `https://job-app-7nxq.onrender.com/api/applications/${userObj.user_id}`
      );
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      } else {
        console.error("❌ Failed to fetch application data");
      }
    } catch (error) {
      console.error("❌ Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [router]);

  // Called after a new application is added successfully
  const handleApplicationAdded = () => {
    setShowAddingForm(false);
    fetchApplications(); // Reload applications list
  };

  // Remove an application by ID
  const handleRemoveApplication = async (application_id) => {
    try {
      const response = await fetch(
        `https://job-app-7nxq.onrender.com/api/applications/${application_id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setApplications((prevApps) =>
          prevApps.filter((app) => app.application_id !== application_id)
        );
      } else {
        console.error("❌ Failed to remove application");
      }
    } catch (error) {
      console.error("❌ Error removing application:", error);
    }
  };

  // Update application status
  const handleUpdateApplicationStatus = async (applicationId, status) => {
    try {
      const response = await fetch(
        `https://job-app-7nxq.onrender.com/api/applications/${applicationId}/${status}`,
        { method: "PUT" }
      );

      if (response.ok) {
        setApplications((prevApps) =>
          prevApps.map((app) =>
            app.application_id === applicationId ? { ...app, status } : app
          )
        );
      } else {
        const errorData = await response.json();
        console.error("❌ Failed to update application status:", errorData);
      }
    } catch (error) {
      console.error("❌ Error updating application status:", error);
    }
  };

  return (
    <>
      {showAddingForm ? (
        <AppForm
          onCancel={() => setShowAddingForm(false)}
          onApplicationAdded={handleApplicationAdded}
        />
      ) : (
        <div className="min-h-screen bg-gray-100 p-6">
          <button
            onClick={() => setShowAddingForm(true)}
            className="text-3xl font-bold mb-6 bg-green-500 p-3 rounded-lg text-gray-800"
          >
            Add Application
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.length === 0 ? (
              <p className="text-center col-span-full text-xl text-gray-600">
                No applications found.
              </p>
            ) : (
              applications.map((app) => (
                <div
                  key={app.application_id}
                  className="bg-orange-400 relative h-90 text-black p-6 rounded-lg shadow-md hover:scale-105 transition-transform"
                >
                  <img
                    src="./businessman.png"
                    className="absolute opacity-5 bottom-0 right-0"
                    alt=""
                  />
                  <h2 className="text-xl font-bold mb-2">
                    Application card
                  </h2>
                  <hr className="bg-black p-1" />
                  <p>
                    Company Name: <strong>{app.name}</strong>
                  </p>
                  <p>
                    Job Title: <strong>{app.job_title}</strong>
                  </p>
                  <p>
                    Salary: <strong>${app.salary_expectation}</strong>
                  </p>
                  <p>
                    Location: <strong>{app.job_location}</strong>
                  </p>
                  <p>
                    Job URL:{" "}
                    <a
                      href={app.job_url}
                      className="underline font-semibold text-blue-500 hover:text-blue-600"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {app.job_url}
                    </a>
                  </p>
                  <p>
                    Applied On:{" "}
                    <strong>
                      {app.application_date
                        ? new Date(app.application_date).toLocaleDateString(
                            "en-GB"
                          )
                        : "N/A"}
                    </strong>
                  </p>
                  <p>
                    Status: <strong>{app.status}</strong>
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-lg">
                    <button
                      onClick={() => handleRemoveApplication(app.application_id)}
                      className="p-2 bg-red-500 text-black rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>

                    <select
                      className="p-3 bg-green-500 rounded-md hover:scale-105 transition"
                      value={app.status}
                      onChange={(e) =>
                        handleUpdateApplicationStatus(app.application_id, e.target.value)
                      }
                    >
                      <option value="Wishlist">Wishlist</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Applied">Applied</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}
