import { Options } from "@glue42/server-api";
import { ClientAPI } from "@glue42/server-api/dist/client";
import { useState } from "react";

export function Login(props: { url: string, success: (options: Options) => void }) {
    const [error, setError] = useState<string>();
    //
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const isGD = document.location.href.endsWith(`/gd`) || document.location.href.endsWith(`?gd`);
    console.log(`isGD`, isGD);

    const login = async () => {
        const options = {
            baseUrl: props.url,
            auth: {
                basic: {
                    username,
                    password
                }
            }
        };
        const clientApi = new ClientAPI(options);

        try {
            await clientApi.whoAmI();
            if (isGD) {
                const headerValue = `${username}:${password}`;
                const base64 = btoa(headerValue);
                await ((window as any).glue42gd as any).authDone({
                    user: username,
                    headers: {
                        "Authorization": `Basic ${base64}`
                    }
                });
            } else {
                props.success(options)
            }
        } catch (e: any) {
            // TODO *mark error
            console.error(e);
            setError("Error authenticating user - " + e.message);
        }
    };

    const canLogin = () => username.length > 3 && password.length > 3;
    const handleKeypress = (e: { key: string; }) => {
        //it triggers by pressing the enter key
        if (e.key === "Enter") {
            if (canLogin()) {
                login();
            }
        }
    };

    const closeWindow = () => {
        window.close();
    };

    return (
        <div className="container-fluid h-100 d-flex flex-column">
            <div className="align-items-end flex-grow-1 row justify-content-center">
                <div className="col-12 col-lg-5 col-md-6 col-sm-8 col-xl-4 text-center px-5">
                    <img src="/logo.svg" alt="Logo" className="logo-img mb-5" />
                </div>
            </div>
            <div className="row justify-content-center flex-grow-1">
                <div className="col-12 col-lg-5 col-md-6 col-sm-8 col-xl-4">
                    <div className="form-group">
                        <label htmlFor="email">Username</label>
                        <input id="email" type="input" onKeyPress={handleKeypress} required className="form-control" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="form-group position-relative">
                        <label htmlFor="password">Password</label>
                        <input type="password" onKeyPress={handleKeypress} required className="form-control" id="password" placeholder="Enter Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="invalid-feedback d-block">{error}</div>
                    </div>
                    <div className="btn-group d-flex pt-3">
                        <button className="btn btn-primary mr-3" onClick={() => login()} disabled={!canLogin()}>Login</button>
                        <button className="btn btn-secondary" onClick={() => closeWindow()}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}