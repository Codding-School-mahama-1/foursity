import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Remove from localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
}

// Hook for managing user preferences
export function useUserPreferences() {
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    language: 'en',
    theme: 'light',
    notifications: true,
    emergencyAlerts: true
  });

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return [preferences, updatePreference];
}

// Hook for managing recent searches or history
export function useSearchHistory(maxItems = 10) {
  const [history, setHistory] = useLocalStorage('searchHistory', []);

  const addToHistory = (searchTerm) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item !== searchTerm);
      const newHistory = [searchTerm, ...filtered].slice(0, maxItems);
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeFromHistory = (searchTerm) => {
    setHistory(prev => prev.filter(item => item !== searchTerm));
  };

  return [history, addToHistory, clearHistory, removeFromHistory];
}

// Hook for managing form drafts
export function useFormDraft(formId) {
  const [draft, setDraft, removeDraft] = useLocalStorage(`formDraft_${formId}`, {});

  const saveDraft = (formData) => {
    setDraft({
      ...formData,
      lastSaved: new Date().toISOString()
    });
  };

  const loadDraft = () => {
    return draft;
  };

  const clearDraft = () => {
    removeDraft();
  };

  return [draft, saveDraft, clearDraft];
}