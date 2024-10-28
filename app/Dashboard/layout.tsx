import React from "react";
import Sidebar from "../components/Sidebar";

export default function RootLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen gap-2">
            <div className="w-1/5 border">
                <Sidebar />
            </div>
            <main className="flex-1 p-3">
                {children}
            </main>
        </div>
    );
}
