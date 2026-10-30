import { createContext, useContext, useEffect, useRef, useState } from "react";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "campus-connect-favorites";

function readFavorites() {
  try {
    const storedFavorites = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(storedFavorites) ? storedFavorites.map(String) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(readFavorites);
  const favoriteIdsRef = useRef(favoriteIds);
  const favoriteCountRef = useRef(favoriteIds.length);
  const [favoriteCount, setFavoriteCount] = useState(favoriteCountRef.current);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  function toggleFavorite(id) {
    const normalizedId = String(id);
    const current = favoriteIdsRef.current;
    const next = current.includes(normalizedId)
      ? current.filter((favoriteId) => favoriteId !== normalizedId)
      : [...current, normalizedId];
    favoriteIdsRef.current = next;
    favoriteCountRef.current = next.length;
    setFavoriteIds(next);
    setFavoriteCount(favoriteCountRef.current);
  }

  function removeFavorite(id) {
    const normalizedId = String(id);
    const next = favoriteIdsRef.current.filter((favoriteId) => favoriteId !== normalizedId);
    favoriteIdsRef.current = next;
    favoriteCountRef.current = next.length;
    setFavoriteIds(next);
    setFavoriteCount(favoriteCountRef.current);
  }

  return (
    <FavoritesContext.Provider value={{ favoriteIds, favoriteCount, toggleFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
}
