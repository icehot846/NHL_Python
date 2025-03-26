const BASE_URL = "https://nhlstats-backend.onrender.com/api";

export const fetchTeams = async () => {
    try {
        const response = await fetch(`${BASE_URL}/teams`);
        if (!response.ok) {
            throw new Error("Failed to fetch teams");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching teams:", error);
        return [];
    }
};

export const fetchTeamDetails = async (teamAbbr) => {
    try {
        const response = await fetch(`${BASE_URL}/teams/${teamAbbr}`);
        if (!response.ok) {
            throw new Error("Failed to fetch team details");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching team details:", error);
        return null;
    }
};
