import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export function useCurrentUser() {
  const { data, mutate } = useSWR("/api/user", fetcher);
  const user = data?.user;
  return [user, { mutate }];
}

// export function useUser(id) {
//   const { data } = useSWR(`/api/users/${id}`, fetcher);
//   return data?.user;
// }