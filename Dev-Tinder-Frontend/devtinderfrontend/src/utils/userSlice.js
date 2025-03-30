import { createSlice } from "@reduxjs/toolkit";

// Safely parse user data from localStorage
let savedUser = null;
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined") {
    savedUser = JSON.parse(storedUser);
  } else {
    localStorage.removeItem("user"); // Remove invalid value
  }
} catch (error) {
  console.error("Error parsing user data from localStorage:", error.message);
}

const userSlice = createSlice({
  name: "user",
  initialState: savedUser || null, // Use parsed data or null as fallback
  reducers: {
    addUser: (state, action) => {
      const user = action.payload;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user)); // Save valid user to localStorage
      }
      return user;
    },
    removeUser: () => {
      localStorage.removeItem("user"); // Clear user from localStorage
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
