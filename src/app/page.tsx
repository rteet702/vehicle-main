import LoginForm from "@/components/LoginForm";
import { hasCookie } from "cookies-next";
import { redirect } from "next/navigation";

export default function Home() {
    if (hasCookie("userId")) redirect("/dashboard");
    return <LoginForm />;
}
