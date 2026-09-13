import {
  jwtVerify,
  SignJWT,
} from "jose";

import {
  requireServerEnv,
} from "../env";

import {
  ADMIN_SESSION_SECONDS,
} from "./constants";

type AdminSession = {
  email: string;
};

function getSessionSecret(): Uint8Array {
  const secret =
    requireServerEnv(
      "ADMIN_SESSION_SECRET",
    );

  return new TextEncoder().encode(
    secret,
  );
}

export async function createSessionToken(
  email: string,
): Promise<string> {
  const now =
    Math.floor(
      Date.now() / 1000,
    );

  return new SignJWT({
    email,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setSubject(
      "pdf-office-admin",
    )
    .setIssuedAt(
      now,
    )
    .setExpirationTime(
      now +
        ADMIN_SESSION_SECONDS,
    )
    .sign(
      getSessionSecret(),
    );
}

export async function verifySessionToken(
  token: string,
): Promise<AdminSession | null> {
  try {
    const {
      payload,
    } =
      await jwtVerify(
        token,
        getSessionSecret(),
        {
          algorithms: [
            "HS256",
          ],
          subject:
            "pdf-office-admin",
        },
      );

    if (
      typeof payload.email !==
      "string"
    ) {
      return null;
    }

    return {
      email:
        payload.email,
    };
  } catch {
    return null;
  }
}