#include "SD.h"
#define SD_ChipSelectPin 4
#include "TMRpcm.h"
#include "SPI.h"

TMRpcm tmrpcm;

const int trigPin = 6;
const int echoPin = 7;
const int numberOfFiles = 12; // Number of .wav files in your SD card
String fileNames[numberOfFiles] = {"7pm.wav", "f1.wav", "f2.wav", "f3.wav", "f4.wav", "f5.wav", "f6.wav", "f7.wav", "f8.wav", "f9.wav", "f10.wav", "fvar.wav"}; // List of file names
int fileIndex = 0;

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
  tmrpcm.play("7pm.wav"); // Play audio file when the setup is complete
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
    // Generate a random file index
    fileIndex = random(0, numberOfFiles);

    // Play the randomly selected file
    tmrpcm.play(fileNames[fileIndex].c_str());
    delay(5000); // Adjust the delay as needed to match the duration of your audio clip
  }
}
