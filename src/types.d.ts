type ContentType = 'tracks' | 'artists';
type TimeRange = 'short_term' | 'medium_term' | 'long_term';
interface Card {
    caption: string;
    image: string;
    url: string;
}
interface Content {
    tracks: {
        short_term?: Card[];
        medium_term?: Card[];
        long_term?: Card[];
    };
    artists: {
        short_term?: Card[];
        medium_term?: Card[];
        long_term?: Card[];
    };
}
interface User {
    displayName: string;
    avatar: string;
    url: string;
}
interface AccessTokenResponse {
    access_token: string;
    token_type: 'Bearer';
    expires_in: number;
    refresh_token: string;
    scope: string;
}
type UsersTopResponse = SpotifyApi.UsersTopTracksResponse | SpotifyApi.UsersTopArtistsResponse;
type UsersTopItem = SpotifyApi.TrackObjectFull | SpotifyApi.ArtistObjectFull;
type UserPrivate = SpotifyApi.UserObjectPrivate;
