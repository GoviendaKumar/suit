void ping(OSCMessage &msg, int addrOffset){
  OSCMessage msgOut("/ping");
  msgOut.send(Udp);
}

//----------------------------------------------------------LEFT SIDE----------------
//--------------------------------------------------------------0--------------------
void l0lr(OSCMessage &msg, int addrOffset){
  valueRleft[0] = msg.getFloat(0);
  valueRleft[1] = msg.getFloat(0);
}

void l0lg(OSCMessage &msg, int addrOffset){
  valueGleft[0] = msg.getFloat(0);
  valueGleft[1] = msg.getFloat(0);
}

void l0lb(OSCMessage &msg, int addrOffset){
  valueBleft[0] = msg.getFloat(0);
  valueBleft[1] = msg.getFloat(0);
}

//--------------------------------------------------------------1--------------------
void l1lr(OSCMessage &msg, int addrOffset){
  valueRleft[2] = msg.getFloat(0);
  valueRleft[3] = msg.getFloat(0);
  valueRleft[4] = msg.getFloat(0);
}

void l1lg(OSCMessage &msg, int addrOffset){
  valueGleft[2] = msg.getFloat(0);
  valueGleft[3] = msg.getFloat(0);
  valueGleft[4] = msg.getFloat(0);
}

void l1lb(OSCMessage &msg, int addrOffset){
  valueBleft[2] = msg.getFloat(0);
  valueBleft[3] = msg.getFloat(0);
  valueBleft[4] = msg.getFloat(0);
}
//--------------------------------------------------------------2--------------------
void l2lr(OSCMessage &msg, int addrOffset){
  valueRleft[5] = msg.getFloat(0);
  valueRleft[6] = msg.getFloat(0);
  valueRleft[7] = msg.getFloat(0);
}

void l2lg(OSCMessage &msg, int addrOffset){
  valueGleft[5] = msg.getFloat(0);
  valueGleft[6] = msg.getFloat(0);
  valueGleft[7] = msg.getFloat(0);
}

void l2lb(OSCMessage &msg, int addrOffset){
  valueBleft[5] = msg.getFloat(0);
  valueBleft[6] = msg.getFloat(0);
  valueBleft[7] = msg.getFloat(0);
}
//--------------------------------------------------------------3--------------------
void l3lr(OSCMessage &msg, int addrOffset){
  valueRleft[8] = msg.getFloat(0);
  valueRleft[9] = msg.getFloat(0);
}

void l3lg(OSCMessage &msg, int addrOffset){
  valueGleft[8] = msg.getFloat(0);
  valueGleft[9] = msg.getFloat(0);
}

void l3lb(OSCMessage &msg, int addrOffset){
  valueBleft[8] = msg.getFloat(0);
  valueBleft[9] = msg.getFloat(0);
}
