import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // Lấy token từ header
    // console.log('Auth Header:', authHeader);
    const token = authHeader && authHeader.split(' ')[1]; // cắt chuỗi thành 2 phần, đầu là Bearer, sau là token
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        // So sánh token gửi lên với token đã ký khi đăng nhập
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Đây là paylload được attach vào token khi đăng nhập 
        // attach là gắn thêm thông tin vào token
        // payload có thể là id, email, role, ...
        // tùy vào mục đích của ứng dụng mà ta có thể attach các thông tin khác nhau
        // nhưng không nên attach các thông tin nhạy cảm như password, thẻ tín dụng, ...
        req.user = user; // Lưu thông tin user vào request để dùng ở các middleware hoặc controller tiếp theo
        next();
    })
}