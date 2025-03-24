import React from "react";
import {
  MdDashboard,
  MdFlood,
  MdOutlineFlood,
  MdOutlineForwardToInbox,
  MdOutlineLogout,
  MdOutlineSettings,
} from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { MdSearch } from "react-icons/md";
import { GrGroup } from "react-icons/gr";

function Sidebar() {
  return (
    <div className="h-100%">
      <div className="relative flex h-full w-full flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
        <nav className="flex min-w-[240px] flex-col gap-1 p-1 font-sans text-base font-normal text-blue-gray-700">
          <div className="relative block w-full">
            <div className="relative mb-4 flex items-center outline-none">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute right-3 text-gray-500 top-0 mt-3 mr-4">
                <MdSearch />
              </span>
            </div>
            <hr className="my-2 border-blue-gray-50" />
            <div
              role="button"
              className="flex flex-col items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white active:bg-blue-500 active:text-white"
            >
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/dashboard/organization";
                }}
                className="flex items-center justify-start w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-white"
              >
                <div className="grid mr-2 place-items-center">
                  <span>
                    <MdDashboard />
                  </span>
                </div>
                <p className="block font-sans text-base antialiased font-normal leading-relaxed">
                  Dashboard
                </p>
              </button>
            </div>
            <div className="overflow-hidden">
              <div className="block w-full py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700">
                <nav className="flex min-w-[240px] flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
                  <div
                    role="button"
                    className="flex flex-col items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white active:bg-blue-500 active:text-white"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = "/analytics";
                      }}
                      className="flex items-center justify-start w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-white"
                    >
                      <div className="grid mr-2 place-items-center">
                        <span>
                          <IoAnalytics />
                        </span>
                      </div>
                      <p className="block font-sans text-base antialiased font-normal leading-relaxed">
                        Analytics
                      </p>
                    </button>
                  </div>

                  <div
                    role="button"
                    className="flex flex-col items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white active:bg-blue-500 active:text-white"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = "/reporting";
                      }}
                      className="flex items-center justify-start w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-white"
                    >
                      <div className="grid mr-2 place-items-center">
                        <span>
                          <TbReportSearch />
                        </span>
                      </div>
                      <p className="block font-sans text-base antialiased font-normal leading-relaxed">
                        Reporting
                      </p>
                    </button>
                  </div>

                  <div
                    role="button"
                    className="flex flex-col items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white active:bg-blue-500 active:text-white"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = "/member-list";
                      }}
                      className="flex items-center justify-start w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-white"
                    >
                      <div className="grid mr-2 place-items-center">
                        <span>
                          <GrGroup />
                        </span>
                      </div>
                      <p className="block font-sans text-base antialiased font-normal leading-relaxed">
                        Member List
                      </p>
                    </button>
                  </div>
                  <div
                    role="button"
                    className="flex flex-col items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white active:bg-blue-500 active:text-white"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = "/ongoing-disaster";
                      }}
                      className="flex items-center justify-start w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-white"
                    >
                      <div className="grid mr-2 place-items-center">
                        <span>
                          <MdFlood />
                        </span>
                      </div>
                      <p className="block font-sans text-base antialiased font-normal leading-relaxed">
                        Ongoing Disaster
                      </p>
                    </button>
                  </div>
                  <div
                    role="button"
                    className="flex flex-col items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white active:bg-blue-500 active:text-white"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = "/past-disaster";
                      }}
                      className="flex items-center justify-start w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-white"
                    >
                      <div className="grid mr-2 place-items-center">
                        <span>
                          <MdOutlineFlood />
                        </span>
                      </div>
                      <p className="block font-sans text-base antialiased font-normal leading-relaxed">
                        Past Disaster
                      </p>
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <hr className="my-2 border-blue-gray-50" />
          <div
            role="button"
            onClick={() => {
                window.location.href = "/inbox";
              }}
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white active:bg-blue-500 active:text-white"
          >
            <div className="grid mr-4 place-items-center">
              <MdOutlineForwardToInbox />
            </div>
            <span>Inbox</span>
            <div className="grid ml-auto place-items-center justify-self-end">
              <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-full select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
                <span>14</span>
              </div>
            </div>
          </div>
          <div
            role="button"
            onClick={() => {
                window.location.href = "/profile";
              }}
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white active:bg-blue-500 active:text-white"
          >
            <div className="grid mr-4 place-items-center">
              <CgProfile />
            </div>
            <span>Profile</span>
          </div>
          <div
            role="button"
            onClick={() => {
                window.location.href = "/settings";
              }}
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white active:bg-blue-500 active:text-white"
          >
            <div className="grid mr-4 place-items-center">
              <MdOutlineSettings />
            </div>
            <span>Settings</span>
          </div>
          <hr className="my-2 border-blue-gray-50" />
          <div
            role="button"
            onClick={() => {
                window.location.href = "/log-out";
              }}
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white active:bg-blue-500 active:text-white"
          >
            <div className="grid mr-4 place-items-center">
              <MdOutlineLogout />
            </div>
            <span>Log Out</span>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
