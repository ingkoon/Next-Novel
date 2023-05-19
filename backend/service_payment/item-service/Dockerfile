FROM openjdk:11-jdk
VOLUME /tmp
ARG JAR_FILE=build/libs/item-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} item-service.jar

ENTRYPOINT ["java", "-jar", "/item-service.jar"]