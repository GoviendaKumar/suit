void receiveOSC(){
  OSCMessage msgIN;
  int size;
  if((size = Udp.parsePacket())>0){
    while(size--)
      msgIN.fill(Udp.read());
    if(!msgIN.hasError()){
      msgIN.route("/ping", ping);
      msgIN.route("/v1",v1);
      msgIN.route("/faderR",faderR);
      msgIN.route("/faderG",faderG);
      msgIN.route("/faderB",faderB);

      //----------------LEFT----------calling functions according to address received
      msgIN.route("/l0lr",l0lr);
      msgIN.route("/l0lg",l0lg);
      msgIN.route("/l0lb",l0lb);

      msgIN.route("/l1lr",l1lr);
      msgIN.route("/l1lg",l1lg);
      msgIN.route("/l1lb",l1lb);

      msgIN.route("/l2lr",l2lr);
      msgIN.route("/l2lg",l2lg);
      msgIN.route("/l2lb",l2lb);

      msgIN.route("/l3lr",l3lr);
      msgIN.route("/l3lg",l3lg);
      msgIN.route("/l3lb",l3lb);

      msgIN.route("/l4lr",l4lr);
      msgIN.route("/l4lg",l4lg);
      msgIN.route("/l4lb",l4lb);

      msgIN.route("/l5lr",l5lr);
      msgIN.route("/l5lg",l5lg);
      msgIN.route("/l5lb",l5lb);

      msgIN.route("/l6lr",l6lr);
      msgIN.route("/l6lg",l6lg);
      msgIN.route("/l6lb",l6lb);

      msgIN.route("/l7lr",l7lr);
      msgIN.route("/l7lg",l7lg);
      msgIN.route("/l7lb",l7lb);

      msgIN.route("/l8lr",l8lr);
      msgIN.route("/l8lg",l8lg);
      msgIN.route("/l8lb",l8lb);

      msgIN.route("/l9lr",l9lr);
      msgIN.route("/l9lg",l9lg);
      msgIN.route("/l9lb",l9lb);

      //----------------RIGHT----------calling functions according to address received
      msgIN.route("/r0lr",r0lr);
      msgIN.route("/r0lg",r0lg);
      msgIN.route("/r0lb",r0lb);

      msgIN.route("/r1lr",r1lr);
      msgIN.route("/r1lg",r1lg);
      msgIN.route("/r1lb",r1lb);

      msgIN.route("/r2lr",r2lr);
      msgIN.route("/r2lg",r2lg);
      msgIN.route("/r2lb",r2lb);

      msgIN.route("/r3lr",r3lr);
      msgIN.route("/r3lg",r3lg);
      msgIN.route("/r3lb",r3lb);

      msgIN.route("/r4lr",r4lr);
      msgIN.route("/r4lg",r4lg);
      msgIN.route("/r4lb",r4lb);

      msgIN.route("/r5lr",r5lr);
      msgIN.route("/r5lg",r5lg);
      msgIN.route("/r5lb",r5lb);

      msgIN.route("/r6lr",r6lr);
      msgIN.route("/r6lg",r6lg);
      msgIN.route("/r6lb",r6lb);

      msgIN.route("/r7lr",r7lr);
      msgIN.route("/r7lg",r7lg);
      msgIN.route("/r7lb",r7lb);

      msgIN.route("/r8lr",r8lr);
      msgIN.route("/r8lg",r8lg);
      msgIN.route("/r8lb",r8lb);

      msgIN.route("/r9lr",r9lr);
      msgIN.route("/r9lg",r9lg);
      msgIN.route("/r9lb",r9lb);
    }
  }

  //change left LED stripe
  for(int i=0; i<NUMPIXELS; i++){
     pixels1.setPixelColor(i, pixels1.Color(valueRleft[i],valueGleft[i],valueBleft[i])); // Moderately bright green color.
  }
  pixels1.show(); // This sends the updated pixel color to the hardware.

  //change rignt LED stripe
  for(int i=0; i<NUMPIXELS; i++){
     pixels2.setPixelColor(i, pixels2.Color(valueRright[i],valueGright[i],valueBright[i])); // Moderately bright green color.
  }
  pixels2.show(); // This sends the updated pixel color to the hardware.

}





//LED functions - all left leds
void faderR(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  for(int i = 0; i<NUMPIXELS; i++){
    valueRleft[i] = msg.getFloat(0)*100;
    valueRleft[i] = map(valueRleft[i], 0, 100, 0, 255);
  }

//  Serial.print("Value R: ");
//  Serial.println(valueRleft);
}

void faderG(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
   for(int i = 0; i<NUMPIXELS; i++){
    valueGleft[i] = msg.getFloat(0)*100;
    valueGleft[i] = map(valueGleft[i], 0, 100, 0, 255);
   }

}

// vibro
void v1(OSCMessage &msg, int addrOffset){
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

void faderB(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
   for(int i = 0; i<NUMPIXELS; i++){
    valueBleft[i] = msg.getFloat(0)*100;
    valueBleft[i] = map(valueBleft[i], 0, 100, 0, 255);
   }

}
