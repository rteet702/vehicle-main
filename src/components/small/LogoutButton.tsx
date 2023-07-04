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
            className="p-4 transition-colors border-b-2 hover:border-red-500 bg-neutral-100 hover:bg-red-300"
        >
            Logout
        </button>
    );
}
