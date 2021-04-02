export const getPrice = (price: number): string => (price / 100).toFixed(2);

export const GWO_LOCAL_STORAGE = "GWO_LOCAL_STORAGE";

export const setLocalStorage = (state: unknown): void => {
  localStorage.setItem(GWO_LOCAL_STORAGE, JSON.stringify(state));
};

export const getLocalStorage = (): string =>
  JSON.parse(localStorage.getItem(GWO_LOCAL_STORAGE) ?? "");
