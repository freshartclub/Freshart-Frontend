import { ARTIST_BASE_URl } from "../../components/utils/baseUrls";

export const ARTTIST_ENDPOINTS = {
  GetArtistDetials: `${ARTIST_BASE_URl}/get-artist `,
  EditArtistProfile: `${ARTIST_BASE_URl}/edit-artist-profile `,
  RaiseTicket: `${ARTIST_BASE_URl}/create-ticket `,
  PostTicket: `${ARTIST_BASE_URl}/reply-ticket`,
  GetArtWorkList: `${ARTIST_BASE_URl}/get-artist-artworks`,
  GetArtWorkListById: `${ARTIST_BASE_URl}/get-artwork`,
  AddArtWork: `${ARTIST_BASE_URl}/add-artwork`,

  // GetArtistArtwork: `${ARTIST_BASE_URl}/get-artist-artwork `,
  // DeleteArtwork: `${ARTIST_BASE_URl}/delete-artist-artwork `,
  // UpdateArtwork: `${ARTIST_BASE_URl}/update-artist-artwork `,
  GetArtistTickets: `${ARTIST_BASE_URl}/get-user-tickets`,
  GetArtistTicketsDetails: `${ARTIST_BASE_URl}/ticket`,

  GetAllArtist: `${ARTIST_BASE_URl}/get-all-artists`,

  // GetArtistTicket: `${ARTIST_BASE_URl}/get
};

// all the endpoints will be gonaa edit
