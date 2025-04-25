import { getCurrentDisasters } from '../../shared/data/DisasterManagement';
import { fire, cyclone, flood, tornado, earthquake, tsunami } from '../../assets/Assests';

export const storeLocally = (key, data) => {
    const currentData = JSON.parse(localStorage.getItem(key)) || [];
    const newData = [...currentData, data];
    localStorage.setItem(key, JSON.stringify(newData));
}

export const getFromLocal = (key = 'joinedDisasters') => {
    return JSON.parse(localStorage.getItem(key)) || [];
}

export const disasterImages = {
    flood: flood,
    cyclone: cyclone,
    tsunami: tsunami,
    fire: fire,
    tornado: tornado,
    earthquake: earthquake,
}

export const getRegisteredDisaster = async () => {
    const registeredId = getFromLocal();
    const activeDisaster = await getCurrentDisasters();
    const registeredDisaster = activeDisaster.data.filter((disaster) => {
        return registeredId.includes(disaster.disaster_id);
    });
    return registeredDisaster.map((disaster) => {
        return {
            disaster_id: disaster.disaster_id,
            title: disaster.title,
            description: disaster.description,
            location: disaster.location,
            startDate: disaster.startDate,
            status: disaster.status,
            type: disaster.type,
            image: eval(disaster.type.toLowerCase()),
        };
    });
}