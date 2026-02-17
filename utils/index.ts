export const COLUMNS = [
  { id: "treatment", label: "Behandelingkamer1" },
  { id: "management", label: "Management" },
  { id: "leave", label: "Bijzonderheden-Verlof-Cursus..." },
  { id: "financial", label: "Financials" },
];

export const TIME_SLOTS = Array.from({ length: 27 }, (_, i) => {
  const hour = Math.floor(i / 2) + 8;
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${minute}`;
});