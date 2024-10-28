'use client'
import React from 'react';
import Image from 'next/image';
import logo from '@/Assets/logo-white.svg.png';
import { RiDashboardFill } from "react-icons/ri";
import { BsHousesFill } from "react-icons/bs";
import { MdOutlineExplore, MdSettings } from "react-icons/md";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const links = [
        { name: 'Dashboard', icon: <RiDashboardFill />, href: '/Dashboard' },
        { name: 'Properties', icon: <BsHousesFill />, href: '/Dashboard/properties' },
        { name: 'Explore', icon: <MdOutlineExplore />, href: '/Dashboard/explore' },
        { name: 'Settings', icon: <MdSettings />, href: '/Dashboard/settings' },
    ];

    const pathName = usePathname();

    return (
        <aside className="w-full">
            <div className="bg-primary p-3 rounded">
                <Image src={logo} alt="Logo" />
            </div>

            <div>
                {links.map((link) => {
                    const isActive = pathName === link.href; // Check if link is active

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-2 p-3 rounded ${
                                isActive ? 'bg-secondary text-white' : 'bg-primary text-gray-300'
                            }`}
                        >
                            <h2 className="text-2xl">{link.icon}</h2>
                            {link.name}
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
};

export default Sidebar;
