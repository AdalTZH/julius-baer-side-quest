# Use a lightweight JRE base image
FROM eclipse-temurin:17-jre

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from your local build directory to the container
# (replace myapp.jar with your actual JAR file name)
COPY server/core-banking-api.jar app.jar

# Expose the port your app runs on (optional)
EXPOSE 8123

# Command to run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]