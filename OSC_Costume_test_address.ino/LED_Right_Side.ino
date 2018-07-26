//----------------------------------------------------------LEFT SIDE----------------
//--------------------------------------------------------------0--------------------
void r0lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRright[0] = msg.getFloat(0)*100;  
  valueRright[0] = map(valueRright[0], 0, 100, 0, 255);
}

void r0lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGright[0] = msg.getFloat(0)*100;  
  valueGright[0] = map(valueGright[0], 0, 100, 0, 255);
}

void r0lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBright[0] = msg.getFloat(0)*100;  
  valueBright[0] = map(valueBright[0], 0, 100, 0, 255);
}

//--------------------------------------------------------------1--------------------
void r1lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRright[1] = msg.getFloat(0)*100;  
  valueRright[1] = map(valueRright[1], 0, 100, 0, 255);
}

void r1lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGright[1] = msg.getFloat(0)*100;  
  valueGright[1] = map(valueGright[1], 0, 100, 0, 255);
}

void r1lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBright[1] = msg.getFloat(0)*100;  
  valueBright[1] = map(valueBright[1], 0, 100, 0, 255);
}
//--------------------------------------------------------------2--------------------
void r2lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRright[2] = msg.getFloat(0)*100;  
  valueRright[2] = map(valueRright[2], 0, 100, 0, 255);
}

void r2lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGright[2] = msg.getFloat(0)*100;  
  valueGright[2] = map(valueGright[2], 0, 100, 0, 255);
}

void r2lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBright[2] = msg.getFloat(0)*100;  
  valueBright[2] = map(valueBright[2], 0, 100, 0, 255);
}
//--------------------------------------------------------------3--------------------
void r3lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRright[3] = msg.getFloat(0)*100;  
  valueRright[3] = map(valueRright[3], 0, 100, 0, 255);
}

void r3lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGright[3] = msg.getFloat(0)*100;  
  valueGright[3] = map(valueGright[3], 0, 100, 0, 255);
}

void r3lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBright[3] = msg.getFloat(0)*100;  
  valueBright[3] = map(valueBright[3], 0, 100, 0, 255);
}
//--------------------------------------------------------------4--------------------
void r4lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRright[4] = msg.getFloat(0)*100;  
  valueRright[4] = map(valueRright[4], 0, 100, 0, 255);
}

void r4lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGright[4] = msg.getFloat(0)*100;  
  valueGright[4] = map(valueGright[4], 0, 100, 0, 255);
}

void r4lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBright[4] = msg.getFloat(0)*100;  
  valueBright[4] = map(valueBright[4], 0, 100, 0, 255);
}
//--------------------------------------------------------------5--------------------
void r5lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRright[5] = msg.getFloat(0)*100;  
  valueRright[5] = map(valueRright[5], 0, 100, 0, 255);
}

void r5lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGright[5] = msg.getFloat(0)*100;  
  valueGright[5] = map(valueGright[5], 0, 100, 0, 255);
}

void r5lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBright[5] = msg.getFloat(0)*100;  
  valueBright[5] = map(valueBright[5], 0, 100, 0, 255);
}
//--------------------------------------------------------------6--------------------
void r6lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRright[6] = msg.getFloat(0)*100;  
  valueRright[6] = map(valueRright[6], 0, 100, 0, 255);
}

void r6lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGright[6] = msg.getFloat(0)*100;  
  valueGright[6] = map(valueGright[6], 0, 100, 0, 255);
}

void r6lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBright[6] = msg.getFloat(0)*100;  
  valueBright[6] = map(valueBright[6], 0, 100, 0, 255);
}
//--------------------------------------------------------------7--------------------
void r7lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRright[7] = msg.getFloat(0)*100;  
  valueRright[7] = map(valueRright[7], 0, 100, 0, 255);
}

void r7lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGright[7] = msg.getFloat(0)*100;  
  valueGright[7] = map(valueGright[7], 0, 100, 0, 255);
}

void r7lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBright[7] = msg.getFloat(0)*100;  
  valueBright[7] = map(valueBright[7], 0, 100, 0, 255);
}
//--------------------------------------------------------------8--------------------
void r8lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRright[8] = msg.getFloat(0)*100;  
  valueRright[8] = map(valueRright[8], 0, 100, 0, 255);
}

void r8lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGright[8] = msg.getFloat(0)*100;  
  valueGright[8] = map(valueGright[8], 0, 100, 0, 255);
}

void r8lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBright[8] = msg.getFloat(0)*100;  
  valueBright[8] = map(valueBright[8], 0, 100, 0, 255);
}
//--------------------------------------------------------------9--------------------
void r9lr(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueRright[9] = msg.getFloat(0)*100;  
  valueRright[9] = map(valueRright[9], 0, 100, 0, 255);
}

void r9lg(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueGright[9] = msg.getFloat(0)*100;  
  valueGright[9] = map(valueGright[9], 0, 100, 0, 255);
}

void r9lb(OSCMessage &msg, int addrOffset){
  //fader TouchOSC values are from 0.0 to 1.0
  valueBright[9] = msg.getFloat(0)*100;  
  valueBright[9] = map(valueBright[9], 0, 100, 0, 255);
}
