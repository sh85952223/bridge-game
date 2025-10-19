// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwvQRAQZItqCJjKd8gHqRoxS12H7Es6mo",
  authDomain: "bridge-students-b2743.firebaseapp.com",
  projectId: "bridge-students-b2743",
  storageBucket: "bridge-students-b2743.firebasestorage.app",
  messagingSenderId: "922986276167",
  appId: "1:922986276167:web:4267d2e6466c4adafcd862"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 연결
export const db = getFirestore(app);
