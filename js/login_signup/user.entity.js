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
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js";

// User constructor
export default function User(email, username) {
  this.email = email;
  this.username = username;
  return this;
}

// Local cache
let users = [];

// Lấy danh sách người dùng
export async function getUserList() {
  const usersRef = collection(firestore, "users");
  const querySnapshot = await getDocs(usersRef);
  users = []; // clear previous cache
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const userObject = new User(data.email, data.username);
    users.push(userObject);
  });
  console.log(users);
}

// Thêm người dùng mới
export async function addUser(email, username) {
  const usersRef = collection(firestore, "users");
  const userData = new User(email, username);
  try {
    await addDoc(usersRef, userData);
    console.log(`User ${email} created.`);
  } catch (error) {
    console.error("Error adding user: ", error);
  }
}

// Lấy user theo email (và trả cả docId để update)
export async function getUserByEmail(email) {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log("No such user!");
    return null;
  }
}