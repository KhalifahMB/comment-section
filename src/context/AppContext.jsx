/* eslint-disable no-case-declarations */
import { createContext, useEffect, useReducer } from "react";
import propTypes from "prop-types";
export const AppContex = createContext();
// function to update a component score, the minimum score is score
const updateCommentScore = (comments, id, type) => {
  return comments.map((comment) => {
    if (comment.id == id) {
      switch (type) {
        case "plus":
          return { ...comment, score: (comment.score += 1) };
        case "minus":
          if (comment.score > 0) {
            return { ...comment, score: (comment.score -= 1) };
          }
          return { ...comment };
        default:
          return { ...comment };
      }
    }
    if (comment.replies?.length > 0) {
      const updatedRepliesScores = updateCommentScore(
        comment.replies,
        id,
        type
      );
      if (updatedRepliesScores) {
        return { ...comment, replies: [...updatedRepliesScores] };
      }
    }

    return comment;
  });
};

// function to update a comment content or editing
const updateCommentContent = (comments, id, content) => {
  return comments.map((comment) => {
    if (comment.id == id) {
      return { ...comment, content };
    }
    if (comment.replies?.length > 0) {
      const updatedRepliesScores = updateCommentScore(
        comment.replies,
        id,
        content
      );
      if (updatedRepliesScores) {
        return { ...comment, replies: [...updatedRepliesScores] };
      }
    }

    return comment;
  });
};

// function to add replies to a comment
const updateCommentReplies = (comments, parentId, content) => {
  return comments.map((comment) => {
    if (comment.id == parentId) {
      content.replyingTo = comment.user.username;
      const updatedReplies = [...comment.replies, content];
      return { ...comment, replies: [...updatedReplies] };
    }

    if (comment.replies?.length > 0) {
      const updatedCommentReplies = updateCommentReplies(
        comment.replies,
        parentId,
        content
      );
      if (updatedCommentReplies) {
        return { ...comment, replies: [...updatedCommentReplies] };
      }
    }

    return comment;
  });
};

// function for deleting a single comment
const deleteComment = (comments, id) => {
  const newComments = [];
  for (const comment of comments) {
    if (comment.id == id) {
      //
    } else {
      const upDatedReplies = comment.replies
        ? deleteComment(comment.replies, id)
        : [];
      newComments.push({ ...comment, replies: upDatedReplies });
    }
  }
  return newComments;
};

const initialState = JSON.parse(
  localStorage.getItem("interactive-comment-section")
) || {
  currentUser: {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "./images/avatars/image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ],
  editMode: false,
  openModal: false,
  modalPlacement: "center",
  modalSize: "md",
  commentId: undefined,
};
const appReducer = (state, action) => {
  switch (action.type) {
    // adding comment to the array
    case "ADD_COMMENT":
      const newComments = state.comments.push(action.payload);
      return { ...state, newComments };

    //  updating a comment score
    case "UP_DATE_SCORE":
      const updatedCommentScore = updateCommentScore(
        state.comments,
        action.payload.id,
        action.payload.type
      );
      return { ...state, comments: updatedCommentScore };

    // editing a comment
    case "EDIT_COMMENT":
      const updatedCommentsContent = updateCommentContent(
        state.comments,
        action.payload.id,
        action.payload.content
      );
      return { ...state, comments: updatedCommentsContent };

    // replying to a comment
    case "REPLY_COMMENT":
      const updatedCommentsReplies = updateCommentReplies(
        state.comments,
        action.payload.parentId,
        action.payload.content
      );
      return { ...state, comments: updatedCommentsReplies };

    //  deleting a comment
    case "DELETE_COMMENT":
      const updatedComments = deleteComment(state.comments, state.commentId);
      return { ...state, openModal: undefined, comments: updatedComments };

    // toggling edit mode
    case "TOGGLE_EDIT_MODE":
      return { ...state, editMode: action.payload.mode };

    // opening modal
    case "OPEN_MODAL":
      return { ...state, openModal: true, commentId: action.payload.id };

    case "CLOSE_MODAL":
      return { ...state, openModal: undefined, commentId: undefined };

    // default action
    default:
      return { ...initialState };
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  useEffect(() => {
    localStorage.setItem("interactive-comment-section", JSON.stringify(state));
    // return () => {
    //   second
    // }
  }, [state]);

  // function to dispatch adding comments
  const addComment = (comment) => {
    dispatch({ type: "ADD_COMMENT", payload: { ...comment } });
  };

  // function to dispatch updating a comment score
  const updateScores = (id, type) => {
    dispatch({ type: "UP_DATE_SCORE", payload: { id, type } });
  };

  // function to dispatch editing a comment contents
  const editComment = (id, content) => {
    dispatch({ type: "EDIT_COMMENT", payload: { id, content } });
  };

  // function to dispatch editing a comment contents
  const deleteComment = () => {
    dispatch({ type: "DELETE_COMMENT" });
  };

  // function to dispatch replying to a single comment
  const replyAComment = (parentId, content) => {
    dispatch({ type: "REPLY_COMMENT", payload: { parentId, content } });
  };

  const toggleEditMode = (mode) => {
    dispatch({ type: "TOGGLE_EDIT_MODE", payload: { mode } });
  };

  // OPENING MODAL
  const openingModal = (id) => {
    dispatch({ type: "OPEN_MODAL", payload: { id } });
  };

  // CLOSING MODAL
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <AppContex.Provider
      value={{
        ...state,
        addComment,
        updateScores,
        editComment,
        toggleEditMode,
        replyAComment,
        deleteComment,
        openingModal,
        closeModal,
      }}
    >
      {children}
    </AppContex.Provider>
  );
};
AppProvider.propTypes = {
  children: propTypes.node.isRequired,
};
export default AppProvider;
