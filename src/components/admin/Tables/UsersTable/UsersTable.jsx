"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, X, Users, Shield, UserCheck, Calendar } from "lucide-react";

const UsersTable = ({ initialUsers = [] }) => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="min-h-screen text-slate-200 p-4 sm:p-6 lg:p-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-xl">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Manage <span className="text-red-600">Users</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              View and manage all registered user accounts and roles.
            </p>
          </div>
          <div className="bg-red-600/10 border border-red-500/30 text-red-500 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl w-fit">
            Total Users: {users.length}
          </div>
        </div>

        {users.length === 0 ? (
          <div className="bg-slate-900/20 backdrop-blur-xl p-16 rounded-3xl border border-slate-800/60 text-center space-y-4 shadow-inner">
            <div className="w-16 h-16 bg-slate-950 border border-slate-800 text-slate-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <Users size={24} />
            </div>
            <p className="text-slate-400 text-sm font-medium max-w-xs mx-auto">
              No registered users found in the database.
            </p>
          </div>
        ) : (
          <>
            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {users.map((user) => (
                <div 
                  key={user._id} 
                  className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full bg-slate-950 border border-slate-800 overflow-hidden flex-shrink-0">
                      <Image
                        src={user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"}
                        alt={user.name || "User"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-0.5 overflow-hidden">
                      <h3 className="text-sm font-bold text-white truncate">{user.name || "Unnamed User"}</h3>
                      <p className="text-xs font-mono text-slate-400 truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3.5 border-t border-slate-800/60">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider ${
                      user.role === "admin" 
                        ? "bg-red-600/10 text-red-500 border border-red-500/20" 
                        : "bg-slate-800/50 text-slate-300 border border-slate-700"
                    }`}>
                      {user.role === "admin" ? <Shield size={10} /> : <UserCheck size={10} />}
                      {user.role || "user"}
                    </span>
                    
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-300 bg-slate-950 border border-slate-800 rounded-xl hover:bg-red-600 hover:text-white transition-all cursor-pointer shadow-md"
                    >
                      <Eye size={12} /> Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= DESKTOP TABLE VIEW ================= */}
            <div className="hidden md:block overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/20 backdrop-blur-xl shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-[10px] font-extrabold uppercase tracking-[2px] text-slate-400">
                    <th className="p-5">User Profile</th>
                    <th className="p-5">Email Address</th>
                    <th className="p-5">Role</th>
                    <th className="p-5">Joined Date</th>
                    <th className="p-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-sm text-slate-300">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-800/10 transition-all group">
                      <td className="p-5 flex items-center gap-3.5">
                        <div className="relative w-10 h-10 rounded-full bg-slate-950 border border-slate-800 overflow-hidden flex-shrink-0">
                          <Image
                            src={user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"}
                            alt={user.name || "User"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-100 tracking-tight">{user.name || "Unnamed User"}</p>
                          <p className="text-[10px] font-mono text-slate-500">ID: {user._id?.slice(-8)}</p>
                        </div>
                      </td>
                      <td className="p-5 font-mono text-xs text-slate-400">
                        {user.email}
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                          user.role === "admin" 
                            ? "bg-red-600/10 text-red-500 border border-red-500/20" 
                            : "bg-slate-800/50 text-slate-300 border border-slate-700"
                        }`}>
                          {user.role === "admin" ? <Shield size={10} /> : <UserCheck size={10} />}
                          {user.role || "user"}
                        </span>
                      </td>
                      <td className="p-5 text-xs text-slate-400">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: 'numeric', month: 'short', day: 'numeric'
                        }) : "N/A"}
                      </td>
                      <td className="p-5 text-center">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-500/50 hover:bg-red-600 text-slate-400 hover:text-white transition-all cursor-pointer shadow-md"
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ================= USER DETAILS MODAL ================= */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
              <div className="h-1.5 w-full bg-gradient-to-r from-red-600 to-rose-400"></div>

              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[2px] text-red-500">User Profile Specs</p>
                  <h3 className="text-lg font-black text-white mt-0.5">Account Overview</h3>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
                {[
                  { label: "Full Name", value: selectedUser.name, highlight: true },
                  { label: "Email Address", value: selectedUser.email, breakable: true },
                  { label: "Account Role", value: selectedUser.role || "user" },
                  { label: "User ID", value: selectedUser._id, breakable: true },
                  { label: "Registration Date", value: selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : "N/A" },
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-3 items-center bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">{row.label}</span>
                    <span className={`col-span-2 text-xs text-slate-200 font-medium ${row.highlight ? 'text-red-400 font-bold' : ''} ${row.breakable ? 'break-all font-mono text-[10px]' : ''}`}>
                      {row.value || "---"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-slate-800 bg-slate-950/40 flex justify-end">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[10px] tracking-widest uppercase rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UsersTable;