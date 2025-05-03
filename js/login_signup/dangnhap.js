import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
  } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
  
  import { addUser } from "./user.entity.js"; // adjust path if needed
  
  const auth = getAuth();
  
  // Xử lý đăng nhập
  document
    .getElementById("loginForm")
    ?.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
  
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userCredential);
        localStorage.setItem("currentUser", JSON.stringify(userCredential.user));
        console.log("✅ Đăng nhập thành công:", userCredential.user);
        alert("🎉 Đăng nhập thành công!");
  
        setTimeout(() => {
          window.location.href = "../index.html";
        }, 1000);
      } catch (error) {
        console.error("❌ Lỗi đăng nhập:", error);
  
        let errorMessage;
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage = "❌ Tài khoản không tồn tại!";
            break;
          case "auth/wrong-password":
            errorMessage = "❌ Sai mật khẩu, vui lòng thử lại!";
            break;
          case "auth/invalid-email":
            errorMessage = "❌ Email không hợp lệ!";
            break;
          case "auth/too-many-requests":
            errorMessage = "🚫 Bạn nhập sai quá nhiều lần, hãy thử lại sau!";
            break;
          default:
            errorMessage = "⚠️ Lỗi không xác định: " + error.message;
            break;
        }
  
        alert(errorMessage);
      }
    });
  
  // Xử lý đăng ký
  document
    .getElementById("signupForm")
    ?.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
  
      if (password !== confirmPassword) {
        alert("❌ Mật khẩu xác nhận không khớp!");
        return;
      }
  
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userCredential);
  
        // Create user in Firestore too
        const username = email.split("@")[0]; // you can customize how to get username
        await addUser(email, username);
  
        alert("🎉 Đăng ký thành công! Vui lòng đăng nhập.");
        setTimeout(() => {
          window.location.href = "login.html"; // Redirect to login page
        }, 1000);
      } catch (error) {
        console.error("❌ Lỗi đăng ký:", error);
  
        let errorMessage;
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "❌ Email đã được sử dụng!";
            break;
          case "auth/invalid-email":
            errorMessage = "❌ Email không hợp lệ!";
            break;
          case "auth/weak-password":
            errorMessage = "❌ Mật khẩu quá yếu!";
            break;
          default:
            errorMessage = "⚠️ Lỗi không xác định: " + error.message;
            break;
        }
  
        alert(errorMessage);
      }
    });
  