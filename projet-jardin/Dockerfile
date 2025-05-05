FROM maven:3.9.9-amazoncorretto-21-debian-bookworm AS build

WORKDIR /app

# Copier le fichier pom.xml
COPY pom.xml .

# Télécharger les dépendances MAVEN
RUN mvn dependency:go-offline -B

COPY ./src/ ./src/

RUN mvn clean package -DskipTests


FROM openjdk:25-jdk-bullseye

ENV ENV_DB_URL=mysql://4.233.149.159:3314/projet_jardin
ENV ENV_DB_USER=root
ENV ENV_DB_PASSWORD=Not24Get!

WORKDIR /app

COPY --from=build /app/target/*.jar ./projet-jardin.jar

ENTRYPOINT [ "java", "-jar", "projet-jardin.jar" ]

EXPOSE 8080