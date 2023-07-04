import RegisterForm from "@/components/RegisterForm";
import { hasCookie } from "cookies-next";
import { redirect } from "next/navigation";

export default function Page() {
    if (hasCookie("userId")) redirect("/dashboard");
    return <RegisterForm />;
}
