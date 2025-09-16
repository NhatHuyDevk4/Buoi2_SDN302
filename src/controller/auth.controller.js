import User from "../models/user.model.js";
import bcrypt from 'bcrypt';


export const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Phải mã hóa password trước khi lưu vào database
        const hashedPassword = await bcrypt.hash(password, 10); // 10 là số lần băm, càng cao thì càng an toàn nhưng tốn thời gian hơn
        const newUser = new User(
            {
                name: name,
                email: email,
                password: hashedPassword
            }
        );
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }

    // Logic đăng ký người dùng sẽ được xử lý ở đây
    // account, password, email, phone, address, name
}

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log("Tìm trong db", user);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}