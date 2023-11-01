import { useContext } from "react";
import { AppContex } from "../context/AppContext";
import Comment from "./Comment";
import Input from "./Input";

const Comments = () => {
  const { comments } = useContext(AppContex);

  return (
    <div className="comments_container">
      {comments &&
        comments?.map((comment) => {
          return <Comment key={comment.id} {...comment} />;
        })}
      <Input text="send" />
    </div>
  );
};

export default Comments;
