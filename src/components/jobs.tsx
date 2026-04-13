import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  BarChart3,
  Building2,
  MapPin,
  ExternalLink,
  ArrowLeft,
  Search,
  LogOut,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";

interface Job {
  source: "RapidAPI";
  title: string;
  company: string;
  location: string;
  link: string;
}

const Jobs = () => {
  const locationState = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { course, level } = (locationState.state as any) || {};

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!course || !level) return;

    fetch(
      `http://localhost:8000/jobs/recommendations?course=${encodeURIComponent(
        course
      )}&level=${level}`
    )
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [course, level]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative">

      {/* ===== TOP RIGHT ACTIONS ===== */}
      <div className="absolute top-4 right-4 flex gap-3 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/courses")}
          className="hover:bg-orange-100"
        >
          <BookOpen className="h-5 w-5 text-orange-700" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="hover:bg-red-100"
        >
          <LogOut className="h-5 w-5 text-red-600" />
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-black mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* ===== HEADING ===== */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-2xl bg-orange-100">
              <Briefcase className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold">
            Job Recommendations
          </h1>

          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Personalized opportunities based on your learning profile
          </p>
        </div>

        {/* ===== COURSE & LEVEL ===== */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-6 flex-wrap">

            <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-sm border">
              <GraduationCap className="h-7 w-7 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">Course</p>
                <p className="text-lg font-semibold">{course}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-sm border">
              <BarChart3 className="h-7 w-7 text-amber-600" />
              <div>
                <p className="text-sm text-gray-500">Level</p>
                <p className="text-lg font-semibold">{level}</p>
              </div>
            </div>

          </div>
        </div>

        {/* ===== JOBS ===== */}
        <div className="max-w-5xl mx-auto">

          {loading && (
            <div className="text-center text-gray-600 py-20">
              Loading jobs...
            </div>
          )}

          {!loading && jobs.length === 0 && (
            <div className="text-center bg-white rounded-2xl p-12 shadow">
              <Search className="mx-auto mb-4 text-gray-400" size={40} />
              <h3 className="text-lg font-semibold">No jobs found</h3>
              <p className="text-gray-500 mt-1">
                Try a different course or level
              </p>
            </div>
          )}

          {!loading && jobs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ scale: 1.04 }}
                >
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col p-6 text-center h-80">

                    <h3 className="text-xl font-semibold mb-3">
                      {job.title}
                    </h3>

                    <span className="mx-auto mb-4 px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-700">
                      {job.source}
                    </span>

                    <div className="flex justify-center items-center gap-2 text-sm mb-2">
                      <Building2 size={16} className="text-orange-600" />
                      {job.company}
                    </div>

                    <div className="flex justify-center items-center gap-2 text-sm text-gray-600 mb-6">
                      <MapPin size={16} />
                      {job.location}
                    </div>

                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto h-12 flex items-center justify-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-medium transition"
                    >
                      Apply Now
                      <ExternalLink size={16} />
                    </a>

                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Jobs;
