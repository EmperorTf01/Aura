import { useState, useEffect, useCallback } from 'react';
import type { Blueprint } from '@/types/project';

const STORAGE_KEY = 'aura_blueprint_history';
const MAX_BLUEPRINTS = 5;

export interface BlueprintHistoryItem {
  id: string;
  title: string;
  projectType: Blueprint['projectType'];
  createdAt: string;
  blueprint: Blueprint;
}

export function useBlueprintHistory() {
  const [history, setHistory] = useState<BlueprintHistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse blueprint history:', e);
      }
    }
  }, []);

  const saveBlueprint = useCallback((blueprint: Blueprint) => {
    const newItem: BlueprintHistoryItem = {
      id: blueprint.id,
      title: blueprint.title,
      projectType: blueprint.projectType,
      createdAt: new Date().toISOString(),
      blueprint,
    };

    setHistory((prev) => {
      // Remove duplicate if exists
      const filtered = prev.filter((item) => item.id !== blueprint.id);
      // Add new item at the beginning and limit to MAX_BLUEPRINTS
      const updated = [newItem, ...filtered].slice(0, MAX_BLUEPRINTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeBlueprint = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }, []);

  return {
    history,
    saveBlueprint,
    removeBlueprint,
    clearHistory,
  };
}
