import InfiniteScroll from 'react-infinite-scroller';
import { Species } from './Species';
import { useInfiniteQuery } from '@tanstack/react-query';

const initialUrl = 'https://swapi.dev/api/species/';
/* 
returns: 
{
  "count": 37, 
  "next": "https://swapi.dev/api/species/?page=2", 
  "previous": null, 
  "results": []
}
*/
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } =
    useInfiniteQuery(['sw-species'], ({ pageParam = initialUrl }) => fetchUrl(pageParam), {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    });

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {`${error}`}</div>;

  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) =>
          pageData.results.map((species) => (
            <Species
              key={species.name}
              name={species.name}
              language={species.language}
              averageLifespan={species.average_lifespan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
