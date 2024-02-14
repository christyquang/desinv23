float hue = 0.66; // Start with blue color
float saturation = 1.0;
float value = 1.0;

// Define the delay time
const int delayTime = 125; // You can adjust this value as needed

// Pins for RGB LED
const int redLEDPin = 13;
const int greenLEDPin = 12;
const int blueLEDPin = 11;

// Pins for state change detection
const int buttonPin = 2;    // the pin that the pushbutton is attached to

int leds[] = {5, 6, 7, 8, 9};
int total_leds = 5;

// Variables will change:
int buttonState = 0;         // current state of the button
int lastButtonState = 0;     // previous state of the button
unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 50;    // the debounce time; increase if the output flickers
bool ledsOn = false;  // state of the LEDs
int buttonClickCounter = 0; // count of button clicks

void setup() {
  // Set the pins as outputs
  pinMode(redLEDPin, OUTPUT);
  pinMode(greenLEDPin, OUTPUT);
  pinMode(blueLEDPin, OUTPUT);
  
  // initialize the button pin as an input:
  pinMode(buttonPin, INPUT_PULLUP);
  
  for (int i = 0; i < total_leds; i++) {
    pinMode(leds[i], OUTPUT);
  }
  // initialize serial communication:
  Serial.begin(9600);
}

void loop() {
  // Convert HSV to RGB
  int r, g, b;
  hsvToRgb(hue, saturation, value, r, g, b);

  // Write RGB values to LED
  analogWrite(redLEDPin, r);
  analogWrite(greenLEDPin, g);
  analogWrite(blueLEDPin, b);

  // Increment the hue for the next iteration
  hue += 0.001; // Smaller increment for smoother transition
  if (hue > 1.0) {
    hue -= 1.0; // Keep hue value in the range [0,1)
  }

  // Delay for smooth transition
  delay(25); // Decreased delay for smoother transition

  // read the pushbutton input pin:
  int reading = digitalRead(buttonPin);

  // If the reading is different from the last state, reset the debounce timer
  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }

  // If the button state has been stable for longer than the debounce delay
  if ((millis() - lastDebounceTime) > debounceDelay) {
    // If the button state is different from the last state
    if (reading != buttonState) {
      buttonState = reading;

      // If the button state is HIGH (pressed) and the last state was LOW (unpressed)
      if (buttonState == LOW) {
        // Increment the button click counter
        buttonClickCounter++;

        // Handle different effects based on the number of button clicks
        switch (buttonClickCounter % 7) {
          case 0: // Turn off all LEDs
            ledsOff();
            AllOff();
            break;
          case 1: // Toggle LEDs on/off
            ledsOn = !ledsOn;
            if (ledsOn) {
              ledsON();
            } else {
              ledsOff();
              AllOff();
            }
            break;
          case 2: // Display trail effect going up and down
            displayUpDownTrail();
            break;
          case 3: // Display odd lights
            odd_lights();
            break;
          case 4:
            even_lights();
            break;
          case 5:
            warriors();
            break;
          case 6:
            displayUpDownTrailLoop();
            break;
        }
      }
    }
  }

  // Save the current state as the last state, for the next iteration
  lastButtonState = reading;
}

// TURN ON ALL LEDs
void ledsON() {
  for (int i = 0; i < total_leds; i++) {
    digitalWrite(leds[i], HIGH);
  }
}

// TURN OFF ALL LEDs
void ledsOff() {
  for (int i = 0; i < total_leds; i++) {
    digitalWrite(leds[i], LOW);
  }
}

void AllOff() {
  analogWrite(redLEDPin, 0);
  analogWrite(greenLEDPin, 0);
  analogWrite(blueLEDPin, 0);
}

// Display trail effect going up and down
void displayUpDownTrail() {
  // Display trail effect going up
  for (int i = 0; i < total_leds; i++) {
    digitalWrite(leds[i], HIGH);
    delay(delayTime);
  }
  // Display trail effect going down
  for (int i = total_leds - 1; i >= 0; i--) {
    digitalWrite(leds[i], LOW);
    delay(delayTime);
  }
  // Reverse the effect by turning on LEDs in the opposite order
  for (int i = total_leds - 1; i >= 0; i--) {
    digitalWrite(leds[i], HIGH);
    delay(delayTime);
  }
  // Turn off all LEDs
  for (int i = 0; i < total_leds; i++) {
    digitalWrite(leds[i], LOW);
    delay(delayTime);
  }
}

void odd_lights() {
  const int t2 = 150; 
  for(int i = 0; i <= total_leds; i++){
    digitalWrite(leds[i], HIGH);
    delay(t2);
    i=i+1;
  }
  for(int i = 0; i <= total_leds; i++){
    digitalWrite(leds[i], LOW);
    delay(t2);
  }

  for(int j = total_leds +1; j >= 0; j--){
    digitalWrite(leds[j], HIGH);
    delay(t2);
    j=j-1;
  }
  for(int j = total_leds; j >= 0; j--){
    digitalWrite(leds[j], LOW);
    delay(t2);
  }
}

void even_lights() {
  const int t2 = 175; 
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], HIGH);
    delay(t2);
  }
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], LOW);
    delay(t2);
  }

  for(int j = total_leds - 2; j >= 0; j -= 2){
    digitalWrite(leds[j], HIGH);
    delay(t2);
  }
  for(int j = total_leds - 2; j >= 0; j -= 2){
    digitalWrite(leds[j], LOW);
    delay(t2);
  }
}

void warriors() {
  const int t = 225; 
  // Let's go Warriors!
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], HIGH);
    delay(t);
  }
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], LOW);
    delay(t);
  }
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], HIGH);
    delay(t);
  }
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], LOW);
    delay(t);
  }

  // bum bum bum bum bum
  const int beat = 130;
  
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], HIGH);
    digitalWrite(leds[i+2], HIGH);
    delay(t);
  }
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], LOW);
    digitalWrite(leds[i+2], LOW);
    delay(t);
  }
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], HIGH);
    digitalWrite(leds[i+2], HIGH);
    delay(t);
  }
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], LOW);
    digitalWrite(leds[i+2], LOW);
    delay(t);
  }
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], HIGH);
    digitalWrite(leds[i+2], HIGH);
    delay(beat);
  }
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], LOW);
    digitalWrite(leds[i+2], LOW);
    delay(beat);
  }
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], HIGH);
    digitalWrite(leds[i+2], HIGH);
    delay(beat);
  }
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], LOW);
    digitalWrite(leds[i+2], LOW);
    delay(beat);
  }
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], HIGH);
    digitalWrite(leds[i+2], HIGH);
    delay(beat);
  }
  for(int i = 1; i < total_leds; i += 2){
    digitalWrite(leds[i], LOW);
    digitalWrite(leds[i+2], LOW);
    delay(beat);
  }
}

// Display trail effect going up and down
void displayUpDownTrailLoop() {
  for (int i = 0; i < total_leds; i++) {
      digitalWrite(leds[i], HIGH);
      delay(delayTime);
    }
    // Display trail effect going down
    for (int i = total_leds - 1; i >= 0; i--) {
      digitalWrite(leds[i], LOW);
      delay(delayTime);
    }
    for (int i = 0; i < total_leds; i++) {
      digitalWrite(leds[i], HIGH);
      delay(delayTime);
    }
    // Display trail effect going down
    for (int i = total_leds - 1; i >= 0; i--) {
      digitalWrite(leds[i], LOW);
      delay(delayTime);
    }for (int i = 0; i < total_leds; i++) {
      digitalWrite(leds[i], HIGH);
      delay(delayTime);
    }
    // Display trail effect going down
    for (int i = total_leds - 1; i >= 0; i--) {
      digitalWrite(leds[i], LOW);
      delay(delayTime);
    }for (int i = 0; i < total_leds; i++) {
      digitalWrite(leds[i], HIGH);
      delay(delayTime);
    }
    // Display trail effect going down
    for (int i = total_leds - 1; i >= 0; i--) {
      digitalWrite(leds[i], LOW);
      delay(delayTime);
    }
}


// Convert HSV to RGB
void hsvToRgb(float h, float s, float v, int& r, int& g, int& b) {
  int i = floor(h * 6);
  float f = h * 6 - i;
  float p = v * (1 - s);
  float q = v * (1 - f * s);
  float t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v * 255, g = t * 255, b = p * 255; break; // Red
    case 1: r = v * 255, g = q * 255, b = p * 255; break; // Yellow
    case 2: r = p * 255, g = v * 255, b = t * 255; break; // Green
    case 3: r = p * 255, g = v * 255, b = q * 255; break; // Cyan
    case 4: r = t * 255, g = p * 255, b = v * 255; break; // Blue
    case 5: r = v * 255, g = p * 255, b = q * 255; break; // Magenta
  }
}
