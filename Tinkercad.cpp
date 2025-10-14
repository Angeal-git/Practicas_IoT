#include <Servo.h>

const int triggerPin = 8;
const int echoPin = 9;
const int ledRojo = 4;
const int ledVerde = 5;

long tiempo;
int distanciaCm;
Servo barrera;

void setup() {
  pinMode(triggerPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ledRojo, OUTPUT);
  pinMode(ledVerde, OUTPUT);
  
  barrera.attach(11);
  barrera.write(0);
  
  Serial.begin(9600);
}

void loop() {
  // Enviar pulso ultrasónico
  digitalWrite(triggerPin, LOW);
  delayMicroseconds(3);
  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(12);
  digitalWrite(triggerPin, LOW);

  // Calcular duración y distancia
  tiempo = pulseIn(echoPin, HIGH);
  distanciaCm = tiempo * 0.034 / 2;

  Serial.print("Distancia medida: ");
  Serial.print(distanciaCm);
  Serial.println(" cm");

  // Activar servomotor y LEDs
  if (distanciaCm < 25) {
    barrera.write(100);       // Mover barrera
    digitalWrite(ledVerde, HIGH);
    digitalWrite(ledRojo, LOW);
  } else {
    barrera.write(0);
    digitalWrite(ledRojo, HIGH);
    digitalWrite(ledVerde, LOW);
  }

  delay(300);
}
