FROM openjdk:11-jdk
VOLUME /tmp
ARG JAR_FILE=build/libs/order-item-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} order-item-service.jar

ENTRYPOINT ["java", "-jar", "/order-item-service.jar"]