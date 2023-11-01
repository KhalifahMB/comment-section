import propTypes from "prop-types";
import plusIcon from "../assets/images/icon-plus.svg";
import minusIcon from "../assets/images/icon-minus.svg";
import replyIcon from "../assets/images/icon-reply.svg";
import editIcon from "../assets/images/icon-edit.svg";
import deleteIcon from "../assets/images/icon-delete.svg";

import { useContext, useState } from "react";
import { AppContex } from "../context/AppContext";
import Reply from "./Reply";
const Comment = ({
  id,
  content,
  createdAt,
  score,
  user,
  replies,
  replyingTo,
}) => {
  //  imports from appContext
  const { currentUser, updateScores, editComment, openingModal } =
    useContext(AppContex);
  //local states for each component
  const [editing, seteditMode] = useState(false);
  const [replying, setReplying] = useState(false);
  const [editContent, seteditContent] = useState(content);
  const [paragraphContent, setparagraphContent] = useState(content);

  // toggling edit mode to enable editing
  const toggleEditMode = () => {
    seteditMode((prev) => !prev);
  };
  // toggling edit mode to enable editing
  const toggleReplyMode = () => {
    console.log(id);
    setReplying((prev) => !prev);
  };
  // handling editing of current comment with the given id
  const handleEdit = () => {
    const now = new Date();
    const newComment = {
      id: now.getMilliseconds(),
      content: editContent.trim(),
      createdAt: now.toDateString(),
      score: 0,
      user: {
        ...currentUser,
      },
      replies: [],
    };
    newComment.content
      ? editComment(id, newComment)
      : alert("please provide a comment");
    seteditMode(false);
    setparagraphContent(newComment.content);
  };

  return (
    <>
      <div className=" comment  ">
        <div className="comment_score">
          <img
            src={plusIcon}
            alt="plus icon"
            className="cursor-pointer icon"
            onClick={(e) => {
              e.preventDefault();
              updateScores(id, "plus");
            }}
          />
          <h1 className="score">{score}</h1>
          <img
            src={minusIcon}
            alt="minus icon"
            className="cursor-pointer icon icon_minus "
            onClick={(e) => {
              e.preventDefault();
              updateScores(id, "minus");
            }}
          />
        </div>
        <div className="comment_user_info">
          <img src={user?.image.png} className="w-10" alt="profile image" />
          <h1 className="comment_username">{user?.username}</h1>
          {currentUser.username == user?.username && (
            <span className="you">you</span>
          )}
          <span className="comment_created">{createdAt}</span>
        </div>
        <div className="comment_utils">
          {currentUser.username != user?.username ? (
            <div className="cursor-pointer" onClick={toggleReplyMode}>
              <img src={replyIcon} className="inline mr-2 icon" alt="" />
              <span className="comment_reply">Reply</span>
            </div>
          ) : (
            <div className="flex items-start gap-7">
              <div className="comment_delete" onClick={() => openingModal(id)}>
                <img src={deleteIcon} alt="delete icon" className="h-5 w-5" />
                <span className="text-xl font-semibold">Delete</span>
              </div>
              <div className="comment_edit" onClick={toggleEditMode}>
                <img
                  src={editIcon}
                  alt="edit icon"
                  className="h-5 w-5 stroke-softRed fill-softRed"
                />
                <span className="text-xl font-semibold">Edit</span>
              </div>
            </div>
          )}
        </div>
        <div className="comment_details">
          {editing ? (
            <>
              <textarea
                value={editContent}
                rows="auto"
                onChange={(e) => seteditContent(e.target.value)}
                className="input_textarea  resize-none m-2 min-h-[9rem] h-auto"
              />
              <button className="self-end input_btn" onClick={handleEdit}>
                update
              </button>
            </>
          ) : (
            <p className="comment_content">
              {replyingTo ? (
                <>
                  <span className="text-moderateblue font-bold text-2xl">{`@${replyingTo} `}</span>
                  {paragraphContent}
                </>
              ) : (
                paragraphContent
              )}
            </p>
          )}
        </div>
      </div>
      {replying && <Reply parentId={id} />}
      {/* replies */}
      {replies && (
        <div className="comment_replies">
          {replies.map((reply) => {
            return <Comment key={reply.id} {...reply} />;
          })}
        </div>
      )}
    </>
  );
};
Comment.propTypes = {
  id: propTypes.number.isRequired,
  content: propTypes.string.isRequired,
  createdAt: propTypes.any.isRequired,
  score: propTypes.number.isRequired,
  user: propTypes.object.isRequired,
  replies: propTypes.array,
  replyingTo: propTypes.string,
};
export default Comment;
