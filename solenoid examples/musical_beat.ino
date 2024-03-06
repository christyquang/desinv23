const int mos = 9;
int note = 500;
int halfNote = note/2;
int thirdNote = note/3;
int fourthNote = note/4;
int fifthNote = note/5;

void setup() {
  // put your setup code here, to run once:
  pinMode(mos, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(mos, HIGH);
  delay(note);
  digitalWrite(mos, LOW);
  delay(note);

  digitalWrite(mos, HIGH);
  delay(fifthNote);
  digitalWrite(mos, LOW);
  delay(thirdNote);

}
