const createDisaster = async (disaster) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("Token not found");
        return {
            success: false,
            message: "Authorization failed. Please login again.",
        };
    }
    const response = await fetch(`http://localhost:3000/coordinators/disasters`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(disaster),
    });
    const data = await response.json();
    if(response.status === 201 || response.status === 200) {
        return {
            success: true,
            message: "Disaster created successfully",
            data: data,
        }
    } else {
        return {
            success: false,
            message: data.message || "An error occurred while creating disaster. Please try again later.",
        }
    }
}
export { createDisaster };