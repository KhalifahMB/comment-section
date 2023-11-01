import propTypes from "prop-types";
import { useContext, useRef } from "react";
import { AppContex } from "../context/AppContext";

const Reply = ({ parentId }) => {
  const { currentUser, replyAComment } = useContext(AppContex);
  const inputRef = useRef(null);
  const handleReply = () => {
    const now = new Date();
    const newComment = {
      id: now.getMilliseconds(),
      content: inputRef.current.value.trim(),
      createdAt: now.toDateString(),
      score: 0,
      replyingTo: undefined,
      user: {
        ...currentUser,
      },
      replies: [],
    };
    newComment.content
      ? replyAComment(parentId, newComment)
      : alert("please provide a comment");
    inputRef.current.value = "";
  };
  return (
    <div className="input_container ">
      <img
        src={currentUser.image.png}
        className="w-10 h-10"
        alt="profile image"
      />
      <textarea
        className=" input_textarea"
        type="text"
        ref={inputRef}
        placeholder="replyTo"
      />
      <button onClick={handleReply} className="input_btn">
        Reply
      </button>
    </div>
  );
};

Reply.propTypes = {
  parentId: propTypes.number.isRequired,
};
export default Reply;
