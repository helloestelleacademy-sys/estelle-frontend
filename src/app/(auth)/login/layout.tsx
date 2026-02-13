import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Access your Estelle account to continue your learning journey.",
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
