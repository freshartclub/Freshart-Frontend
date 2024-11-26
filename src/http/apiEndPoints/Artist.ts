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

  addToWishList: `${ARTIST_BASE_URl}/item-to-wishlist`,
  getWishList: `${ARTIST_BASE_URl}/get-wishlist`,

  // GetArtistTicket: `${ARTIST_BASE_URl}/get
};

// all the endpoints will be gonaa edit
