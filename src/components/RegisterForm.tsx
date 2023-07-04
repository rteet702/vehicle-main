"use client";

import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
                confirmPassword,
                firstName,
                lastName,
                email,
            }),
        });

        if (!response.ok) return;

        const data = await response.json();

        setCookie("userId", data.user.id);

        router.push("/dashboard");
    };

    return (
        <form
            onSubmit={handleRegister}
            className="p-4 bg-white rounded-sm shadow-lg"
        >
            <h1 className="text-2xl text-center">Register</h1>
            <hr className="my-4" />
            <main className="flex flex-col gap-3">
                <div className="flex gap-3">
                    <section className="flex flex-col gap-3">
                        <input
                            type="text"
                            className="py-2 pl-4 transition-colors bg-neutral-100 focus:bg-neutral-200 focus:outline-none focus:text-black"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="py-2 pl-4 transition-colors bg-neutral-100 focus:bg-neutral-200 focus:outline-none focus:text-black"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            type="email"
                            className="py-2 pl-4 transition-colors bg-neutral-100 focus:bg-neutral-200 focus:outline-none focus:text-black"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </section>
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
                        <input
                            type={showPassword ? "text" : "password"}
                            className="py-2 pl-4 transition-colors bg-neutral-100 focus:bg-neutral-200 focus:outline-none focus:text-black"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </section>
                </div>
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
                    Register
                </button>
            </main>
            <hr className="my-4" />
            <footer>
                Already have a login? <Link href="/">Click Here!</Link>{" "}
            </footer>
        </form>
    );
}
