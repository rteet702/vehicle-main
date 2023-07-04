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
        <section className="p-4 bg-white rounded-sm shadow-lg">
            <h1>Hello {user?.firstName}!</h1>
            <LogoutButton />
        </section>
    );
}
