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
  CreateInvite: `${ARTIST_BASE_URl}/create-invite`,
  GetInviteCode: `${ARTIST_BASE_URl}/invite-code`,
  GetInviteData: `${ARTIST_BASE_URl}/get-invite`,
  GetInviteFullData: `${ARTIST_BASE_URl}/get-invite-data`,

  //ArtWork Apis Routes
  GetAllArtwork: `${ARTIST_BASE_URl}/get-all-artworks`,
  addToWishList: `${ARTIST_BASE_URl}/item-to-wishlist`,
  getWishList: `${ARTIST_BASE_URl}/get-wishlist`,
  usePatchSeries: `${ARTIST_BASE_URl}/add-series-to-artist`,
  useDeleteSeries: `${ARTIST_BASE_URl}/delete-series-to-artist`,
  getSeries: `${ARTIST_BASE_URl}/get-series-list`,
  GetArtSeries: `${ARTIST_BASE_URl}/get-all-series`,
  getAllPlans: `${ARTIST_BASE_URl}/get-all-plans`,
  getCard: `${ARTIST_BASE_URl}/card`,
  getAllCollections: `${ARTIST_BASE_URl}/get-all-collections`,
  useGetCollectionById: `${ARTIST_BASE_URl}/get-collection`,
  getToken: `${ARTIST_BASE_URl}/get-pay-token`,
  exchangeArtwork: `${ARTIST_BASE_URl}/exchage`,

  // Offer Apis Routes
  makeAnOffer: `${ARTIST_BASE_URl}/user-offer`,
  acceptReject: `${ARTIST_BASE_URl}/artist-offer`,
  getUserOfferList: `${ARTIST_BASE_URl}/user-offers`,
  getArtistOfferList: `${ARTIST_BASE_URl}/artist-offers`,

  // DashBoard Apis Routes
  getArtistDashboard: `${ARTIST_BASE_URl}/get-dashboard-data`,

  // Coustom Uploaded Images Apis Route
  upLoadImg: `${ARTIST_BASE_URl}/check-upload-images`,
  getUpLoadedImage: `${ARTIST_BASE_URl}/get-upload-images`,
  getAllUpLoadedImages: `${ARTIST_BASE_URl}/get-all-images`,
  deleteUploadedImage: `${ARTIST_BASE_URl}/delete-uploaded-image`,

  // Folllow Artist and UnFollow Artist Apis
  followArtist: `${ARTIST_BASE_URl}/follow`,
  unFollowArtist: `${ARTIST_BASE_URl}/unfollow`,

  // Favourite Artist Apis
  getFavArtist: `${ARTIST_BASE_URl}/get-following`,

  // offer

  getOffer: `${ARTIST_BASE_URl}/get-offer`,
  addToCartOffer :`${ARTIST_BASE_URl}/add-offer-cart`,

  // Visualization Apis Routes

  getVisualizationImages: `${ARTIST_BASE_URl}/get-visualise-data`,
};
