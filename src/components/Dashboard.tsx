"use client";

import { deleteCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LogoutButton from "./small/LogoutButton";

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const auth = hasCookie("userId");
        if (!auth) {
            router.push("/");
        }
    }, []);

    return (
        <section className="p-4 bg-white rounded-sm shadow-lg">
            <LogoutButton />
        </section>
    );
}
