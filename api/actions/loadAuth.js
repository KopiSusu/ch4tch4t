// this just checks for auth at startup

export default function loadAuth(req) {
  return Promise.resolve(req.session.user || null);
}
