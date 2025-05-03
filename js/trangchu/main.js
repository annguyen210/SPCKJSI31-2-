// kiem tra neu chua co nguoi dung thi chuyen huong ve trang login.html
document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userInfoDiv = document.getElementById("user-info");

  if (currentUser) {
    userInfoDiv.innerHTML = `  
        <p>Chào mừng: <strong>${currentUser.email}</strong></p>  
    `;
  } else {
    userInfoDiv.innerHTML = "<p>Vui lòng đăng nhập để truy cập trang này.</p>";
    window.location.href = "  ./html/login.html"; // Nếu không đăng nhập, chuyển hướng về trang đăng nhập
  }

  document
    .getElementById("logout-button")
    .addEventListener("click", function () {
      // Xóa thông tin người dùng
      localStorage.removeItem("currentUser");
      // Chuyển hướng về trang đăng ký
      window.location.href = "./html/signup.html";
    });
});
