interface Station {
  Id_station: string;
  Ville: string;
}

const stations: Station[] = [
  { Id_station: "01014002", Ville: "ARBENT" },
  { Id_station: "01027003", Ville: "BALAN_AERO" },
  { Id_station: "01034004", Ville: "BELLEY" },
  { Id_station: "01064001", Ville: "VERIZIEU" }
];

function findByVille(ville: string): string | null {
  const station = stations.find(s => s.Ville.toLowerCase() === ville.toLowerCase());
  return station ? station.Id_station : null;
}

// Test de la fonction
console.log(findByVille("BELLEY")); // Devrait afficher "01034004"
console.log(findByVille("VERIZIEU")); // Devrait afficher "01064001"
console.log(findByVille("VILLE_INCONNUE")); // Devrait afficher `null`
