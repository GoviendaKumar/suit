// OSC
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <OSCBundle.h>                 // for receiving OSC messages
#include <OSCMessage.h>                // for sending OSC messages


// NEO
#include <Adafruit_NeoPixel.h>

//IMU
#include "I2Cdev.h"
#include "MPU6050.h"
#include "HMC5883L.h"
#include "BMP085.h"
#include "Wire.h"

//NEO Pixel
#define PIN_STRIPE_1            12 // 16 - random colors // 0 - buildin led red // 2 - buildin led blue //14 - while 15th pin on, 1st led on stripe is blinking
#define PIN_STRIPE_2            13
#define VIBRO          15
#define NUMPIXELS      10
#define TCAADDR 0x70 //multiplexer address

//WIFI
char ssid[] = "wifiwithoutinternet";                 // your network SSID (name)
char pass[] = "123connect";              // your network password

// Button Input + LED Output
const int ledPin = 14;                 // D5 pin at NodeMCU
//const int boardLed = LED_BUILTIN;      // Builtin LED


WiFiUDP Udp;                           // A UDP instance to let us send and receive packets over UDP
const IPAddress destIp(192,168,1,255);   // remote IP of the target device
const unsigned int localPort = 8000;   // local port to listen for UDP packets at the NodeMCU (another device must send OSC messages to this port)
const unsigned int destPort = 9000;    // remote port of the target device where the NodeMCU sends OSC to

unsigned int ledState = 1;             // LOW means led is *on*

// init one Pixel colors
float valueRleft[NUMPIXELS] = {0};
float valueGleft[NUMPIXELS] = {0};
float valueBleft[NUMPIXELS] = {0};

float valueRright[NUMPIXELS] = {0};
float valueGright[NUMPIXELS] = {0};
float valueBright[NUMPIXELS] = {0};

float newvalueR = 0;
boolean faderChanged = false;


//NEO pixel init
Adafruit_NeoPixel pixels1 = Adafruit_NeoPixel(NUMPIXELS, PIN_STRIPE_1, NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel pixels2 = Adafruit_NeoPixel(NUMPIXELS, PIN_STRIPE_2, NEO_GRB + NEO_KHZ800);
int delayval = 500; // delay for half a second

//VIBRO
const int vibro = VIBRO;

//IMU
static const float ACCEL_SENS = 16384.0; // Accel Sensitivity with default +/- 2g scale
static const float GYRO_SENS  = 131.0;   // Gyro Sensitivity with default +/- 250 deg/s scale

// Magnetometer class default I2C address is 0x1E
// specific I2C addresses may be passed as a parameter here
// this device only supports one I2C address (0x1E)
HMC5883L mag1;
HMC5883L mag2;
int16_t mx, my, mz;

// Accel/Gyro class default I2C address is 0x68 (can be 0x69 if AD0 is high)
// specific I2C addresses may be passed as a parameter here
MPU6050 accelgyro1;
MPU6050 accelgyro2;

int16_t ax, ay, az;
int16_t gx, gy, gz;

// Barometer class default I2C address is 0x77
// specific I2C addresses may be passed as a parameter here
// (though the BMP085 supports only one address)
//BMP085 barometer;

//float temperature;
//float pressure;
//int32_t lastMicros;

// Multiplexer I2C
void tcaselect(uint8_t i) {
  if (i > 7) return;

  Wire.beginTransmission(TCAADDR);
  Wire.write(1 << i);
  Wire.endTransmission();
}


//==============================SETUP========================
void setup() {
    Serial.begin(115200);


     // Specify a static IP address for NodeMCU
     // If you erase this line, your ESP8266 will get a dynamic IP address
    WiFi.config(IPAddress(192,168,1,123),IPAddress(192,168,1,1), IPAddress(255,255,255,0));

    // Connect to WiFi network
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.begin(ssid, pass);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    Serial.println("Starting UDP");
    Udp.begin(localPort);
    Serial.print("Local port: ");
    Serial.println(Udp.localPort());

    // LED Output
   // pinMode(boardLed, OUTPUT);
    pinMode(ledPin, OUTPUT);
   // digitalWrite(boardLed, ledState);   // turn *off* led

    //NEO pixel start
    pixels1.begin(); // This initializes the NeoPixel library.
    pixels2.begin();

    //IMU
    // join I2C bus (I2Cdev library doesn't do this automatically)
    Wire.begin();

    //VIBRO
    pinMode(vibro, OUTPUT);

    // ==================== MPU6050 ============================
    //======================1=================
    tcaselect(5);
    accelgyro1.initialize();
    Serial.print("Testing Accel/Gyro... ");
    Serial.println(accelgyro1.testConnection() ? "MPU6050 connection successful" : "MPU6050 connection failed");

    // Starts up with accel +/- 2 g and gyro +/- 250 deg/s scale
    accelgyro1.setI2CBypassEnabled(true); // set bypass mode
    //=====================2==========
    tcaselect(6);
    accelgyro2.initialize();
    Serial.print("Testing Accel/Gyro... ");
    Serial.println(accelgyro2.testConnection() ? "MPU6050 connection successful" : "MPU6050 connection failed");

    // Starts up with accel +/- 2 g and gyro +/- 250 deg/s scale
    accelgyro2.setI2CBypassEnabled(true); // set bypass mode
    // Now we can talk to the HMC5883l

    // ==================== HMC5883L ============================
    tcaselect(5);
    mag1.initialize();
    Serial.print("Testing Mag...  ");
    Serial.println(mag1.testConnection() ? "HMC5883L connection successful" : "HMC5883L connection failed");

    tcaselect(6);
    mag2.initialize();
    Serial.print("Testing Mag...  ");
    Serial.println(mag2.testConnection() ? "HMC5883L connection successful" : "HMC5883L connection failed");

    // ==================== BMP085 ============================
//    barometer.initialize();
//    Serial.print("Testing Pressure...  ");
//    Serial.println(barometer.testConnection() ? "BMP085 connection successful" : "BMP085 connection failed");

    Serial.println("Setup Complete");

}

//=================================== MAIN ============
void loop() {

  imu();
  receiveOSC();
 // sendOSC();

}


//not used, since we have separate server
//void sendOSC(){
//    //send OSC fader value
//    OSCMessage msgOut("/1/led");
//
//    if(newvalueR != valueRleft) {
//        faderChanged = true;
//        valueRleft = newvalueR;
//        Serial.println("ValueR = ");
//        Serial.println(valueRleft);
//    }
//
//    if(faderChanged == true){
//        faderChanged = false;
//        msgOut.add(valueRleft);
//
//        Udp.beginPacket(destIp, destPort);
//        msgOut.send(Udp);
//        Udp.endPacket();
//        msgOut.empty();
//       // Serial.println("LED updated");
//    }
//
//    delay(5);
//}
