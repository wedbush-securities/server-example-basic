import { AuthProvider } from "@glue42/server-admin-ui";
import { Options } from "@glue42/server-api";
import { ClientAPI } from "@glue42/server-api/dist/client";

export class BasicAuthProvider implements AuthProvider {
  public isLoading = false;
  public isAuthenticated = false;
  public addTokenToRequest = false;
  public addCustomHeaders = true;
  public addCredentialsToRequest = false;
  public addUsernameToRequest = true;
  public error: any = undefined;
  private user?: string;
  private options?: Options;

  constructor(private setChange: (a: any) => void, private clear: () => void) {
  }

  public setOptions(options: Options) {
    this.options = options;
  }

  public async loginIfNeeded(): Promise<void> {
    if (!this.options) {
      return;
    }

    const clientApi = new ClientAPI(this.options);

    let error: string | undefined;
    try {
      const who = await clientApi.whoAmI();
      if (!who.groups.includes("GLUE42_SERVER_ADMIN")) {
        error = "Error authorizing user - you don't have admin privileges";
      }
    } catch (e: any) {
      error = "Error authenticating user - " + e.message;
    }

    this.isLoading = false;
    if (error) {
      this.isAuthenticated = false;
      this.error = error;
    } else {
      this.isAuthenticated = true;
    }
    this.setChange(new Date());
  }

  public async getAccessToken(): Promise<string | undefined> {
    if (!this.options) {
      return undefined;
    }
    const d = `${this.options.auth.basic?.username}:${this.options.auth.basic?.password}`;
    const c = btoa(d);
    return `Basic ${c}`;
  }

  public async getUserInfo(): Promise<{ id?: string | undefined; } | undefined> {
    return {
      id: this.options?.auth?.basic?.username
    };
  }

  public async logOut(): Promise<void> {
    console.log(`logout..`)
    this.options = undefined;
    this.isAuthenticated = false;
    this.clear();
  }

  public get customHeaders(): { [name: string]: string; } | undefined {
    if (!this.options) {
      return undefined;
    }
    const d = `${this.options.auth.basic?.username}:${this.options.auth.basic?.password}`;
    const c = btoa(d);
    const value = `Basic ${c}`;
    return {
      "Authorization": value
    }

  }


}
