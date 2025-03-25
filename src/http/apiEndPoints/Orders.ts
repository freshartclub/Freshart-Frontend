import { ARTIST_ORDER_URl } from "../../components/utils/baseUrls";

export const ORDERS_ENDPOINTS = {
  PostOrders: `${ARTIST_ORDER_URl}/create-order`,
  GetCheckoutOrders: `${ARTIST_ORDER_URl}/get-all-user-orders`,
  GetArtistOrder: `${ARTIST_ORDER_URl}/get-artist-order`,
  GetArtistOrderDetails: `${ARTIST_ORDER_URl}/get-artist-single-order`,
  AcceptOrder: `${ARTIST_ORDER_URl}/accept-order-request`,
  AddEvidence: `${ARTIST_ORDER_URl}/upload-evidence`,
  CancelItem: `${ARTIST_ORDER_URl}/cancel-particular-item`,
  GetOrderDetails: `${ARTIST_ORDER_URl}/get-user-single-order`,
  ReviewArtwork: `${ARTIST_ORDER_URl}/give-review`,
  getHash: `${ARTIST_ORDER_URl}/hash`,
  getStatus: `${ARTIST_ORDER_URl}/status`,
};
