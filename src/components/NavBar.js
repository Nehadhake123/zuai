"use client";
import { FaFile, FaTachometerAlt, FaQuestionCircle } from 'react-icons/fa';
import { LuLayoutDashboard, LuFiles } from "react-icons/lu";
import { MdLibraryBooks, MdOutlineQuiz } from "react-icons/md";

export default function Navbar() {
  return (
    <div className="w-16 h-screen bg-white text-black flex flex-col items-center py-8 rounded-2xl shadow-lg">
      <div className="relative mb-4">
        <h1 className="relative text-center text-2xl font-extrabold">
          <span className="inline-block text-Customblack">
            ZuA
            <span className="absolute -top-0 left-[calc(100%-0.75em)] text-yellow-400 text-xs">✦</span>
            ı
          </span>
          <p className="ml-10 text-gray-500 font-gilroy text-sm font-normal">
            beta
          </p>
        </h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-6">
          <li>
            <a
              href="/files"
              className="flex flex-col items-center text-gray-700 bg-purple-600 p-2 rounded-full text-white hover:text-black transition-colors duration-300"
              title="Files"
            >
              <LuLayoutDashboard size="28" className="text-center" />
            </a>
          </li>
          <li>
            <a
              href="/dashboard"
              className="flex flex-col items-center text-gray-700 hover:text-black transition-colors duration-300"
              title="Dashboard"
            >
              <MdLibraryBooks size="28" className="mb-1" />
            </a>
          </li>
          <li>
            <a
              href="/help"
              className="flex flex-col items-center text-gray-700 hover:text-black transition-colors duration-300"
              title="Help"
            >
              <LuFiles size="28" className="mb-1" />
            </a>
          </li>
          <li>
            <a
              href="/quiz"
              className="flex flex-col items-center text-gray-700 hover:text-black transition-colors duration-300"
              title="Quiz"
            >
              <MdOutlineQuiz size="28" className="mb-1" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}