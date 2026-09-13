import {
  cookies,
} from "next/headers";

import {
  findAdminByEmail,
} from "../repositories/admin";

import {
  ADMIN_SESSION_COOKIE,
} from "./constants";

import {
  verifySessionToken,
} from "./session";

export type CurrentAdmin = {
  email: string;
};

export async function getCurrentAdmin(): Promise<
  CurrentAdmin | null
> {
  try {
    const cookieStore =
      await cookies();

    const token =
      cookieStore.get(
        ADMIN_SESSION_COOKIE,
      )?.value;

    if (!token) {
      return null;
    }

    const session =
      await verifySessionToken(
        token,
      );

    if (!session) {
      return null;
    }

    const admin =
      await findAdminByEmail(
        session.email,
      );

    if (!admin) {
      return null;
    }

    return {
      email: admin.email,
    };
  } catch {
    return null;
  }
}