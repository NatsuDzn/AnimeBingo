import axios from "axios";

const anilist = {
  search: async (keyword: string, type: string): Promise<any[]> => {
    try {
      const response = await axios
        .post("https://graphql.anilist.co", {
          query: searchQuery(keyword, type),
        })
        .catch((error) => {
          console.error(error);
          return null;
        });
      return (
        response as {
          data: {
            data: {
              Page: { media: any[] };
            };
          };
        }
      )?.data.data.Page.media;
    } catch (e) {
      return [];
    }
  },
};

export const searchQuery = (keyword: string, type: string): string => {
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
                id
                title {
                    romaji
                    english
                    native
                    userPreferred
                }
                coverImage {
                    medium
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

export default anilist;
