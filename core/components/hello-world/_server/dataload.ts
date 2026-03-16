'use server';

import { client } from '~/client';
import { graphql } from '~/client/graphql'; // A utility function for handling GraphQL queries

export const fetchdata = async () => {
  const GET_PRODUCT_REVIEWS_QUERY = graphql(`
          query LatestThreeBlogs {
              site {
                content {
                  blog {
                    posts(first: 10) {
                      edges {
                        node {
                          entityId
                          name
                          path
                          plainTextSummary(characterLimit: 140)
                          publishedDate {
                            utc
                          }
                          author
                          thumbnailImage {
                            url(width: 800)
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
            }`);


  return client.fetch({
    document: GET_PRODUCT_REVIEWS_QUERY, // GraphQL query
    //variables: { pageSize: 10 },  // Query variables
    fetchOptions: { cache: 'no-store' }, // Optional fetch options
  });
}


