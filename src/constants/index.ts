import { IFilterItem } from '@/types/ICommon';

export const headerLinks = ['/anime', '/manga', '/characters'];
export const headerPages = ['Anime', 'Manga', 'Characters'];

export const filterOptions: IFilterItem[] = [
  {
    mal_id: 1,
    name: 'Action',
    url: 'https://myanimelist.net/anime/genre/1/Action',
    count: 4996,
  },
  {
    mal_id: 2,
    name: 'Adventure',
    url: 'https://myanimelist.net/anime/genre/2/Adventure',
    count: 3971,
  },
  {
    mal_id: 5,
    name: 'Avant Garde',
    url: 'https://myanimelist.net/anime/genre/5/Avant_Garde',
    count: 849,
  },
  {
    mal_id: 46,
    name: 'Award Winning',
    url: 'https://myanimelist.net/anime/genre/46/Award_Winning',
    count: 241,
  },
  {
    mal_id: 28,
    name: 'Boys Love',
    url: 'https://myanimelist.net/anime/genre/28/Boys_Love',
    count: 174,
  },
  {
    mal_id: 4,
    name: 'Comedy',
    url: 'https://myanimelist.net/anime/genre/4/Comedy',
    count: 7210,
  },
  {
    mal_id: 8,
    name: 'Drama',
    url: 'https://myanimelist.net/anime/genre/8/Drama',
    count: 2902,
  },
  {
    mal_id: 10,
    name: 'Fantasy',
    url: 'https://myanimelist.net/anime/genre/10/Fantasy',
    count: 5567,
  },
];

export const ratingOptions: IFilterItem[] = [
  {
    mal_id: 'g',
    name: 'G',
  },
  {
    mal_id: 'pg',
    name: 'PG',
  },
  {
    mal_id: 'pg13',
    name: 'PG-13',
  },
  {
    mal_id: 'r17',
    name: 'R-17',
  },
  {
    mal_id: 'r',
    name: 'R',
  },
  {
    mal_id: 'rx',
    name: 'Rx',
  },
];
export const statusOptions: IFilterItem[] = [
  {
    mal_id: 'airing',
    name: 'Airing',
  },
  {
    mal_id: 'complete',
    name: 'Complete',
  },
  {
    mal_id: 'upcoming',
    name: 'Upcoming',
  },
];

export const typeOptions: IFilterItem[] = [
  {
    mal_id: 'tv',
    name: 'TV',
  },
  {
    mal_id: 'movie',
    name: 'Movie',
  },
  {
    mal_id: 'ova',
    name: 'OVA',
  },
  {
    mal_id: 'ona',
    name: 'ONA',
  },
  {
    mal_id: 'special',
    name: 'Special',
  },
  {
    mal_id: 'music',
    name: 'Music',
  },
];
