FROM gradle:7-jdk11 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle buildFatJar --no-daemon

FROM openjdk:11
EXPOSE 8080:8080
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/ktor-classbuddy.jar
ENTRYPOINT ["java","-jar","/app/ktor-classbuddy.jar"]
#Crear carpeta uploads
RUN mkdir /app/uploads

docker run \
 -d \
 --name newrelic-infra \
 --network=host \
 --cap-add=SYS_PTRACE \
 --privileged \
 --pid=host \
 -v "/:/host:ro" \
 -v "/var/run/docker.sock:/var/run/docker.sock" \
 -e  NRIA_LICENSE_KEY=651dce47967d638ff993fc2c69e219c2d822NRAL \
 newrelic/infrastructure:latest




