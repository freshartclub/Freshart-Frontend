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

  // AddSeries: `${ARTIST_BASE_URl}/add-series`,
  // DeleteSeries: `${ARTIST_BASE_URl}/delete-series`,
  // UpdateSeries: `${ARTIST_BASE_URl}/update-series`,
  // GetArtistFeedback: `${ARTIST_BASE_URl}/get-artist-feedback`,

  // GetArtistArtwork: `${ARTIST_BASE_URl}/get-artist-artwork `,
  // DeleteArtwork: `${ARTIST_BASE_URl}/delete-artist-artwork `,
  // UpdateArtwork: `${ARTIST_BASE_URl}/update-artist-artwork `,
  GetArtistTickets: `${ARTIST_BASE_URl}/get-user-tickets`,
  GetArtistTicketsDetails: `${ARTIST_BASE_URl}/ticket`,
  GetAllIncidents: `${ARTIST_BASE_URl}/get-all-incidents`,
  PatchFeedback: `${ARTIST_BASE_URl}/ticket-feedback`,

  GetAllArtist: `${ARTIST_BASE_URl}/get-all-artists`,
  addToCart: `${ARTIST_BASE_URl}/add-to-cart`,
  cartItems: `${ARTIST_BASE_URl}/get-cart`,
  removeItems: `${ARTIST_BASE_URl}/remove-from-cart`,
  // removeItems: `${ARTIST_BASE_URl}/remove-from-cart`,

  GetAllArtwork: `${ARTIST_BASE_URl}/get-all-artworks`,

  addToWishList: `${ARTIST_BASE_URl}/item-to-wishlist`,
  getWishList: `${ARTIST_BASE_URl}/get-wishlist`,
  usePatchSeries: `${ARTIST_BASE_URl}/add-series-to-artist`,
  useDeleteSeries: `${ARTIST_BASE_URl}/delete-series-to-artist`,
  getSeries: `${ARTIST_BASE_URl}/get-series-list`,
  GetArtSeries: `${ARTIST_BASE_URl}/get-all-series`,

  // GetArtistTicket: `${ARTIST_BASE_URl}/get
};

// all the endpoints will be gonaa edit
