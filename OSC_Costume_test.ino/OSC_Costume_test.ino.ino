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
float valueR = 0;
float valueG = 0;
float valueB = 0;

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

void imu(){
  static unsigned long ms = 0;
 
  // Serial Output Format
  // === Accel === | === Gyro === | ======= Mag ======= | === Barometer === |
  //   X   Y   Z   |  X   Y   Z   |  X   Y   Z  Heading |  Temp   Pressure  |

  if (millis() - ms > 100)
  {
    // read raw accel/gyro measurements
    //------------------1-------
    tcaselect(5);
    accelgyro1.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);

    // display tab-separated accel/gyro x/y/z values
    Serial.print(ax/ACCEL_SENS); Serial.print("\t");
    Serial.print(ay/ACCEL_SENS); Serial.print("\t");
    Serial.print(az/ACCEL_SENS); Serial.print("\t");
    Serial.print(gx/GYRO_SENS); Serial.print("\t");
    Serial.print(gy/GYRO_SENS); Serial.print("\t");
    Serial.print(gz/GYRO_SENS); Serial.println("\t");
    // send data via OSC

    sendOSCBundle("a1", ax/ACCEL_SENS,ay/ACCEL_SENS,az/ACCEL_SENS);
    sendOSCBundle("g1", gx/GYRO_SENS,gy/GYRO_SENS,gz/GYRO_SENS);

    // ----------------2--------
    tcaselect(6);
    accelgyro2.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
    sendOSCBundle("a2", ax/ACCEL_SENS,ay/ACCEL_SENS,az/ACCEL_SENS);
    sendOSCBundle("g2", gx/GYRO_SENS,gy/GYRO_SENS,gz/GYRO_SENS);


    // read raw heading measurements
    //---------------1----------
    tcaselect(5);
    mag1.getHeading(&mx, &my, &mz);
    // display tab-separated mag x/y/z values
//    Serial.print(mx); Serial.print("\t");
//    Serial.print(my); Serial.print("\t");
//    Serial.print(mz); Serial.print("\t");
    sendOSCBundle("m1", mx,my,mz);

    //------------------2-----------
    tcaselect(6);
    mag2.getHeading(&mx, &my, &mz);
    sendOSCBundle("m2", mx,my,mz);

    
    // To calculate heading in degrees. 0 degree indicates North
  //  float heading = atan2(my, mx);
  //  if(heading < 0) heading += 2 * M_PI;
//    Serial.print(heading * 180/M_PI); Serial.print("\t");
  //  sendOneOSC("mH", heading * 180/M_PI);

    // request temperature
   // barometer.setControl(BMP085_MODE_TEMPERATURE);
    
    // wait appropriate time for conversion (4.5ms delay)
//    lastMicros = micros();
//    while (micros() - lastMicros < barometer.getMeasureDelayMicroseconds());

    // read calibrated temperature value in degrees Celsius
//    temperature = barometer.getTemperatureC();

    // request pressure (3x oversampling mode, high detail, 23.5ms delay)
//    barometer.setControl(BMP085_MODE_PRESSURE_3);
//    while (micros() - lastMicros < barometer.getMeasureDelayMicroseconds());

    // read calibrated pressure value in Pascals (Pa)
//    pressure = barometer.getPressure();

    // display measured values if appropriate
//    Serial.print(temperature); Serial.print("\t");
//    Serial.print(pressure/100); Serial.println("\t");

    ms = millis();
    delay(5);

  }
}
void sendOSC(){
    //send OSC fader value
    OSCMessage msgOut("/1/led");
  
    if(newvalueR != valueR) {
        faderChanged = true;
        valueR = newvalueR;
        Serial.println("ValueR = ");
        Serial.println(valueR);
    }
    
    if(faderChanged == true){
        faderChanged = false;
        msgOut.add(valueR);

        Udp.beginPacket(destIp, destPort);
        msgOut.send(Udp);
        Udp.endPacket();
        msgOut.empty();
       // Serial.println("LED updated");
    }
    
    delay(5); 
}

void receiveOSC(){
  OSCMessage msgIN;
  int size;
  if((size = Udp.parsePacket())>0){
    while(size--)
      msgIN.fill(Udp.read());
    if(!msgIN.hasError()){
      msgIN.route("/1/v1",toggleOnOff);
      msgIN.route("/1/faderR",faderR);
      msgIN.route("/1/faderG",faderG);
      msgIN.route("/1/faderB",faderB);
    }
  }
  for(int i=0; i<NUMPIXELS; i++){
     pixels1.setPixelColor(i, pixels1.Color(newvalueR,valueG,valueB)); // Moderately bright green color.
  }
  pixels1.show(); // This sends the updated pixel color to the hardware.

  for(int i=0; i<NUMPIXELS; i++){
     pixels2.setPixelColor(i, pixels2.Color(newvalueR,valueG,valueB)); // Moderately bright green color.
  }
  pixels2.show(); // This sends the updated pixel color to the hardware.
  
}

void toggleOnOff(OSCMessage &msg, int addrOffset){
  ledState = (boolean) msg.getFloat(0);
  Serial.println(ledState);
 // digitalWrite(boardLed, (ledState + 1) % 2);   // Onboard LED works the wrong direction (1 = 0 bzw. 0 = 1)
  digitalWrite(ledPin, ledState);               // External LED
  digitalWrite(vibro, ledState);

  if (ledState) {
    Serial.println("LED + VIBRO on");
  }
  else {
    Serial.println("LED + VIBRO off");
  }
  ledState = !ledState;     // toggle the state from HIGH to LOW to HIGH to LOW ...
}

void faderR(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  newvalueR = msg.getFloat(0)*100;  
  newvalueR = map(newvalueR, 0, 100, 0, 255);
  
  Serial.print("Value R: ");
  Serial.println(newvalueR);
}

void faderG(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueG = msg.getFloat(0)*100;  
  valueG = map(valueG, 0, 100, 0, 255);
  
  Serial.print("Value G: ");
  Serial.println(valueG);
}

void faderB(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueB = msg.getFloat(0)*100;  
  valueB = map(valueB, 0, 100, 0, 255);
  
  Serial.print("Value B: ");
  Serial.println(valueB);
}

void sendOSCBundle(String key, float x, float y, float z){ 

    //declare the bundle
    OSCBundle bndl;
    bndl.empty(); // empty the bundle to free room for a new one
    
    if(key == "a1"){
      //OSCBundle's add' returns the OSCMessage so the message's 'add' can be composed together
        bndl.add("/1/ax1").add(x);
        bndl.add("/1/ay1").add(y);
        bndl.add("/1/az1").add(z);
    }else if(key== "a2"){
        bndl.add("/1/ax2").add(x);
        bndl.add("/1/ay2").add(y);
        bndl.add("/1/az2").add(z);
    }else if(key == "g1") {
        bndl.add("/1/gx1").add(x);
        bndl.add("/1/gy1").add(y);
        bndl.add("/1/gz1").add(z);
    }else if(key == "g2") {
        bndl.add("/1/gx2").add(x);
        bndl.add("/1/gy2").add(y);
        bndl.add("/1/gz2").add(z);
    }else if(key == "m1") {
        bndl.add("/1/mx1").add(x);
        bndl.add("/1/my1").add(y);
        bndl.add("/1/mz1").add(z);
    }else if(key == "m2") {
        bndl.add("/1/mx2").add(x);
        bndl.add("/1/my2").add(y);
        bndl.add("/1/mz2").add(z);
    }
    //left/right    id    axel/gyro/mag/led/vib     component       :    value 
    //l/r           0-9   a/g/m/l/v                 x/y/z/r/g/b         -----
    //2nd left led with green value: l2lg: 255
    Udp.beginPacket(destIp, destPort);
    bndl.send(Udp); // send the bytes to the SLIP stream
    Udp.endPacket(); // mark the end of the OSC Packet
    bndl.empty(); // empty the bundle to free room for a new one

    delay(5);

}


