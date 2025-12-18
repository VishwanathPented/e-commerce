#!/bin/bash
export JAVA_HOME="/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home"
export PATH="$JAVA_HOME/bin:$PATH"

echo "Starting Backend with Java 17..."
java -jar target/backend-0.0.1-SNAPSHOT.jar
