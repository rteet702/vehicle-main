"use client";

import { deleteCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    if (!hasCookie("userId")) router.push("/");

    const handleLogout = () => {
        deleteCookie("userId");
        router.push("/");
    };

    return (
        <main>
            <button onClick={handleLogout}>Logout</button>
        </main>
    );
}
