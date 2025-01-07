interface NestErrorResponse {
  message: string;
  statusCode?: number;
}

interface NestAuthResponse {
  accessToken: string;
}

export async function nestLogin(
  email: string,
  password: string,
): Promise<NestAuthResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEST_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    },
  );

  if (!response.ok) {
    const errorBody = (await response.json()) as NestErrorResponse;
    throw new Error(errorBody.message ?? "Unknown error from Nest");
  }

  return response.json() as Promise<NestAuthResponse>;
}
