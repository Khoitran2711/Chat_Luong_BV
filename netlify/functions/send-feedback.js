const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { thongtin, email, phone } = JSON.parse(event.body);

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "youremail@gmail.com",  // email của bạn
      pass: "APP_PASSWORD"          // App Password Gmail
    }
  });

  const mailOptions = {
    from: email,
    to: "youremail@gmail.com",
    subject: "Phản ánh mới từ website",
    text: `Thông tin: ${thongtin}\nEmail: ${email}\nSố điện thoại: ${phone || "Không có"}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return { statusCode: 200, body: "Email sent" };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Lỗi khi gửi email" };
  }
};
