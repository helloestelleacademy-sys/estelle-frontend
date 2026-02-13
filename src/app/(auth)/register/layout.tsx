import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Create your Estelle account and start building your personal brand today.",
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
