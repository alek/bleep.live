var getVolumeEstimate = function(className, categoryName) {

  // pass 1 - match class + category
	for (var i=0; i<volEstimates.length; i++) {
		if ((volEstimates[i]["className"] == className) && (volEstimates[i]["categoryName"] == categoryName)) {
			return volEstimates[i]
		}
	}

  // pass 2 - match category
  for (var i=0; i<volEstimates.length; i++) {
    if (volEstimates[i]["categoryName"] == categoryName) {
      return volEstimates[i]
    }
  }


  // pass 3 - match class
  for (var i=0; i<volEstimates.length; i++) {
    if (volEstimates[i]["className"] == className) {
      return volEstimates[i]
    }
  }


	return null
}

var volEstimates = [
  {
    "className": "Amplifier Circuits",
    "categoryName": "Buffer Amplifiers",
    "distribution": [
      "4",
      "15",
      "50",
      "150",
      "1975"
    ]
  },
  {
    "className": "Amplifier Circuits",
    "categoryName": "Comparators",
    "distribution": [
      "5",
      "44",
      "200",
      "1000",
      "10000"
    ]
  },
  {
    "className": "Amplifier Circuits",
    "categoryName": "Instrumentation Amplifiers",
    "distribution": [
      "6",
      "40",
      "150",
      "600",
      "6000"
    ]
  },
  {
    "className": "Amplifier Circuits",
    "categoryName": "Isolation Amplifiers",
    "distribution": [
      "5",
      "20.25",
      "60",
      "258.75",
      "2153.25"
    ]
  },
  {
    "className": "Amplifier Circuits",
    "categoryName": "Operational Amplifiers",
    "distribution": [
      "7",
      "50",
      "205",
      "1000",
      "11000"
    ]
  },
  {
    "className": "Amplifier Circuits",
    "categoryName": "Sample and Hold Circuits",
    "distribution": [
      "2.15",
      "10",
      "77.5",
      "180",
      "962.5"
    ]
  },
  {
    "className": "Batteries",
    "categoryName": "Batteries",
    "distribution": [
      "5",
      "50",
      "250",
      "1000",
      "10000"
    ]
  },
  {
    "className": "Capacitors",
    "categoryName": "Aluminum Electrolytic Capacitors",
    "distribution": [
      "3",
      "24",
      "119",
      "600",
      "5000"
    ]
  },
  {
    "className": "Capacitors",
    "categoryName": "Array/Network Capacitors",
    "distribution": [
      "15",
      "200",
      "1500",
      "9000",
      "70000"
    ]
  },
  {
    "className": "Capacitors",
    "categoryName": "Ceramic Capacitors",
    "distribution": [
      "10",
      "100",
      "450",
      "2118",
      "24000"
    ]
  },
  {
    "className": "Capacitors",
    "categoryName": "Film Capacitors",
    "distribution": [
      "10",
      "55.75",
      "234.5",
      "855",
      "7500"
    ]
  },
  {
    "className": "Capacitors",
    "categoryName": "Fixed Capacitors",
    "distribution": [
      "10",
      "100",
      "500",
      "3120",
      "49000"
    ]
  },
  {
    "className": "Capacitors",
    "categoryName": "Mica Capacitors",
    "distribution": [
      "2",
      "10",
      "30",
      "115.5",
      "3654.1"
    ]
  },
  {
    "className": "Capacitors",
    "categoryName": "Special Capacitors",
    "distribution": [
      "10",
      "100",
      "500",
      "2000",
      "30000"
    ]
  },
  {
    "className": "Capacitors",
    "categoryName": "Tantalum Capacitors",
    "distribution": [
      "4",
      "30",
      "144",
      "608.25",
      "7000"
    ]
  },
  {
    "className": "Capacitors",
    "categoryName": "Variable Capacitors",
    "distribution": [
      "5",
      "50",
      "250",
      "1500",
      "19934.8"
    ]
  },
  {
    "className": "Circuit Protection",
    "categoryName": "Circuit Breaker",
    "distribution": [
      "1",
      "4",
      "15",
      "62.5",
      "500"
    ]
  },
  {
    "className": "Circuit Protection",
    "categoryName": "Electric Fuses",
    "distribution": [
      "5",
      "45",
      "186",
      "850",
      "10000"
    ]
  },
  {
    "className": "Connector Support",
    "categoryName": "Assembly Items",
    "distribution": [
      "2",
      "17",
      "90",
      "500",
      "6000"
    ]
  },
  {
    "className": "Connector Support",
    "categoryName": "Military Connector Accessories",
    "distribution": [
      "1",
      "10",
      "50",
      "300",
      "4638.3"
    ]
  },
  {
    "className": "Connector Support",
    "categoryName": "Tools and Machinery",
    "distribution": [
      "1.7",
      "10.75",
      "950",
      "3857.5",
      "26500"
    ]
  },
  {
    "className": "Connector Support",
    "categoryName": "Wires and Cables",
    "distribution": [
      "2",
      "16",
      "75",
      "390",
      "7508.75"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Audio/RCA Connectors",
    "distribution": [
      "6",
      "30",
      "150",
      "649",
      "8000"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Circular Adapters",
    "distribution": [
      "1",
      "4.25",
      "16",
      "156.25",
      "2687.5"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Combination Line Connectors",
    "distribution": [
      "3",
      "25",
      "100",
      "500",
      "6900"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "D Type Connectors",
    "distribution": [
      "2",
      "9",
      "26",
      "136",
      "1000"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "DC Power Plugs or Jacks",
    "distribution": [
      "8",
      "50",
      "250",
      "1000",
      "10600"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "DIN Connectors",
    "distribution": [
      "5",
      "25",
      "100",
      "400",
      "2000"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Fiber Optic Adapters",
    "distribution": [
      "1.95",
      "5.75",
      "20",
      "52.5",
      "400"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Fiber Optic Networking Connectors",
    "distribution": [
      "2",
      "5.5",
      "12",
      "30",
      "60"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Fiber Optic SC Connectors",
    "distribution": [
      "4",
      "12",
      "30",
      "100",
      "200"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Fiber Optic ST Connectors",
    "distribution": [
      "4",
      "10",
      "40",
      "400",
      "14520"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Headers and Edge Type Connectors",
    "distribution": [
      "5",
      "30",
      "114",
      "600",
      "6000"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Mains Power Connectors",
    "distribution": [
      "1",
      "10",
      "50",
      "200",
      "1217.5"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Military Circular Connectors",
    "distribution": [
      "1",
      "4",
      "12",
      "50",
      "400"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Multiway Rack and Panel Connectors",
    "distribution": [
      "1",
      "9",
      "25",
      "80",
      "2000"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Other Circular Connectors",
    "distribution": [
      "1",
      "10",
      "50",
      "200",
      "1954"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Other Fiber Optic Connectors",
    "distribution": [
      "12",
      "35",
      "99",
      "260",
      "1120"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Other Interconnects",
    "distribution": [
      "5",
      "50",
      "220",
      "1000",
      "10500"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Other Rectangular Connectors",
    "distribution": [
      "4",
      "12",
      "50",
      "250",
      "5000"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Other RF Connectors",
    "distribution": [
      "10",
      "60",
      "270",
      "1517.75",
      "35000"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Power Connectors",
    "distribution": [
      "3",
      "25",
      "100",
      "500",
      "5000"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Rectangular Adapters",
    "distribution": [
      "4",
      "10.5",
      "35",
      "80",
      "201.1"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "RF Adapters",
    "distribution": [
      "8",
      "60",
      "250",
      "1145",
      "10660"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "RF Blindmate Connectors",
    "distribution": [
      "6",
      "30",
      "100",
      "400",
      "3000"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "RF BNC Connectors",
    "distribution": [
      "4",
      "25",
      "100",
      "390",
      "2500"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "RF MCX/MMCX Connectors",
    "distribution": [
      "10",
      "50",
      "175",
      "750",
      "5708"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "RF N Connectors",
    "distribution": [
      "1",
      "10",
      "40",
      "112.5",
      "1000"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "RF SMA/SSMA Connectors",
    "distribution": [
      "4",
      "25",
      "100",
      "300",
      "2718"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "RF SMB/SSMB Connectors",
    "distribution": [
      "4",
      "20",
      "75",
      "205",
      "1996.7"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "RF SMC/SSMC Connectors",
    "distribution": [
      "3.8",
      "26",
      "64",
      "200",
      "591"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "RF TNC Connectors",
    "distribution": [
      "2",
      "15",
      "100",
      "500",
      "2500"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "RF Twinax/Triax/Quadax Connectors",
    "distribution": [
      "5",
      "15",
      "30",
      "100",
      "666"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "SHV Connectors",
    "distribution": [
      "1",
      "5",
      "10",
      "37",
      "518.4"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Telecom and Datacom Connectors",
    "distribution": [
      "5",
      "50",
      "195",
      "750",
      "6000"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Two Part Board Connectors",
    "distribution": [
      "10",
      "25",
      "50",
      "100",
      "1800"
    ]
  },
  {
    "className": "Connectors",
    "categoryName": "Two Part Euro Connectors",
    "distribution": [
      "3.4",
      "12",
      "50",
      "186",
      "1984.8"
    ]
  },
  {
    "className": "Consumer Circuits",
    "categoryName": "Audio Control ICs",
    "distribution": [
      "10",
      "50",
      "200",
      "600",
      "9130"
    ]
  },
  {
    "className": "Consumer Circuits",
    "categoryName": "Audio Synthesizer ICs",
    "distribution": [
      "2.45",
      "20",
      "100",
      "362.5",
      "1000"
    ]
  },
  {
    "className": "Consumer Circuits",
    "categoryName": "Audio/Video Amplifiers",
    "distribution": [
      "5",
      "40",
      "150",
      "750",
      "9250"
    ]
  },
  {
    "className": "Consumer Circuits",
    "categoryName": "Color Signal Converters",
    "distribution": [
      "6",
      "30",
      "100",
      "250",
      "1444"
    ]
  },
  {
    "className": "Consumer Circuits",
    "categoryName": "Other Consumer ICs",
    "distribution": [
      "10",
      "50",
      "200",
      "900",
      "7932.65"
    ]
  },
  {
    "className": "Consumer Circuits",
    "categoryName": "Receiver ICs",
    "distribution": [
      "12",
      "190",
      "920",
      "7500",
      "28890"
    ]
  },
  {
    "className": "Consumer Circuits",
    "categoryName": "Remote Control ICs",
    "distribution": [
      "50",
      "200",
      "500",
      "2125",
      "318000"
    ]
  },
  {
    "className": "Converters",
    "categoryName": "Analog Special Function Converters",
    "distribution": [
      "4",
      "20",
      "100",
      "450",
      "2000"
    ]
  },
  {
    "className": "Converters",
    "categoryName": "Analog to Digital Converters",
    "distribution": [
      "5",
      "25",
      "100",
      "500",
      "5000"
    ]
  },
  {
    "className": "Converters",
    "categoryName": "Digital Potentiometers",
    "distribution": [
      "8.4",
      "50",
      "204",
      "1000",
      "10000"
    ]
  },
  {
    "className": "Converters",
    "categoryName": "Digital to Analog Converters",
    "distribution": [
      "5",
      "25",
      "100",
      "350",
      "3300"
    ]
  },
  {
    "className": "Converters",
    "categoryName": "Other Converters",
    "distribution": [
      "18",
      "100",
      "250",
      "950",
      "15750"
    ]
  },
  {
    "className": "Converters",
    "categoryName": "Position Converters",
    "distribution": [
      "2",
      "10",
      "30",
      "100",
      "600"
    ]
  },
  {
    "className": "Crystals/Resonators",
    "categoryName": "Ceramic Resonators",
    "distribution": [
      "11",
      "100",
      "500",
      "2000",
      "12000"
    ]
  },
  {
    "className": "Crystals/Resonators",
    "categoryName": "Quartz Crystals",
    "distribution": [
      "10",
      "50",
      "250",
      "1000",
      "12000"
    ]
  },
  {
    "className": "Diodes",
    "categoryName": "Bridge Rectifier Diodes",
    "distribution": [
      "10",
      "100",
      "500",
      "1500",
      "24000"
    ]
  },
  {
    "className": "Diodes",
    "categoryName": "Current Regulator Diodes",
    "distribution": [
      "10",
      "51",
      "201",
      "750",
      "3900"
    ]
  },
  {
    "className": "Diodes",
    "categoryName": "Microwave Mixer Diodes",
    "distribution": [
      "7",
      "50",
      "200",
      "1400",
      "24000"
    ]
  },
  {
    "className": "Diodes",
    "categoryName": "Microwave Special Purpose Diodes",
    "distribution": [
      "20",
      "40",
      "100",
      "200",
      "500"
    ]
  },
  {
    "className": "Diodes",
    "categoryName": "Other Diodes",
    "distribution": [
      "5",
      "50",
      "260",
      "2515",
      "36900"
    ]
  },
  {
    "className": "Diodes",
    "categoryName": "PIN Diodes",
    "distribution": [
      "7.85",
      "50",
      "300",
      "1800",
      "35490"
    ]
  },
  {
    "className": "Diodes",
    "categoryName": "Rectifier Diodes",
    "distribution": [
      "10",
      "75",
      "400",
      "2000",
      "28000"
    ]
  },
  {
    "className": "Diodes",
    "categoryName": "Signal Diodes",
    "distribution": [
      "10",
      "75",
      "375",
      "2000",
      "20000"
    ]
  },
  {
    "className": "Diodes",
    "categoryName": "Transient Suppressors",
    "distribution": [
      "10",
      "75",
      "400",
      "2000",
      "19323.2"
    ]
  },
  {
    "className": "Diodes",
    "categoryName": "Varactors",
    "distribution": [
      "10",
      "50",
      "240",
      "1040",
      "26330.6"
    ]
  },
  {
    "className": "Diodes",
    "categoryName": "Voltage Regulator Diodes",
    "distribution": [
      "9",
      "70",
      "282.5",
      "1000",
      "10341.25"
    ]
  },
  {
    "className": "Diodes",
    "categoryName": "Zener Diodes",
    "distribution": [
      "6",
      "50",
      "250",
      "1348",
      "20000"
    ]
  },
  {
    "className": "Drivers And Interfaces",
    "categoryName": "Bus Terminators",
    "distribution": [
      "5",
      "25",
      "90",
      "300",
      "4194.6"
    ]
  },
  {
    "className": "Drivers And Interfaces",
    "categoryName": "Display Drivers",
    "distribution": [
      "10",
      "75",
      "300",
      "1500",
      "20000"
    ]
  },
  {
    "className": "Drivers And Interfaces",
    "categoryName": "Level Translators",
    "distribution": [
      "4",
      "24",
      "75",
      "300",
      "1500"
    ]
  },
  {
    "className": "Drivers And Interfaces",
    "categoryName": "Line Driver or Receivers",
    "distribution": [
      "5",
      "25",
      "100",
      "500",
      "5000"
    ]
  },
  {
    "className": "Drivers And Interfaces",
    "categoryName": "MOSFET Drivers",
    "distribution": [
      "5",
      "31",
      "120",
      "600",
      "10000"
    ]
  },
  {
    "className": "Drivers And Interfaces",
    "categoryName": "Other Interface ICs",
    "distribution": [
      "5",
      "45",
      "180",
      "916",
      "10000"
    ]
  },
  {
    "className": "Drivers And Interfaces",
    "categoryName": "Peripheral Drivers",
    "distribution": [
      "10",
      "72",
      "350",
      "1857.5",
      "26000"
    ]
  },
  {
    "className": "Fiber Optics",
    "categoryName": "Fiber Optic Detectors",
    "distribution": [
      "24",
      "100",
      "200",
      "251.25",
      "625"
    ]
  },
  {
    "className": "Fiber Optics",
    "categoryName": "Fiber Optic Emitters",
    "distribution": [
      "1",
      "3.75",
      "8",
      "15",
      "1000"
    ]
  },
  {
    "className": "Fiber Optics",
    "categoryName": "Fiber Optic Receivers",
    "distribution": [
      "3",
      "12",
      "42",
      "186",
      "1000"
    ]
  },
  {
    "className": "Fiber Optics",
    "categoryName": "Fiber Optic Transceivers",
    "distribution": [
      "2",
      "15",
      "50",
      "120",
      "1188"
    ]
  },
  {
    "className": "Fiber Optics",
    "categoryName": "Fiber Optic Transmitters",
    "distribution": [
      "3",
      "12",
      "40",
      "148.5",
      "1049"
    ]
  },
  {
    "className": "Fiber Optics",
    "categoryName": "Other Fiber Optics",
    "distribution": [
      "5",
      "20",
      "40",
      "125",
      "557.5"
    ]
  },
  {
    "className": "Filters",
    "categoryName": "Active Filters",
    "distribution": [
      "8.1",
      "45",
      "100",
      "435",
      "2576"
    ]
  },
  {
    "className": "Filters",
    "categoryName": "Ceramic Filters",
    "distribution": [
      "5",
      "20",
      "50",
      "200",
      "1800"
    ]
  },
  {
    "className": "Filters",
    "categoryName": "Crystal Filters",
    "distribution": [
      "8.6",
      "50",
      "145",
      "250",
      "1000"
    ]
  },
  {
    "className": "Filters",
    "categoryName": "Data Line Filters",
    "distribution": [
      "10",
      "84",
      "450",
      "2500",
      "30000"
    ]
  },
  {
    "className": "Filters",
    "categoryName": "Duplexers",
    "distribution": [
      "10",
      "80",
      "375",
      "5000",
      "350000"
    ]
  },
  {
    "className": "Filters",
    "categoryName": "General Purpose Passive Filters",
    "distribution": [
      "4",
      "20",
      "50",
      "200",
      "2000"
    ]
  },
  {
    "className": "Filters",
    "categoryName": "Mains Filters",
    "distribution": [
      "3",
      "20",
      "81",
      "400",
      "5000"
    ]
  },
  {
    "className": "Filters",
    "categoryName": "Other Passive Filters",
    "distribution": [
      "3",
      "25",
      "294",
      "2000",
      "26123.3"
    ]
  },
  {
    "className": "Filters",
    "categoryName": "SAW Filters",
    "distribution": [
      "10",
      "50",
      "250",
      "1500",
      "17920"
    ]
  },
  {
    "className": "Filters",
    "categoryName": "Telecom Filters",
    "distribution": [
      "10",
      "30.75",
      "100",
      "600",
      "18500"
    ]
  },
  {
    "className": "Inductors",
    "categoryName": "Fixed Inductors",
    "distribution": [
      "6",
      "50",
      "200",
      "1000",
      "11000"
    ]
  },
  {
    "className": "Inductors",
    "categoryName": "Variable Inductors",
    "distribution": [
      "5",
      "139",
      "1675",
      "8500",
      "40250"
    ]
  },
  {
    "className": "Logic ICs",
    "categoryName": "Arithmetic Circuits",
    "distribution": [
      "1",
      "5",
      "12",
      "96",
      "2559.2"
    ]
  },
  {
    "className": "Logic ICs",
    "categoryName": "Bus Driver/Transceivers",
    "distribution": [
      "5",
      "30.5",
      "150",
      "648",
      "6000"
    ]
  },
  {
    "className": "Logic ICs",
    "categoryName": "Clock Drivers",
    "distribution": [
      "4",
      "20",
      "50",
      "200",
      "1420"
    ]
  },
  {
    "className": "Logic ICs",
    "categoryName": "Counters",
    "distribution": [
      "4",
      "20",
      "100",
      "400",
      "2000"
    ]
  },
  {
    "className": "Logic ICs",
    "categoryName": "Decoder/Drivers",
    "distribution": [
      "5",
      "31",
      "150",
      "600",
      "3360"
    ]
  },
  {
    "className": "Logic ICs",
    "categoryName": "Delay Lines",
    "distribution": [
      "4",
      "20",
      "75",
      "250",
      "2000"
    ]
  },
  {
    "className": "Logic ICs",
    "categoryName": "FF/Latches",
    "distribution": [
      "5",
      "24",
      "100",
      "500",
      "8000"
    ]
  },
  {
    "className": "Logic ICs",
    "categoryName": "Gates",
    "distribution": [
      "5",
      "30",
      "150",
      "700",
      "8000"
    ]
  },
  {
    "className": "Logic ICs",
    "categoryName": "Multiplexer/Demultiplexers",
    "distribution": [
      "5",
      "24",
      "100",
      "500",
      "4000"
    ]
  },
  {
    "className": "Logic ICs",
    "categoryName": "Other Logic ICs",
    "distribution": [
      "6",
      "50",
      "192",
      "800",
      "6000"
    ]
  },
  {
    "className": "Logic ICs",
    "categoryName": "Prescaler/Multivibrators",
    "distribution": [
      "3",
      "20",
      "100",
      "500",
      "5400"
    ]
  },
  {
    "className": "Logic ICs",
    "categoryName": "Shift Registers",
    "distribution": [
      "10",
      "60",
      "294",
      "1000",
      "6000"
    ]
  },
  {
    "className": "Memory ICs",
    "categoryName": "DRAMs",
    "distribution": [
      "10",
      "60",
      "250",
      "1000",
      "10000"
    ]
  },
  {
    "className": "Memory ICs",
    "categoryName": "EEPROMs",
    "distribution": [
      "5",
      "25",
      "100",
      "500",
      "6000"
    ]
  },
  {
    "className": "Memory ICs",
    "categoryName": "EPROMs",
    "distribution": [
      "5",
      "25.5",
      "80",
      "200",
      "875"
    ]
  },
  {
    "className": "Memory ICs",
    "categoryName": "FIFOs",
    "distribution": [
      "4",
      "12",
      "50",
      "200",
      "2250"
    ]
  },
  {
    "className": "Memory ICs",
    "categoryName": "Flash Memories",
    "distribution": [
      "5",
      "25",
      "100",
      "500",
      "6000"
    ]
  },
  {
    "className": "Memory ICs",
    "categoryName": "Other Memory ICs",
    "distribution": [
      "7",
      "50",
      "150",
      "1000",
      "10000"
    ]
  },
  {
    "className": "Memory ICs",
    "categoryName": "OTP ROMs",
    "distribution": [
      "2.55",
      "14",
      "60",
      "200",
      "1199.55"
    ]
  },
  {
    "className": "Memory ICs",
    "categoryName": "SRAMs",
    "distribution": [
      "5",
      "25",
      "100",
      "376",
      "4000"
    ]
  },
  {
    "className": "Microcontrollers and Processors",
    "categoryName": "Bus Controllers",
    "distribution": [
      "5",
      "25",
      "100",
      "300",
      "3000"
    ]
  },
  {
    "className": "Microcontrollers and Processors",
    "categoryName": "Clock Generators",
    "distribution": [
      "5",
      "20",
      "81",
      "250",
      "1500"
    ]
  },
  {
    "className": "Microcontrollers and Processors",
    "categoryName": "Digital Signal Processors",
    "distribution": [
      "5",
      "16",
      "50",
      "250",
      "2000"
    ]
  },
  {
    "className": "Microcontrollers and Processors",
    "categoryName": "Display Controllers",
    "distribution": [
      "23",
      "100",
      "270",
      "500",
      "1880"
    ]
  },
  {
    "className": "Microcontrollers and Processors",
    "categoryName": "DSP Peripherals",
    "distribution": [
      "5",
      "30",
      "100",
      "400",
      "1500"
    ]
  },
  {
    "className": "Microcontrollers and Processors",
    "categoryName": "Interrupt Controllers",
    "distribution": [
      "5",
      "5",
      "50",
      "100",
      "1000"
    ]
  },
  {
    "className": "Microcontrollers and Processors",
    "categoryName": "Math Processors",
    "distribution": [
      "1",
      "3",
      "5",
      "5",
      "76"
    ]
  },
  {
    "className": "Microcontrollers and Processors",
    "categoryName": "Microcontrollers",
    "distribution": [
      "6",
      "50",
      "250",
      "1100",
      "15000"
    ]
  },
  {
    "className": "Microcontrollers and Processors",
    "categoryName": "Microprocessors",
    "distribution": [
      "5",
      "25",
      "100",
      "500",
      "9672"
    ]
  },
  {
    "className": "Microcontrollers and Processors",
    "categoryName": "Multifunction Peripherals",
    "distribution": [
      "7.95",
      "50",
      "250",
      "1000",
      "5487"
    ]
  },
  {
    "className": "Microcontrollers and Processors",
    "categoryName": "Other uPs/uCs/Peripheral ICs",
    "distribution": [
      "5",
      "25",
      "108",
      "560",
      "10000"
    ]
  },
  {
    "className": "Microcontrollers and Processors",
    "categoryName": "Parallel IO Ports",
    "distribution": [
      "7",
      "50",
      "200",
      "904",
      "10000"
    ]
  },
  {
    "className": "Microcontrollers and Processors",
    "categoryName": "Secondary Storage Controllers",
    "distribution": [
      "10",
      "49.5",
      "100",
      "500",
      "7800"
    ]
  },
  {
    "className": "Microcontrollers and Processors",
    "categoryName": "Serial IO/Communication Controllers",
    "distribution": [
      "5",
      "25",
      "100",
      "500",
      "5000"
    ]
  },
  {
    "className": "Microcontrollers and Processors",
    "categoryName": "Timers or RTCs",
    "distribution": [
      "5",
      "30",
      "104",
      "500",
      "7500"
    ]
  },
  {
    "className": "Optoelectronics",
    "categoryName": "Displays",
    "distribution": [
      "14.7",
      "150",
      "500",
      "1990",
      "36000"
    ]
  },
  {
    "className": "Optoelectronics",
    "categoryName": "Infrared LEDs",
    "distribution": [
      "20",
      "120",
      "500",
      "3000",
      "100000"
    ]
  },
  {
    "className": "Optoelectronics",
    "categoryName": "LCD Displays",
    "distribution": [
      "1",
      "1",
      "11",
      "200",
      "2800"
    ]
  },
  {
    "className": "Optoelectronics",
    "categoryName": "LED Displays",
    "distribution": [
      "5.65",
      "30",
      "172.5",
      "1000",
      "9063"
    ]
  },
  {
    "className": "Optoelectronics",
    "categoryName": "Optical Position Encoders",
    "distribution": [
      "6",
      "60",
      "250",
      "900",
      "10000"
    ]
  },
  {
    "className": "Optoelectronics",
    "categoryName": "Optocoupler",
    "distribution": [
      "6",
      "60",
      "260",
      "1340",
      "13341.3"
    ]
  },
  {
    "className": "Optoelectronics",
    "categoryName": "Optoelectronic Accessories",
    "distribution": [
      "6",
      "50",
      "250",
      "1050",
      "12000"
    ]
  },
  {
    "className": "Optoelectronics",
    "categoryName": "Other Optoelectronics",
    "distribution": [
      "6",
      "40",
      "200",
      "1000",
      "9070"
    ]
  },
  {
    "className": "Optoelectronics",
    "categoryName": "Photo Diodes",
    "distribution": [
      "16",
      "130",
      "2000",
      "10000",
      "83750"
    ]
  },
  {
    "className": "Optoelectronics",
    "categoryName": "Photo ICs",
    "distribution": [
      "25",
      "125",
      "600",
      "3000",
      "42000"
    ]
  },
  {
    "className": "Optoelectronics",
    "categoryName": "Photo Transistors",
    "distribution": [
      "20",
      "100",
      "500",
      "3500",
      "39200"
    ]
  },
  {
    "className": "Optoelectronics",
    "categoryName": "Photovoltaic Cells",
    "distribution": [
      "13",
      "100",
      "500",
      "2000",
      "20500"
    ]
  },
  {
    "className": "Optoelectronics",
    "categoryName": "Slotted Switch",
    "distribution": [
      "10",
      "80",
      "404.5",
      "1500",
      "12000"
    ]
  },
  {
    "className": "Optoelectronics",
    "categoryName": "Solid State Relays",
    "distribution": [
      "6",
      "50",
      "200",
      "888",
      "10235"
    ]
  },
  {
    "className": "Optoelectronics",
    "categoryName": "Visible LEDs",
    "distribution": [
      "8",
      "50",
      "250",
      "1500",
      "20000"
    ]
  },
  {
    "className": "Oscillators",
    "categoryName": "Fixed Clock SAW Oscillators",
    "distribution": [
      "3.4",
      "13",
      "30",
      "48",
      "537.6"
    ]
  },
  {
    "className": "Oscillators",
    "categoryName": "OCVCXO",
    "distribution": [
      "2.15",
      "10",
      "27.5",
      "75",
      "246.25"
    ]
  },
  {
    "className": "Oscillators",
    "categoryName": "Other Oscillators",
    "distribution": [
      "2",
      "18",
      "70",
      "250",
      "1509.75"
    ]
  },
  {
    "className": "Oscillators",
    "categoryName": "TCVCXO",
    "distribution": [
      "3",
      "5",
      "12",
      "50",
      "5000"
    ]
  },
  {
    "className": "Oscillators",
    "categoryName": "TCXO",
    "distribution": [
      "3",
      "12",
      "50",
      "250",
      "8000"
    ]
  },
  {
    "className": "Oscillators",
    "categoryName": "VCXO",
    "distribution": [
      "5",
      "16",
      "50",
      "200",
      "735"
    ]
  },
  {
    "className": "Oscillators",
    "categoryName": "Voltage Controlled Oscillators",
    "distribution": [
      "5",
      "25",
      "100",
      "500",
      "4000"
    ]
  },
  {
    "className": "Oscillators",
    "categoryName": "XO",
    "distribution": [
      "4",
      "20",
      "75",
      "300",
      "4000"
    ]
  },
  {
    "className": "Power Circuits",
    "categoryName": "Linear Regulator ICs",
    "distribution": [
      "5",
      "30",
      "125",
      "676",
      "10000"
    ]
  },
  {
    "className": "Power Circuits",
    "categoryName": "Other Regulators",
    "distribution": [
      "5",
      "25",
      "100",
      "500",
      "3000"
    ]
  },
  {
    "className": "Power Circuits",
    "categoryName": "Power Management Circuits",
    "distribution": [
      "5",
      "30",
      "150",
      "780",
      "8000"
    ]
  },
  {
    "className": "Power Circuits",
    "categoryName": "Power Supply Modules",
    "distribution": [
      "3",
      "16",
      "60",
      "250",
      "2000"
    ]
  },
  {
    "className": "Power Circuits",
    "categoryName": "Switching Regulator or Controllers",
    "distribution": [
      "5",
      "34",
      "150",
      "900",
      "10000"
    ]
  },
  {
    "className": "Power Circuits",
    "categoryName": "Voltage References",
    "distribution": [
      "5",
      "25",
      "100",
      "503.25",
      "5639.6"
    ]
  },
  {
    "className": "Programmable Logic",
    "categoryName": "Field Programmable Gate Arrays",
    "distribution": [
      "4",
      "20",
      "60",
      "268.25",
      "2500"
    ]
  },
  {
    "className": "Programmable Logic",
    "categoryName": "Programmable Logic Devices",
    "distribution": [
      "4",
      "18",
      "55",
      "245",
      "1800"
    ]
  },
  {
    "className": "RC Networks",
    "categoryName": "Resistor/Capacitor Networks",
    "distribution": [
      "5",
      "115",
      "399",
      "800",
      "5500"
    ]
  },
  {
    "className": "Relays",
    "categoryName": "Other Relays",
    "distribution": [
      "4",
      "40",
      "200",
      "800",
      "18880"
    ]
  },
  {
    "className": "Relays",
    "categoryName": "Power/Signal Relays",
    "distribution": [
      "6",
      "50",
      "250",
      "1200",
      "14000"
    ]
  },
  {
    "className": "Relays",
    "categoryName": "Reed Relays",
    "distribution": [
      "5.5",
      "40",
      "156",
      "430",
      "3000"
    ]
  },
  {
    "className": "Relays",
    "categoryName": "RF Relays",
    "distribution": [
      "5",
      "25.75",
      "200",
      "992",
      "10000"
    ]
  },
  {
    "className": "Relays",
    "categoryName": "Special Relays",
    "distribution": [
      "1",
      "7",
      "61.5",
      "150",
      "750.45"
    ]
  },
  {
    "className": "Relays",
    "categoryName": "Time Delay Relays",
    "distribution": [
      "1.8",
      "5",
      "10",
      "50",
      "200"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Array/Network Resistors",
    "distribution": [
      "6",
      "50",
      "250",
      "1101",
      "10400"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Carbon Film Resistors",
    "distribution": [
      "6",
      "30",
      "100",
      "500",
      "4250"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Fixed Resistors",
    "distribution": [
      "10",
      "67",
      "350",
      "2000",
      "25000"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Fusible Resistors",
    "distribution": [
      "25.7",
      "200",
      "1500",
      "10000",
      "116000"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Jumper",
    "distribution": [
      "5",
      "70",
      "300",
      "1500",
      "15000"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Metal Film Resistors",
    "distribution": [
      "3",
      "13",
      "50",
      "225",
      "2000"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Metal Foil Resistors",
    "distribution": [
      "4",
      "20",
      "100",
      "566",
      "4345"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Metal Glaze/Thick Film Resistors",
    "distribution": [
      "6",
      "40",
      "144",
      "568.5",
      "5491.75"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Metal Oxide Film Resistors",
    "distribution": [
      "6.3",
      "32.5",
      "150",
      "465",
      "1980"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Metal Strip Resistor",
    "distribution": [
      "7",
      "50",
      "171",
      "800",
      "8800"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Non-linear Resistors",
    "distribution": [
      "9",
      "50",
      "250",
      "1485",
      "18401.1"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Potentiometers",
    "distribution": [
      "4",
      "21",
      "200",
      "500",
      "6000"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Temperature Dependent Resistors (NTC/PTC)",
    "distribution": [
      "8",
      "50",
      "250",
      "1097",
      "15000"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Thin Film Resistors",
    "distribution": [
      "5",
      "30",
      "120",
      "540",
      "5600"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Trimmer Potentiometers",
    "distribution": [
      "2",
      "15",
      "77.5",
      "247.5",
      "1520"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Variable Resistors",
    "distribution": [
      "5",
      "26",
      "100",
      "474",
      "3000"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Varistor",
    "distribution": [
      "10",
      "100",
      "500",
      "2100",
      "47550"
    ]
  },
  {
    "className": "Resistors",
    "categoryName": "Wire Wound Resistors",
    "distribution": [
      "3",
      "15",
      "63",
      "300",
      "3000"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "Noise Generators",
    "distribution": [
      "5",
      "10",
      "29",
      "62.5",
      "107.5"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "RF/Microwave Amplifiers",
    "distribution": [
      "5",
      "24",
      "96",
      "375",
      "3120"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "RF/Microwave Antennas",
    "distribution": [
      "25",
      "300",
      "2450",
      "10000",
      "60000"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "RF/Microwave Attenuators",
    "distribution": [
      "4",
      "20",
      "80",
      "284.5",
      "3000"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "RF/Microwave Couplers",
    "distribution": [
      "5",
      "20",
      "60",
      "250",
      "3012.75"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "RF/Microwave DC Blocks",
    "distribution": [
      "5",
      "20",
      "50",
      "150",
      "1200"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "RF/Microwave Detectors",
    "distribution": [
      "5",
      "24.5",
      "200",
      "800",
      "2014.7"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "RF/Microwave Frequency Multipliers",
    "distribution": [
      "4",
      "10",
      "32",
      "100",
      "400"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "RF/Microwave Limiters",
    "distribution": [
      "9",
      "40",
      "104.5",
      "400",
      "2000"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "RF/Microwave Mixers",
    "distribution": [
      "4",
      "12",
      "50",
      "199.25",
      "1000"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "RF/Microwave Modulator/Demodulators",
    "distribution": [
      "5",
      "44",
      "150",
      "337.5",
      "1000"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "RF/Microwave Phase Shifters",
    "distribution": [
      "1",
      "12.75",
      "27",
      "52.5",
      "882.45"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "RF/Microwave Splitter/Combiners",
    "distribution": [
      "4",
      "15",
      "50",
      "200",
      "2800"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "RF/Microwave Switches",
    "distribution": [
      "6",
      "48",
      "200",
      "880",
      "8000"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "RF/Microwave Terminations",
    "distribution": [
      "2",
      "25",
      "100",
      "531.5",
      "8000"
    ]
  },
  {
    "className": "RF and Microwave",
    "categoryName": "RF/Microwave Up/Down Converters",
    "distribution": [
      "10",
      "72.5",
      "350",
      "2000",
      "10260"
    ]
  },
  {
    "className": "Sensors/Transducers",
    "categoryName": "Image Sensors",
    "distribution": [
      "10",
      "50",
      "250",
      "1000",
      "2500"
    ]
  },
  {
    "className": "Sensors/Transducers",
    "categoryName": "Infrared Sensors",
    "distribution": [
      "1",
      "60",
      "273",
      "2400",
      "9580"
    ]
  },
  {
    "className": "Sensors/Transducers",
    "categoryName": "Linear Position Sensors",
    "distribution": [
      "6",
      "120",
      "600",
      "5000",
      "42500"
    ]
  },
  {
    "className": "Sensors/Transducers",
    "categoryName": "Magnetic Field Sensors",
    "distribution": [
      "6",
      "50",
      "300",
      "2000",
      "50100"
    ]
  },
  {
    "className": "Sensors/Transducers",
    "categoryName": "Other Sensors/Transducers",
    "distribution": [
      "3",
      "20",
      "120",
      "1000",
      "21500"
    ]
  },
  {
    "className": "Sensors/Transducers",
    "categoryName": "Pressure Sensors",
    "distribution": [
      "5",
      "50",
      "236",
      "1000",
      "15300"
    ]
  },
  {
    "className": "Sensors/Transducers",
    "categoryName": "Proximity Sensors",
    "distribution": [
      "30",
      "300",
      "1500",
      "10000",
      "50000"
    ]
  },
  {
    "className": "Sensors/Transducers",
    "categoryName": "Rotary Position Sensors",
    "distribution": [
      "30",
      "250",
      "800",
      "2400",
      "18800"
    ]
  },
  {
    "className": "Sensors/Transducers",
    "categoryName": "RTD Sensors",
    "distribution": [
      "12.75",
      "100",
      "350",
      "1125",
      "5000"
    ]
  },
  {
    "className": "Sensors/Transducers",
    "categoryName": "Temperature Sensors",
    "distribution": [
      "5",
      "25",
      "100",
      "500",
      "5520"
    ]
  },
  {
    "className": "Signal Circuits",
    "categoryName": "Analog Computational Functions",
    "distribution": [
      "4",
      "23.25",
      "100",
      "400",
      "7275"
    ]
  },
  {
    "className": "Signal Circuits",
    "categoryName": "Analog Waveform Generation Functions",
    "distribution": [
      "5",
      "28",
      "100",
      "500",
      "7350"
    ]
  },
  {
    "className": "Signal Circuits",
    "categoryName": "Motion Control Electronics",
    "distribution": [
      "6",
      "50",
      "250",
      "1000",
      "13000"
    ]
  },
  {
    "className": "Signal Circuits",
    "categoryName": "Multiplexers or Switches",
    "distribution": [
      "6",
      "50",
      "200",
      "900",
      "10000"
    ]
  },
  {
    "className": "Signal Circuits",
    "categoryName": "Other Analog ICs",
    "distribution": [
      "5",
      "36",
      "156",
      "1000",
      "10000"
    ]
  },
  {
    "className": "Signal Circuits",
    "categoryName": "PLL or Frequency Synthesis Circuits",
    "distribution": [
      "5",
      "20",
      "75",
      "250",
      "2000"
    ]
  },
  {
    "className": "Sockets",
    "categoryName": "Sockets and Chip Carriers",
    "distribution": [
      "3",
      "10",
      "50",
      "200",
      "2000"
    ]
  },
  {
    "className": "Switches",
    "categoryName": "DIP Switches",
    "distribution": [
      "5",
      "25",
      "100",
      "500",
      "5000"
    ]
  },
  {
    "className": "Switches",
    "categoryName": "Keypad Switches",
    "distribution": [
      "7",
      "50",
      "250",
      "1500",
      "18445.5"
    ]
  },
  {
    "className": "Switches",
    "categoryName": "Other Switches",
    "distribution": [
      "10",
      "86.25",
      "308",
      "1700",
      "20650"
    ]
  },
  {
    "className": "Switches",
    "categoryName": "Pushbutton Switches",
    "distribution": [
      "4",
      "24",
      "110",
      "600",
      "6000"
    ]
  },
  {
    "className": "Switches",
    "categoryName": "Reed Switches",
    "distribution": [
      "48.3",
      "200",
      "600",
      "2125",
      "14625"
    ]
  },
  {
    "className": "Switches",
    "categoryName": "Rocker Switches",
    "distribution": [
      "4.2",
      "25",
      "100",
      "500",
      "2998.2"
    ]
  },
  {
    "className": "Switches",
    "categoryName": "Rotary Switches",
    "distribution": [
      "8",
      "42",
      "150",
      "600",
      "5000"
    ]
  },
  {
    "className": "Switches",
    "categoryName": "Slide Switches",
    "distribution": [
      "10",
      "50",
      "222",
      "1000",
      "10000"
    ]
  },
  {
    "className": "Switches",
    "categoryName": "Snap Acting/Limit Switches",
    "distribution": [
      "5",
      "50",
      "450",
      "2009",
      "50000"
    ]
  },
  {
    "className": "Switches",
    "categoryName": "Special Switches",
    "distribution": [
      "4",
      "25",
      "125",
      "750",
      "3424.9"
    ]
  },
  {
    "className": "Switches",
    "categoryName": "Thumb/Pushwheel Switches",
    "distribution": [
      "10",
      "25.5",
      "52",
      "100",
      "225"
    ]
  },
  {
    "className": "Switches",
    "categoryName": "Toggle Switches",
    "distribution": [
      "4",
      "20",
      "90",
      "300",
      "2500"
    ]
  },
  {
    "className": "Telecommunication Circuits",
    "categoryName": "Analog Transmission Interfaces",
    "distribution": [
      "5.6",
      "40",
      "100",
      "300",
      "4000"
    ]
  },
  {
    "className": "Telecommunication Circuits",
    "categoryName": "ATM/SONET/SDH ICs",
    "distribution": [
      "4",
      "10",
      "50",
      "300",
      "1000"
    ]
  },
  {
    "className": "Telecommunication Circuits",
    "categoryName": "Cellular Telephone Circuits",
    "distribution": [
      "9.7",
      "50",
      "200",
      "945.5",
      "8000"
    ]
  },
  {
    "className": "Telecommunication Circuits",
    "categoryName": "Codecs",
    "distribution": [
      "10",
      "50",
      "200",
      "1000",
      "14625"
    ]
  },
  {
    "className": "Telecommunication Circuits",
    "categoryName": "Digital Transmission Controllers",
    "distribution": [
      "22",
      "60",
      "200",
      "445",
      "1452"
    ]
  },
  {
    "className": "Telecommunication Circuits",
    "categoryName": "Digital Transmission Interfaces",
    "distribution": [
      "5",
      "11",
      "50",
      "260",
      "1660"
    ]
  },
  {
    "className": "Telecommunication Circuits",
    "categoryName": "Modems",
    "distribution": [
      "50",
      "204",
      "900",
      "3000",
      "15400"
    ]
  },
  {
    "className": "Telecommunication Circuits",
    "categoryName": "Network Interfaces",
    "distribution": [
      "5",
      "31",
      "150",
      "800",
      "10000"
    ]
  },
  {
    "className": "Telecommunication Circuits",
    "categoryName": "Other Telecom ICs",
    "distribution": [
      "8",
      "50",
      "288",
      "1500",
      "20000"
    ]
  },
  {
    "className": "Telecommunication Circuits",
    "categoryName": "Telecom Protection Circuits",
    "distribution": [
      "10",
      "84.25",
      "500",
      "2000",
      "20000"
    ]
  },
  {
    "className": "Telecommunication Circuits",
    "categoryName": "Telecom Signaling Circuits",
    "distribution": [
      "6",
      "92",
      "300",
      "750",
      "18250"
    ]
  },
  {
    "className": "Telecommunication Circuits",
    "categoryName": "Telecom Switching Circuits",
    "distribution": [
      "2",
      "10",
      "200",
      "485",
      "757.5"
    ]
  },
  {
    "className": "Telecommunication Circuits",
    "categoryName": "Telephone Circuits",
    "distribution": [
      "600",
      "8000",
      "12500",
      "20000",
      "25000"
    ]
  },
  {
    "className": "Terminal Blocks",
    "categoryName": "Terminals and Terminal Blocks",
    "distribution": [
      "5",
      "50",
      "200",
      "1010",
      "14400"
    ]
  },
  {
    "className": "Thermal Support Devices",
    "categoryName": "Fans/Blowers",
    "distribution": [
      "5",
      "50",
      "120",
      "500",
      "3500"
    ]
  },
  {
    "className": "Thermal Support Devices",
    "categoryName": "Heat Sinks",
    "distribution": [
      "5",
      "30",
      "100",
      "500",
      "4500"
    ]
  },
  {
    "className": "Transformers",
    "categoryName": "Audio Transformers",
    "distribution": [
      "4",
      "47.5",
      "200",
      "900",
      "9483.2"
    ]
  },
  {
    "className": "Transformers",
    "categoryName": "Auto Transformers",
    "distribution": [
      "1",
      "10",
      "50",
      "425",
      "10000"
    ]
  },
  {
    "className": "Transformers",
    "categoryName": "Current Sense Transformers",
    "distribution": [
      "6.3",
      "50",
      "300",
      "1849.5",
      "12000"
    ]
  },
  {
    "className": "Transformers",
    "categoryName": "Current Transformers",
    "distribution": [
      "5",
      "25",
      "450",
      "625",
      "2395"
    ]
  },
  {
    "className": "Transformers",
    "categoryName": "Inverter Transformers",
    "distribution": [
      "1",
      "2.75",
      "50",
      "425",
      "4650"
    ]
  },
  {
    "className": "Transformers",
    "categoryName": "Other Transformers",
    "distribution": [
      "5",
      "40",
      "192",
      "500",
      "1500"
    ]
  },
  {
    "className": "Transformers",
    "categoryName": "Power/Mains Transformers",
    "distribution": [
      "6",
      "50",
      "200",
      "1000",
      "8000"
    ]
  },
  {
    "className": "Transformers",
    "categoryName": "Pulse/Datacom Transformers",
    "distribution": [
      "5",
      "25",
      "100",
      "500",
      "4400"
    ]
  },
  {
    "className": "Transformers",
    "categoryName": "RF Transformers",
    "distribution": [
      "8",
      "40",
      "140",
      "600",
      "8000"
    ]
  },
  {
    "className": "Transformers",
    "categoryName": "SMPS Transformers",
    "distribution": [
      "8",
      "65.75",
      "250",
      "1000",
      "5000"
    ]
  },
  {
    "className": "Transformers",
    "categoryName": "Telecom Transformers",
    "distribution": [
      "3",
      "26.5",
      "145",
      "918",
      "15000"
    ]
  },
  {
    "className": "Transformers",
    "categoryName": "Variacs",
    "distribution": [
      "14.05",
      "70",
      "200",
      "750",
      "5000"
    ]
  },
  {
    "className": "Transistors",
    "categoryName": "IGBTs",
    "distribution": [
      "10",
      "100",
      "300",
      "1960",
      "24000"
    ]
  },
  {
    "className": "Transistors",
    "categoryName": "Other Transistors",
    "distribution": [
      "5",
      "40",
      "240",
      "1500",
      "15000"
    ]
  },
  {
    "className": "Transistors",
    "categoryName": "Power Bipolar Transistors",
    "distribution": [
      "6",
      "50",
      "250",
      "1000",
      "10000"
    ]
  },
  {
    "className": "Transistors",
    "categoryName": "Power Field-Effect Transistors",
    "distribution": [
      "10",
      "60",
      "300",
      "1475",
      "17500"
    ]
  },
  {
    "className": "Transistors",
    "categoryName": "RF Power Bipolar Transistors",
    "distribution": [
      "1.75",
      "20",
      "50",
      "182",
      "646"
    ]
  },
  {
    "className": "Transistors",
    "categoryName": "RF Power Field-Effect Transistors",
    "distribution": [
      "3.8",
      "50",
      "120",
      "500",
      "6345.6"
    ]
  },
  {
    "className": "Transistors",
    "categoryName": "RF Small Signal Bipolar Transistors",
    "distribution": [
      "10",
      "50",
      "400",
      "2400",
      "29700"
    ]
  },
  {
    "className": "Transistors",
    "categoryName": "RF Small Signal Field-Effect Transistors",
    "distribution": [
      "10",
      "100",
      "500",
      "2000",
      "40545"
    ]
  },
  {
    "className": "Transistors",
    "categoryName": "Small Signal Bipolar Transistors",
    "distribution": [
      "10",
      "80",
      "400",
      "2025",
      "25000"
    ]
  },
  {
    "className": "Transistors",
    "categoryName": "Small Signal Field-Effect Transistors",
    "distribution": [
      "10",
      "100",
      "500",
      "2990",
      "35000"
    ]
  },
  {
    "className": "Trigger Devices",
    "categoryName": "Other Trigger Devices",
    "distribution": [
      "50",
      "120",
      "300",
      "650",
      "1100"
    ]
  },
  {
    "className": "Trigger Devices",
    "categoryName": "SIDACs",
    "distribution": [
      "11.1",
      "31.5",
      "150",
      "1000",
      "14500"
    ]
  },
  {
    "className": "Trigger Devices",
    "categoryName": "Silicon Controlled Rectifiers",
    "distribution": [
      "10",
      "100",
      "432",
      "2000",
      "20000"
    ]
  },
  {
    "className": "Trigger Devices",
    "categoryName": "Silicon Surge Protectors",
    "distribution": [
      "10",
      "100",
      "500",
      "1800",
      "13212"
    ]
  },
  {
    "className": "Trigger Devices",
    "categoryName": "TRIACs",
    "distribution": [
      "10",
      "100",
      "500",
      "2992",
      "25000"
    ]
  }
]
