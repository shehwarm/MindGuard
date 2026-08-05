import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";

function Notes() {
  const { token } = useAuth();

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(res.data.notes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) fetchNotes();
  }, [token]);

  const addNote = async () => {
    if (!title) return;

    try {
      const res = await api.post(
        "/notes",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes([res.data.note, ...notes]);

      setTitle("");
      setContent("");

      toast.success("Note Added");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(notes.filter((n) => n._id !== id));

      toast.success("Deleted");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      navbar={<Navbar />}
    >
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          📝 Notes
        </h1>

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <input
            className="border w-full p-3 rounded mb-4"
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />

          <textarea
            className="border w-full p-3 rounded mb-4"
            rows="5"
            placeholder="Write something..."
            value={content}
            onChange={(e)=>setContent(e.target.value)}
          />

          <button
            onClick={addNote}
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Save Note
          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {notes.map(note=>(
            <div
              key={note._id}
              className="bg-white rounded-xl p-6 shadow"
            >

              <h2 className="text-xl font-bold">
                {note.title}
              </h2>

              <p className="mt-3 text-gray-600 whitespace-pre-wrap">
                {note.content}
              </p>

              <button
                onClick={()=>deleteNote(note._id)}
                className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Notes;