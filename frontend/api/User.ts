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
  private static USER_API_URL = new URL("users", process.env.API_URL);
  private static PROFILE_API_URL = new URL("users/profile", process.env.API_URL);

  id!: string;
  name!: string;
  username!: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  static async getMany(pagination?: PaginationOptions, options?: GetManyOptions): Promise<PaginationResponse<User>> {
    const url = new URL(User.USER_API_URL);
    url.search = new URLSearchParams({ ...pagination, ...options }).toString();

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

  static async getLoggedIn(): Promise<Response<User>> {
    const res = await fetch(User.PROFILE_API_URL);
    return res.json();
  }

  static async updateLoggedIn(data: UpdateUserDTO): Promise<Response<User>> {
    const res = await fetch(User.PROFILE_API_URL, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    return res.json();
  }

  static async deleteLoggedIn() {
    await fetch(User.PROFILE_API_URL, {
      method: "DELETE",
    });
  }
}
