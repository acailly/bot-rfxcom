const rfxcom = require("rfxcom");

let rfxtrx;

module.exports = function(vorpal) {
  vorpal
    .command("rfxcom <command>")
    .autocomplete(["connect"])
    .description('Interact with 433Mhz with the RFXtrx433 ("RFXCom")')
    .action(function(args, callback) {
      const command = args.command;

      if (command === "connect") {
        rfxtrx = new rfxcom.RfxCom("COM3", {
          /* DEBUG debug: true */
        });

        rfxtrx.on("connecting", function(evt) {
          console.log("[rfxcom] Connecting...");
        });

        rfxtrx.on("ready", function(evt) {
          console.log("[rfxcom] Connected");
        });

        rfxtrx.on("connectfailed", function(evt) {
          console.log("[rfxcom] Connection failed");
        });

        rfxtrx.on("disconnect", function(evt) {
          console.log("[rfxcom] Disconnected");
        });

        rfxtrx.initialise(() => {
          console.log("RFXtrx433 device initialized");
        });

        // DEBUG
        // rfxtrx.on("receive", function(evt) {
        //   console.log("[rfxcom] received", evt);
        // });

        rfxtrx.on("temperaturehumidity1", function(evt) {
          const { id, temperature, humidity } = evt;
          console.log(
            `[rfxcom] Sensor ${id} said temperature is ${temperature}°C and humidity is ${humidity}%`
          );
        });

        callback();
      }
    });
};
