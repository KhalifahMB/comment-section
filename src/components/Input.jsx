import propTypes from "prop-types";
import { useContext, useRef } from "react";
import { AppContex } from "../context/AppContext";

const Input = ({ text }) => {
  const { currentUser, addComment } = useContext(AppContex);
  const inputRef = useRef(null);
  const handleAddComment = () => {
    const now = new Date();
    const newComment = {
      id: now.getMilliseconds(),
      content: inputRef.current.value.trim(),
      createdAt: now.toDateString(),
      score: 0,
      user: {
        ...currentUser,
      },
      replies: [],
    };
    newComment.content
      ? addComment(newComment)
      : alert("please provide a comment");
    inputRef.current.value = "";
  };
  return (
    <div className="input_container">
      <img
        src={currentUser.image.png}
        className="w-10 h-10"
        alt="profile image"
      />
      <textarea
        className=" input_textarea  "
        type="text"
        ref={inputRef}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment} className="input_btn">
        {text}
      </button>
    </div>
  );
};

Input.propTypes = {
  text: propTypes.string.isRequired,
};
export default Input;
