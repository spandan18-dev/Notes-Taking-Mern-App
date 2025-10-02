import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon, SaveIcon } from "lucide-react";
import axios from "axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/notes/${id}`);
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
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
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
      await axios.put(`http://localhost:3000/api/notes/${id}`, note);
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
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin w-10 h-10 text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <Link to="/" className="btn btn-ghost gap-2">
            <ArrowLeftIcon className="w-5 h-5" /> Back
          </Link>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline gap-2"
            >
              <Trash2Icon className="w-5 h-5" /> Delete
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn btn-primary gap-2"
            >
              <SaveIcon className="w-5 h-5" />
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="form-control">
            <label className="label font-semibold text-lg">Title</label>
            <input
              type="text"
              className="input input-bordered w-full text-lg"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-lg">Content</label>
            <textarea
              className="textarea textarea-bordered w-full min-h-[200px] text-base leading-relaxed"
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
