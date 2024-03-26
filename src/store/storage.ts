export function loadState<T>(key: string): T | undefined {
  try {
    const jsonState = localStorage.getItem(key);
    if (!jsonState) return undefined;
    return JSON.parse(jsonState) as T;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export function saveState<T>(state: T, key: string) {
  const strState = JSON.stringify(state);
  localStorage.setItem(key, strState);
}
