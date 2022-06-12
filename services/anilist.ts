import axios from "axios";

export const searchMedia = (keyword: string, type: string): string => {
  return (
    `{
        Page(page: 1, perPage: 10) {
            media(search: "` +
    keyword +
    `",
            type:` +
    type.toUpperCase() +
    `,
            sort:SEARCH_MATCH) {
                id,
                type,
                title {
                    romaji
                    english
                    native
                    userPreferred
                }
                coverImage {
                    medium
                    large
                }
                startDate {
                  year
                }
                staff(sort: RELEVANCE, perPage: 1) {
      nodes {
        name {
          full
        }
      }
    }
            }
        }
    }`
  );
};

export const searchCharacter = (name: string): string => {
  return (
    `{
      Page: Page(page: 1, perPage: 10) {
        characters: characters(search: "` +
    name +
    `") {
          id,
          dateOfBirth { day, month, year },
          age,
          name { first last }
          image { medium large }
        }}}`
  );
};

export const searchStaff = (name: string): string => {
  return (
    `
    {
      Page: Page(page: 1, perPage: 10) {
        staff: staff(search: "` +
    name +
    `") {
          id,
          dateOfBirth { day, month, year },
          age,
          name { first last }
          image { medium large }
        }
      }
    }`
  );
};

const anilist = {
  searchMedia: async (keyword: string, type: string): Promise<any[]> => {
    try {
      const response = await axios
        .post("https://graphql.anilist.co", {
          query: searchMedia(keyword, type),
        })
        .catch((error) => {
          console.error(error);
          return null;
        });
      return (
        response as {
          data: {
            data: {
              Page: {
                media: any[];
              };
            };
          };
        }
      )?.data.data.Page.media;
    } catch (e) {
      return [];
    }
  },
  searchCharacter: async (name: string): Promise<any[]> => {
    try {
      const response = await axios
        .post("https://graphql.anilist.co", {
          query: searchCharacter(name),
        })
        .catch((error) => {
          console.error(error);
          return null;
        });
      return (
        response as {
          data: {
            data: {
              Page: {
                characters: any[];
              };
            };
          };
        }
      )?.data.data.Page.characters;
    } catch (e) {
      return [];
    }
  },
  searchStaff: async (name: string): Promise<any[]> => {
    try {
      const response = await axios
        .post("https://graphql.anilist.co", {
          query: searchStaff(name),
        })
        .catch((error) => {
          console.error(error);
          return null;
        });
      return (
        response as {
          data: {
            data: {
              Page: {
                staff: any[];
              };
            };
          };
        }
      )?.data.data.Page.staff;
    } catch (e) {
      return [];
    }
  },
};

export default anilist;
