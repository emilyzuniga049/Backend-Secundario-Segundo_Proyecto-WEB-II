import jwt from "jsonwebtoken";

export function buildContext({ request }) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) return { user: null };

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return { user };
  } catch {
    return { user: null };
  }
}