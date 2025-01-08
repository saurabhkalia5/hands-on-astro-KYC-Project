export const postUserData = async (userData: any) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (response.redirected) {
        window.location.assign(response.url);
        return { success: true };
      } else if (response.status === 400) {
        return { success: false, message: "Invalid Field Values" };
      } else {
        return { success: false, message: "Something went wrong. Please try again later." };
      }
    } catch (error) {
      console.error("Error during API call:", error);
      return { success: false, message: "Something went wrong. Please try again later." };
    }
  };
  