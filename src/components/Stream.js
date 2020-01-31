import React, { Component } from "react";
const Parser = require("icecast-parser");

const radioStation = new Parser({
  url: "http://curiaradio.ddns.net:8000/stream?type=.mp4", // URL to radio station
  userAgent: "Parse-Icy", // userAgent to request
  keepListen: true, // listen radio station after metadata was received
  autoUpdate: true, // update metadata after interval
  errorInterval: 10 * 60, // retry connection after 10 minutes
  emptyInterval: 5 * 60, // retry get metadata after 5 minutes
  metadataInterval: 5 // update metadata after 5 seconds
});

radioStation.on("metadata", function(metadata) {
  console.log("Here you will receive metadata each 10 seconds");
  console.log(metadata.StreamTitle);
});

const Stream = () => (
  <div className="w-100 fixed bottom-0 z-5 flex justify-start">
    <video controls width="200px" height="100px" autoPlay="true" name="media">
      <source
        src="http://curiaradio.ddns.net:8000/stream?type=.mp4"
        type="audio/mpeg"
      />
    </video>
  </div>
);

export default Stream;
