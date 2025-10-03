import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios.jsx";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <Link
          to={"/"}
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Notes
        </Link>

        <div className="card bg-base-100 shadow-xl backdrop-blur-md">
          <div className="card-body">
            <h2 className="text-3xl font-bold mb-6 text-center">Create a New Note</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter a catchy title..."
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered w-full h-40"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary px-6"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
