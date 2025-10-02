import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom"; 
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()

  const handleSubmit = async (e) => {  
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/notes", {
        title,
        content,
      });
      toast.success("Note created successfully 🎉");
      navigate('/')

      // Reset form after success
      setTitle("");
      setContent("");
    } catch (err) {
      toast.error(`Failed to create note: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link to="/" className="btn btn-ghost mb-6 flex items-center gap-2">
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </Link>

          {/* Card */}
          <div className="card bg-base-100 shadow-xl p-6">
            <h2 className="card-title text-2xl mb-4">Create New Note</h2>
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Content */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-40"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              {/* Submit */}
              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="btn bg-emerald-500 text-white"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create"}
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
