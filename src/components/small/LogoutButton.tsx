"use client";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
    return (
        <button
            onClick={() => {
                deleteCookie("userId");
                router.push("/");
            }}
            className="p-4 transition-colors bg-red-500 hover:bg-red-400"
        >
            Logout
        </button>
    );
}
