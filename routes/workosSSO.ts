import { WorkOS } from '@workos-inc/node';
import type { NextApiRequest, NextApiResponse } from 'next';

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID;

export default (_req: NextApiRequest, res: NextApiResponse) => {
  // The user's organization ID
  const organization = 'org_123';

  // The callback URI WorkOS should redirect to after the authentication
  const redirectURI = 'https://dashboard.my-app.com';

  const authorizationUrl = workos.sso.getAuthorizationUrl({
    organization,
    redirectURI,
    clientId,
  });

  res.redirect(authorizationUrl);
};
