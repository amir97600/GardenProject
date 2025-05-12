export enum Badge {
    GraineDeNovice = 0,
    JardinierDebutant = 100,
    MainVerte = 300, 
    MaitreDuPotager = 600,
    CultivateurApplique = 1000,
    GardienDuVerger = 1500,
    AlchimisteVert= 2000,
    SageDuJardin = 3000
}

//Mapping nom des badges 
export const BadgeLabels: { [key in Badge]: string } = {
  [Badge.GraineDeNovice]: "Graine de Novice",
  [Badge.JardinierDebutant]: "Jardinier Débutant",
  [Badge.MainVerte]: "Main Verte",
  [Badge.MaitreDuPotager]: "Maître du potager",
  [Badge.CultivateurApplique]: "Cultivateur appliqué",
  [Badge.GardienDuVerger]: "Gardien du verger",
  [Badge.AlchimisteVert]: "Alchimiste vert",
  [Badge.SageDuJardin]: "Sage du jardin"
}

//Mapping avec les descriptions des badges pour modal de déblocage 
export const BadgeDescriptions: { [key in Badge]: string  } = {
    [Badge.GraineDeNovice]: "Bienvenue dans l’aventure ! Chaque grande plante commence par une petite graine",
    [Badge.JardinierDebutant]:"Tu commences à connaître les besoins de tes plantes. Soleil, eau, amour… ça pousse !",
    [Badge.MainVerte]:"Tes plantes s’épanouissent, et ton toucher devient magique. Bravo, ça se voit que tu y mets du cœur.",
    [Badge.MaitreDuPotager]: "Tomates, courgettes, herbes… Tu transformes ton coin vert en corne d’abondance.",
    [Badge.CultivateurApplique]:  "Rigueur, patience, passion. Tu cultives bien plus que des plantes.",
    [Badge.GardienDuVerger]: "Un véritable refuge naturel pousse sous tes soins. Les arbres te remercient." ,
    [Badge.AlchimisteVert]: "Compost, remèdes naturels, compagnonnage… Tu transformes la terre avec sagesse." ,
    [Badge.SageDuJardin]: "Tu es devenu·e un guide, une inspiration. Ton jardin est une philosophie." 
};
