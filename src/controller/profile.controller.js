


export const getInfoDetail = (req, res) => {
    // Logic đăng ký người dùng sẽ được xử lý ở đây
    // account, password, email, phone, address, name
    res.send('thông tin chi tiết profile');
}

export const CreateProfile = (req, res) => {
    res.send("tạo mới profile");
}