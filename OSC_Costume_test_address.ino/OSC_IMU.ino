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

    // send data via OSC
    sendOSCBundle("l0a", ax/ACCEL_SENS,ay/ACCEL_SENS,az/ACCEL_SENS);
    sendOSCBundle("l0g", gx/GYRO_SENS,gy/GYRO_SENS,gz/GYRO_SENS);


    // ----------------2--------
    tcaselect(6);
    accelgyro2.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);

    // send data via OSC
    sendOSCBundle("r0a", ax/ACCEL_SENS,ay/ACCEL_SENS,az/ACCEL_SENS);
    sendOSCBundle("r0g", gx/GYRO_SENS,gy/GYRO_SENS,gz/GYRO_SENS);



    // read raw mag measurements
    //---------------1----------
    tcaselect(5);
    mag1.getHeading(&mx, &my, &mz);

    // send data via OSC
    sendOSCBundle("l0m", mx,my,mz);


    //------------------2-----------
    tcaselect(6);
    mag2.getHeading(&mx, &my, &mz);

    // send data via OSC
    sendOSCBundle("r0m", mx,my,mz);

    ms = millis();
    delay(5);

  }
}

void sendOSCBundle(String key, float x, float y, float z){

    //declare the bundle
    OSCBundle bndl;
    bndl.empty(); // empty the bundle to free room for a new one
    if(key == "l0a"){
      //OSCBundle's add' returns the OSCMessage so the message's 'add' can be composed together
        bndl.add("/l0ax").add(x);
        bndl.add("/l0ay").add(y);
        bndl.add("/l0az").add(z);
    }else if(key == "r0a"){
        bndl.add("/r0ax").add(x);
        bndl.add("/r0ay").add(y);
        bndl.add("/r0az").add(z);
    }else if(key == "l0g") {
        bndl.add("/l0gx").add(x);
        bndl.add("/l0gy").add(y);
        bndl.add("/l0gz").add(z);
    }else if(key == "r0g") {
        bndl.add("/r0gx").add(x);
        bndl.add("/r0gy").add(y);
        bndl.add("/r0gz").add(z);
    }else if(key == "l0m") {
        bndl.add("/l0mx").add(x);
        bndl.add("/l0my").add(y);
        bndl.add("/l0mz").add(z);
    }else if(key == "r0m") {
        bndl.add("/r0mx").add(x);
        bndl.add("/r0my").add(y);
        bndl.add("/r0mz").add(z);
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
