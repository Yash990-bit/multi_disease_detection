/**
 * Utility to save prediction results to LocalStorage for a "database-less" history.
 */
export const saveToLocalHistory = (diseaseType, inputData, result) => {
    try {
        const history = JSON.parse(localStorage.getItem('medical_history') || '[]');
        const newEntry = {
            id: Date.now().toString(),
            disease_type: diseaseType,
            input_data: inputData,
            result: result,
            timestamp: new Date().toISOString()
        };
        
        // Keep only latest 100 entries
        const updatedHistory = [newEntry, ...history].slice(0, 100);
        localStorage.setItem('medical_history', JSON.stringify(updatedHistory));
        return true;
    } catch (e) {
        console.error("Failed to save to local history", e);
        return false;
    }
};

export const getLocalHistory = () => {
    try {
        return JSON.parse(localStorage.getItem('medical_history') || '[]');
    } catch (e) {
        return [];
    }
};

export const deleteLocalHistoryItem = (id) => {
    try {
        const history = JSON.parse(localStorage.getItem('medical_history') || '[]');
        const updatedHistory = history.filter(item => item.id !== id);
        localStorage.setItem('medical_history', JSON.stringify(updatedHistory));
        return true;
    } catch (e) {
        return false;
    }
};
