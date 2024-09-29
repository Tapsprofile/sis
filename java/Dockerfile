# Use a base image with Debian or Ubuntu
FROM ubuntu:latest

# Install OpenJDK 17
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    apt-get clean;

# Set JAVA_HOME environment variable
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Verify the installation
RUN java -version

# Optional: Set the working directory
WORKDIR /app

# Optional: Copy your application code
# COPY . /app

# Optional: Set the entrypoint
# CMD ["java", "-jar", "your-application.jar"]
