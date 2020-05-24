// extracts all data from user except password
export function extractUser(req) {
  if (!req.user) return null;
  const {
    _id, name, email
  } = req.user;
  return {
    _id, name, email
  };
}