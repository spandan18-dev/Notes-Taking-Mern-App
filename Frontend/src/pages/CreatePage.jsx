import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, PlusCircleIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

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
      await axios.post("http://localhost:3000/api/notes", { title, content });
      toast.success("Note created successfully 🎉");
      navigate("/");
      setTitle("");
      setContent("");
    } catch (err) {
      toast.error(
        `Failed to create note: ${err.response?.data?.message || err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <Link to="/" className="btn btn-ghost gap-2">
            <ArrowLeftIcon className="w-5 h-5" /> Back
          </Link>
          <h2 className="text-xl font-bold">Create New Note</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label font-semibold text-lg">Title</label>
            <input
              type="text"
              placeholder="Note Title"
              className="input input-bordered w-full text-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-lg">Content</label>
            <textarea
              placeholder="Write your note here..."
              className="textarea textarea-bordered w-full min-h-[200px] text-base leading-relaxed"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
            >
              <PlusCircleIcon className="w-5 h-5" />
              {loading ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
