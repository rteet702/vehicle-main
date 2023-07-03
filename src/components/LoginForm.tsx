"use client";

import { FormEvent, useState } from "react";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <form
            onSubmit={handleLogin}
            className="p-4 bg-white rounded-sm shadow-lg"
        >
            <h1 className="text-2xl text-center">Vehicle Maintenance Log</h1>
            <hr className="my-4" />
            <section className="flex flex-col gap-3">
                <input
                    type="text"
                    className="py-2 pl-4 transition-colors bg-neutral-100 focus:bg-neutral-200 focus:outline-none focus:text-black"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type={showPassword ? "text" : "password"}
                    className="py-2 pl-4 transition-colors bg-neutral-100 focus:bg-neutral-200 focus:outline-none focus:text-black"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-center gap-4">
                    <input
                        id="showPassword"
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label htmlFor="showPassword">Show Password</label>
                </div>
                <button className="py-2 text-white transition-colors duration-500 bg-cyan-800 hover:bg-cyan-600">
                    Login
                </button>
            </section>
            <hr className="my-4" />
            <footer>Dont have a login? Contact Robert Teets.</footer>
        </form>
    );
}