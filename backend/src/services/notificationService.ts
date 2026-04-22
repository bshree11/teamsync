//NOTIFICATION SERVICE - manages user notifications


import Notification from '../models/Notification';

interface CreateNotificationInput {
  user: string;
  message: string;
  type: string;
  relatedId?: string;
}

interface ServiceResult {
  success: boolean;
  notification?: any;
  notifications?: any[];
  error?: string;
}

/**
 * CREATE NOTIFICATION
 */
export const createNotification = async (
  input: CreateNotificationInput
): Promise<ServiceResult> => {
  const notification = await Notification.create({
    user: input.user,
    message: input.message,
    type: input.type,
    relatedId: input.relatedId,
  });

  return {
    success: true,
    notification: {
      id: notification._id,
      user: notification.user,
      message: notification.message,
      type: notification.type,
      read: notification.read,
      createdAt: notification.createdAt,
    },
  };
};

/**
 * GET USER NOTIFICATIONS
 */
export const getUserNotifications = async (
  userId: string
): Promise<ServiceResult> => {
  const notifications = await Notification.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(50);

  return {
    success: true,
    notifications: notifications.map((n) => ({
      id: n._id,
      message: n.message,
      type: n.type,
      read: n.read,
      relatedId: n.relatedId,
      createdAt: n.createdAt,
    })),
  };
};

/**
 * MARK NOTIFICATION AS READ
 */
export const markAsRead = async (
  notificationId: string,
  userId: string
): Promise<ServiceResult> => {
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    return {
      success: false,
      error: 'Notification not found',
    };
  }

  // Check if notification belongs to user
  if (notification.user.toString() !== userId) {
    return {
      success: false,
      error: 'Not authorized',
    };
  }

  notification.read = true;
  await notification.save();

  return {
    success: true,
    notification: {
      id: notification._id,
      message: notification.message,
      read: notification.read,
    },
  };
};

/**
 * MARK ALL AS READ
 */
export const markAllAsRead = async (
  userId: string
): Promise<ServiceResult> => {
  await Notification.updateMany(
    { user: userId, read: false },
    { read: true }
  );

  return {
    success: true,
  };
};

/**
 * DELETE NOTIFICATION
 */
export const deleteNotification = async (
  notificationId: string,
  userId: string
): Promise<ServiceResult> => {
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    return {
      success: false,
      error: 'Notification not found',
    };
  }

  if (notification.user.toString() !== userId) {
    return {
      success: false,
      error: 'Not authorized',
    };
  }

  await Notification.findByIdAndDelete(notificationId);

  return {
    success: true,
  };
};