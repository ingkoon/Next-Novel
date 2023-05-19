FROM openjdk:11-jdk
VOLUME /tmp
ARG JAR_FILE=build/libs/point-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} point-service.jar

ENTRYPOINT ["java", "-jar", "/point-service.jar"]