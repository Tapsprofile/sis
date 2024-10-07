# Use an official Maven image to build the application
FROM maven:3.9.9-eclipse-temurin-17-alpine AS build

# Set the Working Directory inside the container
WORKDIR /app

#Copy the pom.xml file to resolve dependencies
COPY pom.xml .

# Download the dependencies and store them in local repository
RUN mvn dependency:go-offline

# Copy the rest of the application source code 
COPY src ./src

# Build the application using Maven
RUN mvn clean package -DskipTests=true

# Use an official OpenJDK runtime as the base image
FROM openjdk:17

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from the previous build stage to this image
COPY --from=build /app/target/student-profile-*.jar app.jar

# Expose the port that the application will run on
EXPOSE 8081

# Set the default command to run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]