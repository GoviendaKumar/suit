void ping(OSCMessage &msg, int addrOffset){
  OSCMessage msgOut("/ping");
  msgOut.send(Udp);
}

//----------------------------------------------------------LEFT SIDE----------------
//--------------------------------------------------------------0--------------------
void l0lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRleft[0] = msg.getFloat(0)*100;
  valueRleft[0] = map(valueRleft[0], 0, 100, 0, 255);
}

void l0lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGleft[0] = msg.getFloat(0)*100;
  valueGleft[0] = map(valueGleft[0], 0, 100, 0, 255);
}

void l0lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBleft[0] = msg.getFloat(0)*100;
  valueBleft[0] = map(valueBleft[0], 0, 100, 0, 255);
}

//--------------------------------------------------------------1--------------------
void l1lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRleft[1] = msg.getFloat(0)*100;
  valueRleft[1] = map(valueRleft[1], 0, 100, 0, 255);
}

void l1lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGleft[1] = msg.getFloat(0)*100;
  valueGleft[1] = map(valueGleft[1], 0, 100, 0, 255);
}

void l1lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBleft[1] = msg.getFloat(0)*100;
  valueBleft[1] = map(valueBleft[1], 0, 100, 0, 255);
}
//--------------------------------------------------------------2--------------------
void l2lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRleft[2] = msg.getFloat(0)*100;
  valueRleft[2] = map(valueRleft[2], 0, 100, 0, 255);
}

void l2lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGleft[2] = msg.getFloat(0)*100;
  valueGleft[2] = map(valueGleft[2], 0, 100, 0, 255);
}

void l2lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBleft[2] = msg.getFloat(0)*100;
  valueBleft[2] = map(valueBleft[2], 0, 100, 0, 255);
}
//--------------------------------------------------------------3--------------------
void l3lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRleft[3] = msg.getFloat(0)*100;
  valueRleft[3] = map(valueRleft[3], 0, 100, 0, 255);
}

void l3lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGleft[3] = msg.getFloat(0)*100;
  valueGleft[3] = map(valueGleft[3], 0, 100, 0, 255);
}

void l3lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBleft[3] = msg.getFloat(0)*100;
  valueBleft[3] = map(valueBleft[3], 0, 100, 0, 255);
}
//--------------------------------------------------------------4--------------------
void l4lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRleft[4] = msg.getFloat(0)*100;
  valueRleft[4] = map(valueRleft[4], 0, 100, 0, 255);
}

void l4lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGleft[4] = msg.getFloat(0)*100;
  valueGleft[4] = map(valueGleft[4], 0, 100, 0, 255);
}

void l4lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBleft[4] = msg.getFloat(0)*100;
  valueBleft[4] = map(valueBleft[4], 0, 100, 0, 255);
}
//--------------------------------------------------------------5--------------------
void l5lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRleft[5] = msg.getFloat(0)*100;
  valueRleft[5] = map(valueRleft[5], 0, 100, 0, 255);
}

void l5lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGleft[5] = msg.getFloat(0)*100;
  valueGleft[5] = map(valueGleft[5], 0, 100, 0, 255);
}

void l5lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBleft[5] = msg.getFloat(0)*100;
  valueBleft[5] = map(valueBleft[5], 0, 100, 0, 255);
}
//--------------------------------------------------------------6--------------------
void l6lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRleft[6] = msg.getFloat(0)*100;
  valueRleft[6] = map(valueRleft[6], 0, 100, 0, 255);
}

void l6lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGleft[6] = msg.getFloat(0)*100;
  valueGleft[6] = map(valueGleft[6], 0, 100, 0, 255);
}

void l6lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBleft[6] = msg.getFloat(0)*100;
  valueBleft[6] = map(valueBleft[6], 0, 100, 0, 255);
}
//--------------------------------------------------------------7--------------------
void l7lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRleft[7] = msg.getFloat(0)*100;
  valueRleft[7] = map(valueRleft[7], 0, 100, 0, 255);
}

void l7lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGleft[7] = msg.getFloat(0)*100;
  valueGleft[7] = map(valueGleft[7], 0, 100, 0, 255);
}

void l7lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBleft[7] = msg.getFloat(0)*100;
  valueBleft[7] = map(valueBleft[7], 0, 100, 0, 255);
}
//--------------------------------------------------------------8--------------------
void l8lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRleft[8] = msg.getFloat(0)*100;
  valueRleft[8] = map(valueRleft[8], 0, 100, 0, 255);
}

void l8lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGleft[8] = msg.getFloat(0)*100;
  valueGleft[8] = map(valueGleft[8], 0, 100, 0, 255);
}

void l8lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBleft[8] = msg.getFloat(0)*100;
  valueBleft[8] = map(valueBleft[8], 0, 100, 0, 255);
}
//--------------------------------------------------------------9--------------------
void l9lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRleft[9] = msg.getFloat(0)*100;
  valueRleft[9] = map(valueRleft[9], 0, 100, 0, 255);
}

void l9lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGleft[9] = msg.getFloat(0)*100;
  valueGleft[9] = map(valueGleft[9], 0, 100, 0, 255);
}

void l9lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBleft[9] = msg.getFloat(0)*100;
  valueBleft[9] = map(valueBleft[9], 0, 100, 0, 255);
}
