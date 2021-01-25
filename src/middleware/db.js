import mongoose from 'mongoose';

export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(process.env.DB_CONN_STR, {
    newUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
}

export function jsonify(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default async function dbMiddleware(req, res, next) {
  try {
    if (!global.mongoose) {
      global.mongoose == dbConnect();
    }
  } catch (e) {
    console.error(e);
  }

  return next();
}
