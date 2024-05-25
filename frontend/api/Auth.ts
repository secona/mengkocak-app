export interface LoginDTO {
  username: string;
  password: string;
}

export class Auth {
  private static AUTH_API_URL = new URL("auth", process.env.API_URL!);

  static async login(data: LoginDTO): Promise<{ token: string; }> {
    const url = new URL(Auth.AUTH_API_URL);
    url.pathname += "/login";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    return res.json();
  }
}
