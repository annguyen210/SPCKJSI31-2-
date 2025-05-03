import { firestore } from "../firebase.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  addDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js";

// Constructor for ticket history (with created_by)
export function TicketHistory(email, movieTitle, timeSlot, room, ticketCode) {
  this.created_by = email; // Explicitly tracked
  this.movieTitle = movieTitle;
  this.timeSlot = timeSlot;
  this.room = room;
  this.ticketCode = ticketCode;
  this.createdAt = new Date().toISOString(); // Timestamp
  return {...this};
}

// Add a new ticket purchase record
export async function addTicketHistory(
  email,
  movieTitle,
  startTime,
  endTime,
  room,
  ticketCode
) {
  const historyRef = collection(firestore, "ticket_history");
  const timeSlot = `${startTime}-${endTime}`;
  const historyData = new TicketHistory(
    email,
    movieTitle,
    timeSlot,
    room,
    ticketCode
  );

  try {
    await addDoc(historyRef, historyData);
    console.log("Ticket history added:", historyData);
  } catch (error) {
    console.error("Error adding ticket history: ", error);
  }
}

// Get ticket history by user email
export async function getTicketHistoryByEmail(email) {
  const q = query(
    collection(firestore, "ticket_history"),
    where("created_by", "==", email)
  );
  const querySnapshot = await getDocs(q);

  const historyList = [];
  querySnapshot.forEach((docSnap) => {
    historyList.push({ id: docSnap.id, ...docSnap.data() });
  });

  return historyList;
}

export async function getAllTicketHistory() {
  const colRef = collection(firestore, "ticket_history");
  const snapshot = await getDocs(colRef);

  const historyList = [];
  snapshot.forEach((docSnap) => {
    historyList.push({ id: docSnap.id, ...docSnap.data() });
  });

  console.log(historyList)
}

getAllTicketHistory()