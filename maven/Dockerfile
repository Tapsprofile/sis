# Use a known, stable Maven image with OpenJDK 17
FROM maven:3.8.7-openjdk-17

# Optional: Set the working directory
WORKDIR /app

# Copy your Maven project files into the container
COPY . /app

# Run Maven package (or any other Maven command you need)
RUN mvn clean package

# Optional: Set the entrypoint for your application
# CMD ["java", "-jar", "target/your-application.jar"]
