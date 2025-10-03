import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios.jsx";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeftIcon className="size-4" />
            Back to Notes
          </Link>

          <button onClick={handleDelete} className="btn btn-error btn-sm flex items-center gap-2">
            <Trash2Icon className="size-4" />
            Delete
          </button>
        </div>

        <div className="card bg-base-100 shadow-xl backdrop-blur-md">
          <div className="card-body space-y-5">
            <div>
              <label className="label">
                <span className="label-text font-medium">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Content</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-40"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>

            <div className="flex justify-end">
              <button
                className="btn btn-primary px-6"
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
