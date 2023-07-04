"use client";

import { CookieValueTypes, getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "./small/LogoutButton";

interface IUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<IUser>();
    const router = useRouter();

    useEffect(() => {
        const auth = hasCookie("userId");
        if (!auth) {
            return router.push("/");
        }

        const userId = getCookie("userId");
        getUser(userId);
    }, []);

    async function getUser(id: CookieValueTypes) {
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        if (!response.ok) {
            return;
        }

        const userData = await response.json();
        setUser(userData.user);
    }

    return (
        <main className="w-full p-4 bg-white rounded-sm shadow-lg lg:w-2/3">
            <nav className="flex items-center justify-between">
                <h1 className="text-3xl">Hello {user?.firstName}!</h1>
                <ul>
                    <button className="p-4 transition-colors border-b-2 bg-neutral-100 hover:bg-neutral-300">
                        View Vehicles
                    </button>
                    <button className="p-4 transition-colors border-b-2 bg-neutral-100 hover:bg-cyan-300 hover:border-cyan-500">
                        Add Work Order
                    </button>
                    <LogoutButton />
                </ul>
            </nav>
            <section>
                <h2 className="text-2xl">Pending Work Orders</h2>
                <table>
                    <thead></thead>
                    <tbody></tbody>
                </table>
            </section>
        </main>
    );
}
