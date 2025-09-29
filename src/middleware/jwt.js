import jwt from "jsonwebtoken";

export const generateAccessToken = (user, role) => jwt.sign({ userId: user._id, role: role }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });
export const generateRefreshToken = (user) => jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY_REFRESH, { expiresIn: '7d' }); //7d ==> 7 days
// refresh token có thời gian sống lâu hơn

// THời gian sống của token có thể tùy chỉnh theo yêu cầu của ứng dụng
// Thường thì access token sẽ có thời gian sống ngắn hơn refresh token
// Access token: dùng để xác thực người dùng khi họ gửi yêu cầu đến server
// Refresh token: dùng để lấy access token mới khi access token hết hạn mà không cần phải đăng nhập lại