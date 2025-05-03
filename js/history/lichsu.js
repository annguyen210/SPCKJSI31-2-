import { getTicketHistoryByEmail } from "./history.entity.js";
// Call this with the email you want to search
async function loadHistoryForUser() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const historyList = await getTicketHistoryByEmail(currentUser.email);
  const tableBody = document.getElementById("history-table");

  // Clear existing rows
  tableBody.innerHTML = "";

  historyList.forEach((ticket) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${ticket.movieTitle}</td>
      <td>${ticket.timeSlot}</td>
      <td>${ticket.ticketCode}</td>
      <td class="status-paid">Đã đặt vé ✅</td>
    `;

    tableBody.appendChild(row);
  });
}

// Example usage:
loadHistoryForUser();

// -----------------------------------------
document.getElementById("back-button").addEventListener("click", function () {
  // Chuyển hướng về trang index
  window.location.href = "../index.html";
});