import React from "react";
import Sidebar from "../components/Sidebar";

export default function RootLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <div className="w-1/4 border">
                <Sidebar />
            </div>
            <main className="flex-1"> {/* Keeps `flex-1` to fill remaining space */}
                {children}
            </main>
        </div>
    );
}
