"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-dark/80 backdrop-blur-md border-b border-blue-500/10 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg"></div>
            <span className="font-bold text-lg text-white">Chain Support</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition">
              Contact
            </Link>

            {session ? (
              <>
                <Link href="/admin/dashboard" className="text-gray-300 hover:text-white transition">
                  Dashboard
                </Link>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  size="sm"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/admin/login">
                <Button variant="primary" size="sm">
                  Admin
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link href="/" className="block text-gray-300 hover:text-white">
              Home
            </Link>
            <Link href="/about" className="block text-gray-300 hover:text-white">
              About
            </Link>
            <Link href="/contact" className="block text-gray-300 hover:text-white">
              Contact
            </Link>
            {session ? (
              <>
                <Link href="/admin/dashboard" className="block text-gray-300 hover:text-white">
                  Dashboard
                </Link>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/admin/login" className="block">
                <Button variant="primary" size="sm" className="w-full">
                  Admin
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
