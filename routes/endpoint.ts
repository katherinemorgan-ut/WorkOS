import { WorkOS } from '@workos-inc/node';
import type { NextApiRequest, NextApiResponse } from 'next';

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  const { profile } = await workos.sso.getProfileAndToken({
    code,
    clientId,
  });

  // Use the information in `profile` for further business logic.

  res.redirect('https://localhost:8000/');
};
