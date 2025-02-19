"use client";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
const Header: React.FC = () => {
    return (
        <header>
            <div className="bg-slate-800 py-2">
                <div
                    className={twMerge(
                        "mx-4 max-w-2xl md:mx-auto",
                        "flex items-center justify-between",
                        "text-lg font-bold text-white",
                    )}
                >
                    <div>
                        <Link href="/">Main</Link>
                    </div>
                    <div className="">
                        <Link
                            href="/new
                        "
                        >
                            new
                        </Link>
                    </div>
                    <div className="">
                        <Link href="/games">Games</Link>
                    </div>
                    <div>
                        <Link href="/about">About</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
