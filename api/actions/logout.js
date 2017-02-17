// Pretty destroy user on session, logs out

export default function logout(req) {
  return new Promise((resolve) => {
    req.session.destroy(() => {
      req.session = null;
      return resolve(null);
    });
  });
}
