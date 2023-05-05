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
  
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };  
  
  return (
    <div>
      <Link to={'/workouts'}>Back</Link>
      <h2>Comments</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Leave a comment:</label>
          <textarea
            id="comment"
            value={newComment}
            onChange={handleCommentChange}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>

      <br></br>

      <div>
        <h3>All Comments</h3>
        <br></br>
        {comments.map((comment) => (
          <div key={comment._id}>
            <p><strong>{comment.author.username}:</strong> {comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
