import { CheckRole } from "../../authentication/service/CheckRole";

const createDisaster = async (disaster) => {
    const token = localStorage.getItem("token");
    
    const roleCheck = CheckRole("coordinator");
    if(!roleCheck.result) {
        return {
            success: false,
            message: roleCheck.message,
        }
    }

    const response = await fetch(`http://localhost:3000/coordinators/disasters`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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

export const effectedLocation = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/locations`, {  // dummy
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if(response.status === 200 || response.status === 201) {
        return {
            success: true,
            data: data,
        }
    } else {
        return {
            success: false,
            message: data.message || "An error occurred while fetching locations. Please try again later.",
        }
    }
}

export const responsibility = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/responsibilities`, { //dummy
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if(response.status === 200 || response.status === 201) {
        return {
            success: true,
            data: response.data,
            message: response.message,
        }
    } else {
        return {
            success: false,
            message: response.message || "An error occurred while fetching responsibilities. Please try again later.",
        }
    }
}