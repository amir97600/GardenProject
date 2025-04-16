package projet_jardin.model;

public enum Badge {

NainDeJardin(0),
GraineDeNovice(100), 
JardinierDébutant(500), 
CultivateurAppliqué(1000), 
MainVerte(2500), 
MaîtreDuPotager(5000),
GardienDuVerger(10000), 
AlchimisteVert(20000), 
SageDuJardin(50000);

private int score;

private Badge(int score) {
this.score = score;
}

public int getScore() {
return score;
}

}