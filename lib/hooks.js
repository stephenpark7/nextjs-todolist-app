import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export function getCurrentUser() {
  const { data, error, mutate } = useSWR("/api/user", fetcher);
  const user = data && data.user;
  if (error) user = null;
  return [user, { mutate }];
}

export function getTaskList() {
  const { data, error, mutate } = useSWR("/api/tasks", fetcher);
  const tasks = data;
  if (error) tasks = null;
  return { tasks, mutate };
}