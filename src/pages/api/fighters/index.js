import createHandler from '@/middleware';
import Fighter from '@/models/fighter';

const handler = createHandler();

handler.get(async (req, res) => {
  const fighters = await Fighter.find({}).exec();
  res.status(200).json(fighters);
});

export default handler;
