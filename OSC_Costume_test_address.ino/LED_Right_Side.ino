//----------------------------------------------------------right SIDE----------------
//--------------------------------------------------------------0--------------------
void r0lr(OSCMessage &msg, int addrOffset){
  valueRright[0] = msg.getFloat(0);
  valueRright[1] = msg.getFloat(0);
}

void r0lg(OSCMessage &msg, int addrOffset){
  valueGright[0] = msg.getFloat(0);
  valueGright[1] = msg.getFloat(0);
}

void r0lb(OSCMessage &msg, int addrOffset){
  valueBright[0] = msg.getFloat(0);
  valueBright[1] = msg.getFloat(0);
}

//--------------------------------------------------------------1--------------------
void r1lr(OSCMessage &msg, int addrOffset){
  valueRright[2] = msg.getFloat(0);
  valueRright[3] = msg.getFloat(0);
  valueRright[4] = msg.getFloat(0);
}

void r1lg(OSCMessage &msg, int addrOffset){
  valueGright[2] = msg.getFloat(0);
  valueGright[3] = msg.getFloat(0);
  valueGright[4] = msg.getFloat(0);
}

void r1lb(OSCMessage &msg, int addrOffset){
  valueBright[2] = msg.getFloat(0);
  valueBright[3] = msg.getFloat(0);
  valueBright[4] = msg.getFloat(0);
}
//--------------------------------------------------------------2--------------------
void r2lr(OSCMessage &msg, int addrOffset){
  valueRright[5] = msg.getFloat(0);
  valueRright[6] = msg.getFloat(0);
  valueRright[7] = msg.getFloat(0);
}

void r2lg(OSCMessage &msg, int addrOffset){
  valueGright[5] = msg.getFloat(0);
  valueGright[6] = msg.getFloat(0);
  valueGright[7] = msg.getFloat(0);
}

void r2lb(OSCMessage &msg, int addrOffset){
  valueBright[5] = msg.getFloat(0);
  valueBright[6] = msg.getFloat(0);
  valueBright[7] = msg.getFloat(0);
}
//--------------------------------------------------------------3--------------------
void r3lr(OSCMessage &msg, int addrOffset){
  valueRright[8] = msg.getFloat(0);
  valueRright[9] = msg.getFloat(0);
}

void r3lg(OSCMessage &msg, int addrOffset){
  valueGright[8] = msg.getFloat(0);
  valueGright[9] = msg.getFloat(0);
}

void r3lb(OSCMessage &msg, int addrOffset){
  valueBright[8] = msg.getFloat(0);
  valueBright[9] = msg.getFloat(0);
}
