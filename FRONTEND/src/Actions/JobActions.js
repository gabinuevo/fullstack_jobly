// export const SHOW_ERR = 'SHOW_ERR';

import JoblyApi from '../JoblyAPI';
import { 
  GET_ALL_JOBS, 
  SHOW_ERR, 
  // ADD_JOB, 
  // PATCH_JOB, 
  // DELETE_JOB 
} from './ActionTypes';


/** 
 * Format data to be sent to the reducer
*/

// gets all jobs
export function getAllJobs(params = {}) {
  return async function (dispatch) {
    try {
      const jobs = await JoblyApi.getJobs(params);
      dispatch(gotJobs(jobs));
    } catch (err) {
      const errMsg = err.response.data;
      dispatch(showErr(errMsg));
    }
  }
}

function gotJobs(jobs) {
  return {
    type: GET_ALL_JOBS,
    payload: { jobs }
  }
}

// /** TODO: PATCH JOB
//  * Add new post to API
//  * Add new post to Redux state
//  * Add new title to Redux state
//  */
// export function addPostToApi(postData) {
//   return async function (dispatch) {
//     try {
//       const post = await JoblyApi.addPost(postData);
//       // add an empty comments to post
//       post.comments = [];
//       // format a title for the new post
//       const title = {
//         id: post.id,
//         title: post.title,
//         description: post.description,
//         votes: post.votes
//       }
//       dispatch(addedPost(post, title));
//     } catch (err) {
//       const errMsg = err.response.data;
//       dispatch(showErr(errMsg));
//     }
//   }
// }

// function addedPost(newPost, newTitle) {
//   return {
//     type: ADD_POST,
//     payload: { post: newPost, title: newTitle }
//   }
// }

/** TODO: Delete job
 * Send updated post to API
 * Update post in Redux state
 * Update title in Redux state
 */
// export function editPostFromApi(postId, postData) {
//   return async function (dispatch) {
//     try {
//       const post = await JoblyApi.editPost(postId, postData);
//       // format a new title for the edited post
//       const title = {
//         id: post.id,
//         title: post.title,
//         description: post.description,
//         votes: post.votes
//       }
//       dispatch(editedPost(postId, post, title));
//     } catch (err) {
//       const errMsg = err.response.data;
//       dispatch(showErr(errMsg));
//     }
//   }
// }

// export function editedPost(postId, editedPost, editedTitle) {
//   return {
//     type: EDIT_POST,
//     payload: { postId, post: editedPost, title: editedTitle }
//   }
// }

// // TODO: ADD JOB.
// /**
//  * Send delete req to API
//  * Delete post from Redux state
//  * Delete title from Redux state
//  */
// export function deletePostFromApi(postId) {
//   return async function (dispatch) {
//     try {
//       await JoblyApi.deletePost(postId);
//       dispatch(deletedPost(postId));
//     } catch (err) {
//       const errMsg = err.response.data;
//       dispatch(showErr(errMsg));
//     }
//   }
// }

// export function deletedPost(postId) {
//   return {
//     type: DELETE_POST,
//     payload: { postId }
//   }
// }

// export function getComments() {
//   return {
//     type: GET_COMMENTS
//   }
// }

// /**
//  * Adds a new comment a post to API
//  * Update post with new comment in Redux state
//  */
// export function addCommentToApi(postId, text) {
//   return async function (dispatch) {
//     try {
//       const comment = await JoblyApi.addComment(postId, text);
//       dispatch(addedComment(postId, comment));
//     } catch (err) {
//       const errMsg = err.response.data;
//       dispatch(showErr(errMsg));
//     }
//   }
// }


// export function addedComment(postId, comment) {
//   return {
//     type: ADD_COMMENT,
//     payload: { postId, comment },
//   }
// }

// /**
//  * Send updated comment to API
//  * Update post with updated comment in Redux state
//  */
// export function editCommentFromApi(postId, commentId, text) {
//   return async function (dispatch) {
//     try {
//       const comment = await JoblyApi.editComment(postId, commentId, text);
//       dispatch(editedComment(postId, comment));
//     } catch (err) {

//       const errMsg = err.response.data;
//       dispatch(showErr(errMsg));
//     }
//   }
// }

// export function editedComment(postId, editedComment) {
//   return {
//     type: EDIT_COMMENT,
//     payload: { postId, comment: editedComment }
//   }
// }

// /**
//  * Send delete comment req to API
//  * Update post with deleted comment in Redux state
//  */
// export function deleteCommentFromApi(postId, commentId) {
//   return async function (dispatch) {
//     try {
//       await JoblyApi.deleteComment(postId, commentId);
//       dispatch(deletedComment(postId, commentId));
//     } catch (err) {
//       const errMsg = err.response.data;
//       dispatch(showErr(errMsg));
//     }
//   }
// }

// export function deletedComment(postId, commentId) {
//   return {
//     type: DELETE_COMMENT,
//     payload: { postId, commentId }
//   }
// }

// export function upvotePostFromApi(postId) {
//   return async function (dispatch) {
//     try {
//       const newVote = await JoblyApi.upvotePost(postId)

//       dispatch(votedPost(postId, newVote.votes))
//     } catch (err) {
//       const errMsg = err.response.data;
//       dispatch(showErr(errMsg));
//     }
//   }
// }


// export function downvotePostFromApi(postId) {
//   return async function (dispatch) {
//     try {
//       const newVote = await JoblyApi.downvotePost(postId)
//       dispatch(votedPost(postId, newVote.votes))
//     } catch (err) {
//       const errMsg = err.response.data;
//       dispatch(showErr(errMsg));
//     }
//   }
// }

// function votedPost(postId, votes) {
//   return {
//     type: VOTE_POST,
//     payload: { postId, votes }
//   }
// }

export function showErr(errMsg) {
  return {
    type: SHOW_ERR,
    payload: { message: errMsg }
  }
}