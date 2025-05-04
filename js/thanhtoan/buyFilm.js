import { addTicketHistory } from "../history/history.entity.js";

let selectedMovie = "";
let selectedTime = "";

const movieOptions = document.getElementById("movieOptions").children;
const timeOptions = document.getElementById("timeOptions").children;

// Movie selection
for (let movie of movieOptions) {
  movie.addEventListener("click", function () {
    for (let m of movieOptions) m.classList.remove("active");
    this.classList.add("active");
    selectedMovie = this.getAttribute("data-name");
  });
}

// Time selection
for (let time of timeOptions) {
  time.addEventListener("click", function () {
    for (let t of timeOptions) t.classList.remove("active");
    this.classList.add("active");
    selectedTime = this.getAttribute("data-time");
  });
}

// Handle payment + save to Firestore
async function submitPayment() {
  const cardCode = document.getElementById("cardCode").value.trim();
  const result = document.getElementById("result");

  if (!selectedMovie) {
    alert("Vui lòng chọn phim!");
    return;
  }
  if (!selectedTime) {
    alert("Vui lòng chọn giờ chiếu!");
    return;
  }
  if (!cardCode) {
    alert("Vui lòng nhập mã thẻ!");
    return;
  }

  const [startTime, endTime] = selectedTime.split("-");
  const room = "125"; // Fixed room number for now
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userInfoDiv = document.getElementById("user-info");

  if (!currentUser.email) {
    alert("Không tìm thấy email người dùng. Vui lòng đăng nhập lại.");
    return;
  }

  try {
    await addTicketHistory(
      currentUser.email,
      selectedMovie,
      startTime,
      endTime,
      room,
      cardCode
    );
    console.log("Ticket saved to Firestore.");
  } catch (error) {
    console.error("Failed to save ticket:", error);
    alert("Có lỗi khi lưu thông tin vé.");
    return;
  }

  result.innerHTML = `
   Đặt vé thành công! <br>
    Phim: <strong>${selectedMovie}</strong> <br>
    Giờ chiếu phim: <strong>${selectedTime}</strong> <br>
    Mã phim: <strong>${cardCode}</strong> <br>
    Chúc bạn xem phim vui vẻ!
  `;
}

// Hook submit button
document
  .getElementById("submitButton")
  .addEventListener("click", submitPayment);

// Back button navigation
document.getElementById("back-button").addEventListener("click", function () {
  window.location.href = "../index.html";
});
