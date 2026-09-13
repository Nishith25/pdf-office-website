"use server";

import {
  cookies,
} from "next/headers";

import {
  redirect,
} from "next/navigation";

import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_SECONDS,
} from "../../../lib/auth/constants";

import {
  loginSchema,
} from "../../../lib/auth/login-schema";

import {
  verifyPassword,
} from "../../../lib/auth/password";

import {
  createSessionToken,
} from "../../../lib/auth/session";

import {
  findAdminByEmail,
} from "../../../lib/repositories/admin";

export type LoginState = {
  error: string | null;
};

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed =
    loginSchema.safeParse({
      email:
        formData.get(
          "email",
        ),
      password:
        formData.get(
          "password",
        ),
    });

  if (!parsed.success) {
    return {
      error:
        "Enter a valid email and password.",
    };
  }

  const {
    email,
    password,
  } = parsed.data;

  const admin =
    await findAdminByEmail(
      email,
    );

  if (!admin) {
    return {
      error:
        "Incorrect email or password.",
    };
  }

  const validPassword =
    await verifyPassword(
      password,
      admin.passwordHash,
    );

  if (!validPassword) {
    return {
      error:
        "Incorrect email or password.",
    };
  }

  const token =
    await createSessionToken(
      admin.email,
    );

  const cookieStore =
    await cookies();

  cookieStore.set(
    ADMIN_SESSION_COOKIE,
    token,
    {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite: "lax",

      path: "/",

      maxAge:
        ADMIN_SESSION_SECONDS,
    },
  );

  redirect(
    "/admin",
  );
}