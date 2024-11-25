import { ARTIST_ORDER_URl } from "../../components/utils/baseUrls";

export const ORDERS_ENDPOINTS = {
  PostOrders: `${ARTIST_ORDER_URl}/create-order`,
  GetCheckoutOrders: `${ARTIST_ORDER_URl}/get-all-user-orders`,
  GetArtistOrder: `${ARTIST_ORDER_URl}/get-artist-order`,
  GetArtistOrderDetails: `${ARTIST_ORDER_URl}/get-artist-single-order`,
};
