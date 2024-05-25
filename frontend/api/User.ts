import { PaginationOptions, PaginationResponse, Response } from "./common";

export interface CreateUserDTO {
  name: string;
  username: string;
  password: string;
}

export interface UpdateUserDTO {
  name: string;
}

export interface GetManyOptions {
  userId: string;
}

export class User {
  private static USER_API_URL = process.env.API_URL + "/users";
  private static PROFILE_API_URL = process.env.API_URL + "/users/profile";

  id!: string;
  name!: string;
  username!: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  static async getMany(options?: PaginationOptions & GetManyOptions): Promise<PaginationResponse<User>> {
    const url = new URL(User.USER_API_URL);
    url.search = new URLSearchParams({ ...options }).toString();

    const res = await fetch(url);
    return res.json();
  }

  static async getOne(userId: string): Promise<Response<User>> {
    const url = new URL(User.USER_API_URL);
    url.pathname += "/" + userId;

    const res = await fetch(url);
    return res.json();
  }

  static async create(data: CreateUserDTO): Promise<Response<User>> {
    console.log(JSON.stringify(data));

    const res = await fetch(User.USER_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  }

  static async getLoggedIn(token: string): Promise<Response<User>> {
    const res = await fetch(User.PROFILE_API_URL, {
      headers: {
        "Authorization": "Bearer " + token,
      }
    });

    return res.json();
  }

  static async updateLoggedIn(token: string, data: UpdateUserDTO): Promise<Response<User>> {
    const res = await fetch(User.PROFILE_API_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    return res.json();
  }

  static async deleteLoggedIn(token: string) {
    await fetch(User.PROFILE_API_URL, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token,
      },
    });
  }
}
