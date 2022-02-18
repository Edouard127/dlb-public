
function loadPusherList(netChoice, chanID) {

  if (netChoice == null) return

  else {

    if (netChoice == "A00") pushTo_A00(chanID);
    if (netChoice == "B00") pushTo_B00(chanID);
    if (netChoice == "C00") pushTo_C00(chanID);
    if (netChoice == "NSFW000") pushTo_NSFW000(chanID);

    console.log(" Un salon vient d'être ajouté au réseau : " + netChoice)
  }

}

module.exports = loadPusherList;