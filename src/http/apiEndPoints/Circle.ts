import { CIRCLE_URL } from "../../components/utils/baseUrls";

export const CIRCLE_ENDPOINTS = {
  GetCircle: `${CIRCLE_URL}/get-artist-circle-list`,
  GetCircleDetails: `${CIRCLE_URL}/get-circle-by-id`,
  GetCircleList: `${CIRCLE_URL}/get-circles`,
  CreateCirclePost: `${CIRCLE_URL}/create-post`,
  GetCirclePosts: `${CIRCLE_URL}/get-all-circle-post`,
  PostCircleComment: `${CIRCLE_URL}/post-comment`,
  GetCircleComments: `${CIRCLE_URL}/get-all-comments`,
  LikeCirclePost: `${CIRCLE_URL}/like-post`,
  GetLiked: `${CIRCLE_URL}/get-likes`,

  FollowCircle: `${CIRCLE_URL}/send-request`,
  GetCircleFollowers: `${CIRCLE_URL}/get-circle-followers`,

  FollowRequests: `${CIRCLE_URL}/get-request`,
  ApproveRequest: `${CIRCLE_URL}/approve-request`,
  GetFollowers: `${CIRCLE_URL}/get-followers`,
  RemoveFollower: `${CIRCLE_URL}/remove-follower`,
  DeleteRequest: `${CIRCLE_URL}/delete-request`,
  UnfollowCircle: `${CIRCLE_URL}/unfollow`,
};
