import { ARTIST_BASE_URl } from "../../components/utils/baseUrls";

export const ARTTIST_ENDPOINTS = {
  GetArtistDetials: `${ARTIST_BASE_URl}/get-artist`,
  GetSingleArtistDetials: `${ARTIST_BASE_URl}/get-artist-detail`,
  EditArtistProfile: `${ARTIST_BASE_URl}/edit-artist-profile `,
  RaiseTicket: `${ARTIST_BASE_URl}/create-ticket `,
  PostTicket: `${ARTIST_BASE_URl}/reply-ticket`,
  GetArtWorkList: `${ARTIST_BASE_URl}/get-artist-artworks`,
  GetArtWorkListById: `${ARTIST_BASE_URl}/get-artwork`,
  AddArtWork: `${ARTIST_BASE_URl}/add-artwork`,
  GetHomeData: `${ARTIST_BASE_URl}/get-home-artworks`,
  RecentArtWorks: `${ARTIST_BASE_URl}/add-to-recent`,
  GetRecentArtworks: `${ARTIST_BASE_URl}/get-recent-view`,
  GetLanguage: `${ARTIST_BASE_URl}/get-language`,
  GetSMSOtp: `${ARTIST_BASE_URl}/sms-otp`,
  VerifySMSOtp: `${ARTIST_BASE_URl}/verify-sms-otp`,
  ArtistChangePassword: `${ARTIST_BASE_URl}/change-password`,
  AddBillingAddress: `${ARTIST_BASE_URl}/add-billing-address`,
  GetBillingAddress: `${ARTIST_BASE_URl}/get-billing-address`,
  SetDefaultAddress: `${ARTIST_BASE_URl}/set-default-address`,
  RemoveBillingAddress: `${ARTIST_BASE_URl}/remove-billing-address`,
  UpdateBillingAddress: `${ARTIST_BASE_URl}/update-billing-address`,
  PatchRevalidation: `${ARTIST_BASE_URl}/revalidate-profile`,
  GetArtWorkBySeries: `${ARTIST_BASE_URl}/get-artist-artworks-by-series`,
  GetOtherArtworks: `${ARTIST_BASE_URl}/get-other-artworks`,
  getInsignia: `${ARTIST_BASE_URl}/get-insignias`,

  ReviewArtwork: `${ARTIST_BASE_URl}/give-review`,
  LikeUnlikeArtwork: `${ARTIST_BASE_URl}/like-unlike-artwork`,
  GetLikedArtWork: `${ARTIST_BASE_URl}/get-liked-items`,

  GetArtistTickets: `${ARTIST_BASE_URl}/get-user-tickets`,
  GetArtistTicketsDetails: `${ARTIST_BASE_URl}/ticket`,
  GetAllIncidents: `${ARTIST_BASE_URl}/get-all-incidents`,
  PatchFeedback: `${ARTIST_BASE_URl}/ticket-feedback`,
  GetNotifications: `${ARTIST_BASE_URl}/get-notifications`,
  DeleteNotification: `${ARTIST_BASE_URl}/delete-notification`,
  ReadNotification: `${ARTIST_BASE_URl}/read-notification`,

  GetAllArtist: `${ARTIST_BASE_URl}/get-all-artists`,
  addToCart: `${ARTIST_BASE_URl}/add-to-cart`,
  cartItems: `${ARTIST_BASE_URl}/get-cart`,
  unauthorisedCartItem: `${ARTIST_BASE_URl}/get-unauthorized-cart`,
  removeItems: `${ARTIST_BASE_URl}/remove-from-cart`,

  addToFavorite: `${ARTIST_BASE_URl}/add-to-favorite`,
  getFavoriteList: `${ARTIST_BASE_URl}/get-favorite-list`,
  getFullList: `${ARTIST_BASE_URl}/get-full-list`,
  editProfile: `${ARTIST_BASE_URl}/edit-user-profile`,
  CustomOrder: `${ARTIST_BASE_URl}/create-custom-order`,


  // removeItems: `${ARTIST_BASE_URl}/remove-from-cart`,

  GetAllArtwork: `${ARTIST_BASE_URl}/get-all-artworks`,

  addToWishList: `${ARTIST_BASE_URl}/item-to-wishlist`,
  getWishList: `${ARTIST_BASE_URl}/get-wishlist`,
  usePatchSeries: `${ARTIST_BASE_URl}/add-series-to-artist`,
  useDeleteSeries: `${ARTIST_BASE_URl}/delete-series-to-artist`,
  getSeries: `${ARTIST_BASE_URl}/get-series-list`,
  GetArtSeries: `${ARTIST_BASE_URl}/get-all-series`,

  getAllPlans: `${ARTIST_BASE_URl}/get-all-plans`,

  // collection

  getAllCollections: `${ARTIST_BASE_URl}/get-all-collections`,
  useGetCollectionById: `${ARTIST_BASE_URl}/get-collection`,

  getToken: `${ARTIST_BASE_URl}/get-pay-token`,
};

// all the endpoints will be gonaa edit
