import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import { LoadingContext } from "../context/loadingContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface Comment {
    _id: string;
    author: {
      _id: string;
      username: string;
    };
    content: string;
  }  

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const {  user } = useContext(LoadingContext) || {};
  const { workoutId } = useParams<{ workoutId: string }>();

  useEffect(() => {
    fetchComments();
  }, [workoutId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${baseUrl}/comments/${workoutId}`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };  

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${baseUrl}/comments/${workoutId}`, {
        author: user?._id,
        content: newComment,
      });
  
      const newCommentData = {
        ...response.data,
        author: {
          _id: user?._id,
          username: user?.username,
        },
      };
  
      setComments([...comments, newCommentData]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };
  
  
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4">
        <Link to="/workouts" className="bg-white shadow-md rounded-md p-4 text-blue-500 px-4 py-2 text-center">
          Back
        </Link>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 mt-4">
          <div>
            <label htmlFor="comment" className="block mb-2">
              Leave a comment:
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={handleCommentChange}
              className="w-full h-32 border rounded-lg p-2"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded"
          >
            Submit
          </button>
        </form>
        <br></br>
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-100">All Comments:</h3>
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <p>
                <strong className="font-bold text-blue-600">{comment.author.username}:</strong>{" "}
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
