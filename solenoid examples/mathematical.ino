const int mos = 9;
int note = 500;

void setup() {
  // put your setup code here, to run once:
  pinMode(mos, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(mos, HIGH);
  delay(random(1,5)*100);
  digitalWrite(mos, LOW);
  delay(random(1,5)*100);

}
