import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  BookOpen,
  Trophy,
  Calendar,
  ThumbsUp,
  PenTool,
  Edit,
  Camera,
  Mail,
  Lock,
  Save,
  X,
} from "lucide-react";

import "./profile_v2.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state) => state?.oneMinuteStory?.currentUser?.data
  );
  console.log("Current User:", currentUser);
  const [image, setImage] = useState(undefined);
  const fileRef = useRef(null);

  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: currentUser.username || "NightScribe",
    email: currentUser.email || "nightscribe@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const userStats = {
    storiesStarted: 12,
    scenesWritten: 47,
    totalUpvotes: 328,
    joinDate: "March 2024",
    favoriteGenre: "Sci-Fi",
    writingStreak: 5,
  };

  const recentStories = [
    {
      id: "1",
      title: "The Last Signal",
      lastContribution: "2 hours ago",
      upvotes: 24,
      status: "active",
    },
    {
      id: "2",
      title: "Digital Dreams",
      lastContribution: "1 day ago",
      upvotes: 18,
      status: "completed",
    },
    {
      id: "3",
      title: "Quantum Echoes",
      lastContribution: "3 days ago",
      upvotes: 31,
      status: "active",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // In a real app, this would make an API call to update the user profile
    console.log("Saving profile changes:", formData);
    setIsEditing(false);
    // Reset password fields after save
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    setFormData({
      username: "NightScribe",
      email: "nightscribe@example.com",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="profile-card"
        >
          <div className="card-content">
            <div className="profile-header">
              <div className="relative">
                <div className="avatar">
                  {/* <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                      setImage(e.target.files[0])
                    }
                  /> */}
                  {currentUser.profilePicture ? (
                    <img
                      src={currentUser.profilePicture}
                      alt="profile"
                      className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2 hover-effect"
                      onClick={() =>
                        fileRef.current.click()
                      }
                    />
                  ) : (
                    <User className="avatar-icon" />
                  )}
                  
                </div>
                {isEditing && (
                  <button className="edit-button">
                    <Camera className="w-4 h-4 text-cinema-text" />
                  </button>
                )}
              </div>

              <div>
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-cinema-text mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={
                          currentUser.username ||
                          "NightScribe"
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "username",
                            e.target.value
                          )
                        }
                        // className="cinema-input w-64"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cinema-text mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange(
                            "email",
                            e.target.value
                          )
                        }
                        className="cinema-input w-64"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="username-title">
                      {formData.username}
                    </h1>
                    <p className="dim-text">
                      Weaving stories in the digital
                      darkness since {userStats.joinDate}
                    </p>
                  </>
                )}

                <div className="user-info-line">
                  <div className="info-label">
                    <Calendar className="w-4 h-4 text-cinema-accent" />
                    <span>
                      {userStats.writingStreak} day writing
                      streak
                    </span>
                  </div>
                  <div className="info-label">
                    <BookOpen className="w-4 h-4 text-cinema-accent" />
                    <span>
                      Favorite: {userStats.favoriteGenre}
                    </span>
                  </div>
                </div>
              </div>

              <div className="header-buttons">
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      // className="cinema-button flex items-center space-x-2"
                      className="editButton"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      // className="px-4 py-2 bg-cinema-medium hover:bg-cinema-light text-cinema-text rounded-lg transition-colors flex items-center space-x-2"
                      className="cancelButton"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="editButton"
                    // className="cinema-button flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>

            {/* Password Change Section */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-8 pt-6 border-t border-cinema-medium"
              >
                <h3 className="section-title">
                  Change Password
                </h3>
                <div className="password-grid">
                  <div>
                    <label className="block text-sm font-medium text-cinema-text mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cinema-text-dim" />
                      <input
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) =>
                          handleInputChange(
                            "currentPassword",
                            e.target.value
                          )
                        }
                        className="cinema-input w-full pl-10"
                        placeholder="Enter current password"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cinema-text mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cinema-text-dim" />
                      <input
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) =>
                          handleInputChange(
                            "newPassword",
                            e.target.value
                          )
                        }
                        className="cinema-input w-full pl-10"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cinema-text mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cinema-text-dim" />
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange(
                            "confirmPassword",
                            e.target.value
                          )
                        }
                        className="cinema-input w-full pl-10"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>
                {formData.newPassword &&
                  formData.confirmPassword &&
                  formData.newPassword !==
                    formData.confirmPassword && (
                    <p className="text-red-400 text-sm mt-2">
                      Passwords do not match
                    </p>
                  )}
              </motion.div>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
        {/* <div className="disabled-div "> */}
          {/* Stats Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="profile-card">
              <div className="card-content">
                <h2 className="section-title">
                  Writing Stats
                </h2>
                <div className="stat-box">
                  <div className="text-center">
                    <div className="stat-value">
                      {userStats.scenesWritten}
                    </div>
                    <div className="stat-label">
                      <PenTool className="w-4 h-4" />
                      <span>Scenes Written</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="stat-value">
                      {userStats.totalUpvotes}
                    </div>
                    <div className="stat-label">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Total Upvotes</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="stat-value">
                      {userStats.storiesStarted}
                    </div>
                    <div className="stat-label">
                      <BookOpen className="w-4 h-4" />
                      <span>Stories Started</span>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mt-8">
                  <h3 className="section-title">
                    Recent Achievements
                  </h3>
                  <div className="space-y-3">
                    <div className="achievement-item">
                      <Trophy className="w-5 h-5 text-cinema-accent" />
                      <div>
                        <div className="achievement-title">
                          Scene Master
                        </div>
                        <div className="achievement-desc">
                          Wrote 50+ scenes
                        </div>
                      </div>
                    </div>

                    <div className="achievement-item">
                      <Trophy className="w-5 h-5 text-cinema-accent" />
                      <div>
                        <div className="achievement-title">
                          Community Favorite
                        </div>
                        <div className="achievement-desc">
                          Received 300+ upvotes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="profile-card">
              <div className="card-content">
                <h2 className="section-title">
                  My Stories
                </h2>

                <div className="story-list">
                  {recentStories.map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="story-card"
                    >
                      <div className="story-info">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            story.status === "active"
                              ? "bg-green-500"
                              : "bg-cinema-accent"
                          }`}
                        />
                        <div>
                          <h3 className="font-medium text-cinema-text">
                            {story.title}
                          </h3>
                          <p className="text-sm text-cinema-text-dim">
                            Last contribution:{" "}
                            {story.lastContribution}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-cinema-text-dim">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">
                            {story.upvotes}
                          </span>
                        </div>
                        <span
                          className={`story-status ${
                            story.status === "active"
                              ? "active"
                              : "paused"
                          }`}
                        >
                          {story.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button className="cinema-button flex items-center space-x-2">
                    <PenTool className="w-4 h-4" />
                    <span>Start New Story</span>
                  </button>

                  <button className="secondary-button">
                    View All Stories
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
