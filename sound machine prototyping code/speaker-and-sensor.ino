#include "SD.h"
#define SD_ChipSelectPin 4
#include "TMRpcm.h"
#include "SPI.h"

TMRpcm tmrpcm;

const int trigPin = 3;
const int echoPin = 2;

float duration, distance;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);

  tmrpcm.speakerPin = 9;
  if (!SD.begin(SD_ChipSelectPin)) {
    Serial.println("SD fail");
    return;
  }

  tmrpcm.setVolume(5);
  tmrpcm.play("fvar.wav"); // Play audio file when the setup is complete
}

void loop() {
  // Ultrasonic sensor code
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = (duration * 0.0343) / 2;
  Serial.print("Distance: ");
  Serial.println(distance);
  delay(100);

  // Play audio when distance is less than a certain value
  if (distance < 50) {  
    tmrpcm.play("fvar.wav");
    delay(5000); // Adjust the delay as needed to match the duration of your audio clip
  }
}
