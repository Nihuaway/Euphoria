import { normalize } from 'interfaces/query';

export const prepare = (
  query_category: string,
  query_sort: string,
  query_time: string,
  query_tag: string,
  query_search: string,
  limit: number
) => {
  const norm_category = normalize(query_category, '-');
  const norm_sort = normalize(query_sort, '-');
  const norm_time = normalize(query_time, '-');
  const norm_tag = query_tag;
  const norm_search = normalize(query_search, '_');

  const nowDate = new Date();

  const filter = Object.assign(
    { isDraft: false },
    norm_category !== 'all' ? { category: norm_category } : {},
    norm_time === 'this-past-week'
      ? {
          createdAt: {
            $gt: new Date(
              nowDate.getFullYear(),
              nowDate.getMonth(),
              nowDate.getDate() - 7
            ),
          },
        }
      : null,
    norm_time === 'this-past-month'
      ? {
          createdAt: {
            $gt: new Date(
              nowDate.getFullYear(),
              nowDate.getMonth() - 1,
              nowDate.getDate()
            ),
          },
        }
      : null,
    norm_time === 'this-past-year'
      ? {
          createdAt: {
            $gt: new Date(
              nowDate.getFullYear() - 1,
              nowDate.getMonth(),
              nowDate.getDate()
            ),
          },
        }
      : null,
    norm_time === 'now'
      ? {
          createdAt: {
            $gt: new Date(
              nowDate.getFullYear(),
              nowDate.getMonth(),
              nowDate.getDate(),
              nowDate.getHours() - 6
            ),
          },
        }
      : null,
    norm_tag
      ? {
          tags: {$in:norm_tag},
        }
      : null,
    norm_search ? { title: { $regex: '^' + norm_search, $options: 'i' } } : null
  );

  const sort = Object.assign(
    {},
    norm_sort === 'popular' ? { popularity: -1 } : null,
    norm_sort === 'newest' || norm_sort === 'following'
      ? { createdAt: -1 }
      : null
  );

  return {
    filter,
    sort,
    limit,
    following: norm_sort === 'following',
    isDraft: false,
  };
};
