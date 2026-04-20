/**
 * PROFILE PAGE
 *
 * What: Shows user profile info
 * Features: View and update name
 */

import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

function Profile() {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      setLoading(true);
      if (user) {
        const token = localStorage.getItem("token") || "";
        useAuthStore.getState().setUser({ ...user, name: name.trim() }, token);
      }
      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-600 text-sm">Manage your account</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-4 mb-6 mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {getInitials(name || "U")}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email (Read Only) */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full p-2 border rounded bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Email cannot be changed
            </p>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
        <h3 className="font-semibold text-gray-800 mb-4">Account Info</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Role</span>
            <span className="text-gray-800 capitalize">
              {user?.role || "member"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Account ID</span>
            <span className="text-gray-800 font-mono text-xs">
              {user?.id?.slice(0, 12)}...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;