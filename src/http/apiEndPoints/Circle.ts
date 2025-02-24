import { CIRCLE_URL } from "../../components/utils/baseUrls";

export const CIRCLE_ENDPOINTS = {
  GetCircle: `${CIRCLE_URL}/get-artist-circle-list`,
  GetCircleDetails: `${CIRCLE_URL}/get-circle-by-id`,
  GetCircleList: `${CIRCLE_URL}/get-circles`,
  CreateCirclePost: `${CIRCLE_URL}/create-post`,
  GetCirclePosts: `${CIRCLE_URL}/get-all-circle-post`,
  PostCircleComment: `${CIRCLE_URL}/post-comment`,
  GetCircleComments: `${CIRCLE_URL}/get-all-comments`,
};
