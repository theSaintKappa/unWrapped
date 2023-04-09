export type ContentType = 'tracks' | 'artists';
export type TimeRange = 'short_term' | 'medium_term' | 'long_term';
export interface Card {
    caption: string;
    image: string;
}
export interface Content {
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
