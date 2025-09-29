import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { databaseConnection } from './src/config/database.js'
import authRouter from './src/routes/auth-routes.routes.js'
import profileRouter from './src/routes/profile.routes.js';
import productRouter from './src/routes/product.routes.js';
const app = express()

dotenv.config();
// Gọi connect database
databaseConnection();
app.use(cookieParser())
app.use(express.json()) // middleware: hàm chạy giữa, xử lý dữ liệu gửi lên server
app.use(bodyParser.urlencoded({ extended: true })); // xử lý dữ liệu từ form gửi lên

app.use('/api/auth', authRouter) // Mục đính phục cho riêng authentication
app.use('/api/profile', profileRouter) // Mục đính phục cho riêng profile
app.use('/api/products', productRouter)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})




// mongodb+srv://lenhathuy9a6_db_user:nhathuy123@cluster0.uurb90m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// ctrl + / : comment code
// MongoDB: NoSQL database
// mongoose: thư viện giúp kết nối và thao tác với MongoDB dễ dàng hơn


// MVC pattern: Model - View - Controller
// Model: định nghĩa cấu trúc dữ liệu, tương tác với database
// View: giao diện người dùng, hiển thị dữ liệu
// Controller: xử lý logic ứng dụng, nhận yêu cầu từ client, tương tác với model và trả về view