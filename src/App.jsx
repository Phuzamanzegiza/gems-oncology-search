import { useState, useMemo, useRef, useEffect } from "react";

const DRUGS = [
  // B02 - ANTIHEMORRHAGICS
  {atc:"B02BX05",desc:"Eltrombopag",nappi:"3000171",name:"REVOLADE",strength:"25MG",form:"TAB",pack:28,bio:"",category:"ANTIHEMORRHAGICS"},
  {atc:"B02BX05",desc:"Eltrombopag",nappi:"3000172",name:"REVOLADE",strength:"50MG",form:"TAB",pack:28,bio:"",category:"ANTIHEMORRHAGICS"},
  // L01 - ANTINEOPLASTIC AGENTS
  {atc:"L01AD02",desc:"Lomustine",nappi:"3009439",name:"CECENU (SECTION 21)",strength:"40MG",form:"CAP",pack:120,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01BC07",desc:"Azacitidine",nappi:"3002433",name:"AZACITIDINE DRL POWDER FOR INJECTION VIAL",strength:"100MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01BC07",desc:"Azacitidine",nappi:"3009613",name:"AZACITIDINE EUROLAB POWDER FOR INJECTION",strength:"100MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01BC07",desc:"Azacitidine",nappi:"3006763",name:"AZACYTIN (SECTION 21)",strength:"200MG",form:"TAB",pack:14,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01BC07",desc:"Azacitidine",nappi:"3006762",name:"AZACYTIN (SECTION 21)",strength:"300MG",form:"TAB",pack:14,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01BC07",desc:"Azacitidine",nappi:"3002606",name:"INTAZA POWDER FOR SUSPENSION VIAL",strength:"100MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01BC07",desc:"Azacitidine",nappi:"712413",name:"VIDAZA POWDER FOR RECONSTITUTION VIAL 4ML",strength:"100MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01BC07",desc:"Azacitidine",nappi:"3008998",name:"XPREZA (SECTION 21)",strength:"200MG",form:"TAB",pack:14,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01BC07",desc:"Azacitidine",nappi:"3008888",name:"XPREZA (SECTION 21)",strength:"300MG",form:"TAB",pack:14,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01CD04",desc:"Cabazitaxel",nappi:"3003213",name:"CABAZITAXEL ADCO CONCENTRATE FOR SOLUTION VIAL",strength:"60MG/1.5ML",form:"INF",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01CD04",desc:"Cabazitaxel",nappi:"3000147",name:"CABITAS VIAL 3ML RTU",strength:"20MG/1ML",form:"INF",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01CD04",desc:"Cabazitaxel",nappi:"3006997",name:"CABXEL CONCENTRATE FOR SOLUTION 15ML VIAL",strength:"60MG/1.5ML",form:"INF",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01CD04",desc:"Cabazitaxel",nappi:"715985",name:"JEVTANA VIAL 1.5ML",strength:"60MG/1.5ML",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01DB06",desc:"Idarubicin",nappi:"3007337",name:"IDAMYCIN (SECTION 21) POWDER FOR SOLUTION FOR INJECTION VIAL",strength:"5MG",form:"INF",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01DB06",desc:"Idarubicin",nappi:"3000888",name:"ZAVEDOS (SECTION 21) VIAL POWDER FOR SOLUTION FOR INJECTION",strength:"10MG",form:"INF",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01DB06",desc:"Idarubicin",nappi:"3001149",name:"ZAVEDOS (SECTION 21) VIAL POWDER FOR SOLUTION FOR INJECTION",strength:"5MG",form:"INF",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01DB06",desc:"Idarubicin",nappi:"788678",name:"ZAVEDOS VIAL POWDER FOR RECONSTITUTION",strength:"10MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01DB06",desc:"Idarubicin",nappi:"788651",name:"ZAVEDOS VIAL POWDER FOR RECONSTITUTION",strength:"5MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01DB11",desc:"Pixantrone",nappi:"721724",name:"PIXVURI (SECTION 21) POWDER FOR SOLUTION",strength:"29MG",form:"INF",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"3002706",name:"GLEETIB",strength:"100MG",form:"CAP",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"3002707",name:"GLEETIB",strength:"400MG",form:"CAP",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"705491",name:"GLEEVEC",strength:"100MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"705490",name:"GLEEVEC",strength:"400MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"722780",name:"IMATINIB ACCORD",strength:"100MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"722788",name:"IMATINIB ACCORD",strength:"400MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"718595",name:"IMAVEC",strength:"100MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"723296",name:"IMAVEC",strength:"400MG",form:"CAP",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"722940",name:"MIVESTA",strength:"100MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"722964",name:"MIVESTA",strength:"400MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"3004872",name:"NUVITAB",strength:"100MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"3004878",name:"NUVITAB",strength:"400MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"719926",name:"SUNMATIN",strength:"100MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"719927",name:"SUNMATIN",strength:"400MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"718477",name:"VATIVIO",strength:"100MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"3000431",name:"VATIVIO",strength:"400MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA01",desc:"Imatinib",nappi:"3006517",name:"VATIVIO FC",strength:"100MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA02",desc:"Dasatinib",nappi:"3009544",name:"DASATINIB 100 EUROLAB",strength:"100MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA02",desc:"Dasatinib",nappi:"3006316",name:"DASATINIB 100 TEVA",strength:"100MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA02",desc:"Dasatinib",nappi:"3009538",name:"DASATINIB 20 EUROLAB",strength:"20MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA02",desc:"Dasatinib",nappi:"3006236",name:"DASATINIB 20 TEVA",strength:"20MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA02",desc:"Dasatinib",nappi:"3009541",name:"DASATINIB 50 EUROLAB",strength:"50MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA02",desc:"Dasatinib",nappi:"3006248",name:"DASATINIB 50 TEVA",strength:"50MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA02",desc:"Dasatinib",nappi:"3009543",name:"DASATINIB 70 EUROLAB",strength:"70MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA02",desc:"Dasatinib",nappi:"3006249",name:"DASATINIB 70 TEVA",strength:"70MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA02",desc:"Dasatinib",nappi:"718478",name:"SPRYCEL",strength:"100MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA02",desc:"Dasatinib",nappi:"711441",name:"SPRYCEL",strength:"20MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA02",desc:"Dasatinib",nappi:"711442",name:"SPRYCEL",strength:"50MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA02",desc:"Dasatinib",nappi:"711443",name:"SPRYCEL",strength:"70MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA02",desc:"Dasatinib",nappi:"3006496",name:"TAZATRED",strength:"100MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA02",desc:"Dasatinib",nappi:"3006478",name:"TAZATRED",strength:"50MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA02",desc:"Dasatinib",nappi:"3006484",name:"TAZATRED",strength:"70MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA03",desc:"Nilotinib",nappi:"3008751",name:"TASICAP",strength:"150MG",form:"CAP",pack:120,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA03",desc:"Nilotinib",nappi:"3008752",name:"TASICAP",strength:"200MG",form:"CAP",pack:120,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA03",desc:"Nilotinib",nappi:"719121",name:"TASIGNA",strength:"150MG",form:"CAP",pack:112,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA03",desc:"Nilotinib",nappi:"714086",name:"TASIGNA",strength:"200MG",form:"CAP",pack:112,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA05",desc:"Ponatinib",nappi:"3000619",name:"ICLUSIG (SECTION 21)",strength:"45MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA05",desc:"Ponatinib",nappi:"3008468",name:"PONATINIB (SECTION 21)",strength:"45MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EA06",desc:"Asciminib",nappi:"3006853",name:"BACRELBA",strength:"40MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB01",desc:"Gefitinib",nappi:"3004548",name:"GEFIRIX",strength:"250MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB01",desc:"Gefitinib",nappi:"3004334",name:"GEFITINIB (SECTION 21)",strength:"250MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB01",desc:"Gefitinib",nappi:"716803",name:"IRESSA (SECTION 21)",strength:"",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"3007451",name:"BILURA",strength:"100MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"3007452",name:"BILURA",strength:"150MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"3002247",name:"ERCYTA",strength:"100MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"3002294",name:"ERCYTA",strength:"150MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"3002632",name:"ERLOCIP",strength:"100MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"3002633",name:"ERLOCIP",strength:"150MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"3002631",name:"ERLOCIP",strength:"25MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"712633",name:"TARCEVA",strength:"100MG",form:"CAP",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"712634",name:"TARCEVA",strength:"150MG",form:"CAP",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"712628",name:"TARCEVA",strength:"25MG",form:"CAP",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"3002816",name:"TARPIB",strength:"100MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"3002817",name:"TARPIB",strength:"150MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"3002811",name:"TARPIB",strength:"25MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"3004280",name:"TELONTA",strength:"100MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"3004281",name:"TELONTA",strength:"150MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"3004279",name:"TELONTA",strength:"25MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"3002419",name:"TERLOT",strength:"100MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB02",desc:"Erlotinib",nappi:"3002420",name:"TERLOT",strength:"150MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB03",desc:"Afatinib",nappi:"3002828",name:"GIOTRIF",strength:"20MG",form:"TAB",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB03",desc:"Afatinib",nappi:"3002827",name:"GIOTRIF",strength:"30MG",form:"TAB",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB03",desc:"Afatinib",nappi:"721059",name:"GIOTRIF",strength:"40MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB03",desc:"Afatinib",nappi:"3000046",name:"GIOTRIF (SECTION 21)",strength:"20MG",form:"TAB",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB03",desc:"Afatinib",nappi:"3000047",name:"GIOTRIF (SECTION 21)",strength:"30MG",form:"TAB",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB03",desc:"Afatinib",nappi:"3000048",name:"GIOTRIF (SECTION 21)",strength:"40MG",form:"TAB",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB04",desc:"Osimertinib",nappi:"3000923",name:"TAGRISSO",strength:"40MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EB04",desc:"Osimertinib",nappi:"3000924",name:"TAGRISSO",strength:"80MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EC01",desc:"Vemurafenib",nappi:"720736",name:"ZELBORAF",strength:"240MG",form:"TAB",pack:56,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EC02",desc:"Dabrafenib",nappi:"3000961",name:"RAFINLAR (WAS TAFINLAR)",strength:"50MG",form:"CAP",pack:120,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EC02",desc:"Dabrafenib",nappi:"3000628",name:"RAFINLAR (WAS TAFINLAR)",strength:"",form:"CAP",pack:120,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EC03",desc:"Encorafenib",nappi:"3007927",name:"BRAFTOVI (SECTION 21)",strength:"75MG",form:"CAP",pack:168,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EC03",desc:"Encorafenib",nappi:"3003051",name:"BRAFTOVI (SECTION21)",strength:"50MG",form:"CAP",pack:112,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01ED01",desc:"Crizotinib",nappi:"722115",name:"XALKORI",strength:"200MG",form:"CAP",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01ED01",desc:"Crizotinib",nappi:"722620",name:"XALKORI",strength:"250MG",form:"CAP",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01ED02",desc:"Ceritinib",nappi:"3004591",name:"ZYKADIA",strength:"150MG",form:"CAP",pack:90,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01ED02",desc:"Ceritinib",nappi:"3008345",name:"ZYKADIA (SECTION 21)",strength:"150MG",form:"CAP",pack:50,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01ED03",desc:"Alectinib",nappi:"3000071",name:"ALECENSA",strength:"150MG",form:"CAP",pack:224,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01ED03",desc:"Alectinib",nappi:"3000714",name:"ALECENSA (SECTION 21)",strength:"150MG",form:"CAP",pack:224,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01ED04",desc:"Brigatinib",nappi:"3002557",name:"ALUNBRIG",strength:"180MG",form:"TAB",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01ED04",desc:"Brigatinib",nappi:"3003720",name:"ALUNBRIG",strength:"30MG",form:"TAB",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01ED04",desc:"Brigatinib",nappi:"3002558",name:"ALUNBRIG",strength:"90MG",form:"TAB",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01ED04",desc:"Brigatinib",nappi:"3002556",name:"ALUNBRIG TREATMENT INITIATION PACK",strength:"",form:"KIT",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01ED05",desc:"Lorlatinib",nappi:"3009468",name:"LORBRENA (SECTION 21)",strength:"25MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EE01",desc:"Trametinib",nappi:"3000962",name:"MEQSEL (WAS MEKINIST)",strength:".5MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EE01",desc:"Trametinib",nappi:"3000629",name:"MEQSEL (WAS MEKINIST)",strength:"",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EE02",desc:"Cobimetinib",nappi:"723467",name:"COTELLIC",strength:"20MG",form:"TAB",pack:63,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EE03",desc:"Binimetinib",nappi:"3003074",name:"MEKTOVI (SECTION 21)",strength:"15MG",form:"TAB",pack:84,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF01",desc:"Palbociclib",nappi:"722913",name:"IBRANCE (SECTION 21)",strength:"100MG",form:"CAP",pack:21,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF01",desc:"Palbociclib",nappi:"722904",name:"IBRANCE (SECTION 21)",strength:"125MG",form:"CAP",pack:21,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF01",desc:"Palbociclib",nappi:"3002278",name:"IBRANCE (SECTION 21)",strength:"125MG",form:"CAP",pack:21,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF01",desc:"Palbociclib",nappi:"722918",name:"IBRANCE (SECTION 21)",strength:"75MG",form:"CAP",pack:21,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF01",desc:"Palbociclib",nappi:"3006261",name:"PALBOCICLIB 100 MG CIPLA",strength:"100MG",form:"CAP",pack:21,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF01",desc:"Palbociclib",nappi:"3006262",name:"PALBOCICLIB 125 MG CIPLA",strength:"125MG",form:"CAP",pack:21,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF01",desc:"Palbociclib",nappi:"3006258",name:"PALBOCICLIB 75 MG CIPLA",strength:"75MG",form:"CAP",pack:21,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF01",desc:"Palbociclib",nappi:"3002865",name:"PALBOCICLIB PFIZER",strength:"100MG",form:"CAP",pack:21,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF01",desc:"Palbociclib",nappi:"3002866",name:"PALBOCICLIB PFIZER",strength:"125MG",form:"CAP",pack:21,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF01",desc:"Palbociclib",nappi:"3002864",name:"PALBOCICLIB PFIZER",strength:"75MG",form:"CAP",pack:21,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF02",desc:"Ribociclib",nappi:"3001337",name:"KISQALI (SECTION 21)",strength:"200MG",form:"TAB",pack:63,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF02",desc:"Ribociclib",nappi:"3001821",name:"KRYXANA",strength:"200MG",form:"TAB",pack:21,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF03",desc:"Abemaciclib",nappi:"3003357",name:"YULAREB",strength:"100MG",form:"TAB",pack:14,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF03",desc:"Abemaciclib",nappi:"3003359",name:"YULAREB",strength:"150MG",form:"TAB",pack:14,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF03",desc:"Abemaciclib",nappi:"3003360",name:"YULAREB",strength:"200MG",form:"TAB",pack:14,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EF03",desc:"Abemaciclib",nappi:"3003356",name:"YULAREB",strength:"50MG",form:"TAB",pack:14,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EG01",desc:"Temsirolimus",nappi:"714286",name:"TORISEL WITH DILUENT VIAL",strength:"25MG/1ML",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EG02",desc:"Everolimus",nappi:"716749",name:"AFINITOR",strength:"10MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EG02",desc:"Everolimus",nappi:"723149",name:"AFINITOR",strength:"2.5MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EG02",desc:"Everolimus",nappi:"716750",name:"AFINITOR",strength:"5MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EG02",desc:"Everolimus",nappi:"3005898",name:"EVERZOR",strength:"10MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EG02",desc:"Everolimus",nappi:"3005897",name:"EVERZOR",strength:"5MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EH01",desc:"Lapatinib",nappi:"715582",name:"TYKERB",strength:"250MG",form:"TAB",pack:70,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EH02",desc:"Neratinib",nappi:"3001547",name:"NERLYNX (SECTION 21)",strength:"40MG",form:"TAB",pack:180,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EH03",desc:"Tucatinib",nappi:"3004964",name:"TUKYSA (SECTION 21)",strength:"150MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EH03",desc:"Tucatinib",nappi:"3005722",name:"TUKYSA (SECTION 21)",strength:"150MG",form:"TAB",pack:84,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EJ01",desc:"Ruxolitinib",nappi:"720731",name:"JAKAVI",strength:"15MG",form:"TAB",pack:56,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EJ01",desc:"Ruxolitinib",nappi:"720730",name:"JAKAVI",strength:"20MG",form:"TAB",pack:56,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EJ01",desc:"Ruxolitinib",nappi:"720732",name:"JAKAVI",strength:"5MG",form:"TAB",pack:56,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EK01",desc:"Axitinib",nappi:"723623",name:"INLYTA",strength:"1MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EK01",desc:"Axitinib",nappi:"723624",name:"INLYTA",strength:"5MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EK04",desc:"Fruquintinib",nappi:"3008902",name:"FRUZAQLA (SECTION 21)",strength:"1MG",form:"CAP",pack:21,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EK04",desc:"Fruquintinib",nappi:"3008904",name:"FRUZAQLA (SECTION 21)",strength:"5MG",form:"CAP",pack:21,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EL01",desc:"Ibrutinib",nappi:"721691",name:"IMBRUVICA",strength:"140MG",form:"CAP",pack:90,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EL01",desc:"Ibrutinib",nappi:"3004418",name:"IMBRUVICA",strength:"140MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EL01",desc:"Ibrutinib",nappi:"3004420",name:"IMBRUVICA",strength:"420MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EL01",desc:"Ibrutinib",nappi:"3004421",name:"IMBRUVICA",strength:"560MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EL02",desc:"Acalabrutinib",nappi:"3006024",name:"CALQUENCE",strength:"100MG",form:"CAP",pack:56,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EL02",desc:"Acalabrutinib",nappi:"3004536",name:"CALQUENCE (SECTION 21)",strength:"100MG",form:"CAP",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EM03",desc:"Alpelisib",nappi:"3004770",name:"PIVIKTO",strength:"150MG",form:"TAB",pack:56,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EM03",desc:"Alpelisib",nappi:"3004771",name:"PIVIKTO",strength:"200MG",form:"TAB",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EM03",desc:"Alpelisib",nappi:"3004772",name:"PIVIKTO MULTIPACK",strength:"250MG",form:"KIT",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX01",desc:"Sunitinib",nappi:"3008525",name:"SUNITINIB 12.5 CIPLA",strength:"12.5MG",form:"CAP",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX01",desc:"Sunitinib",nappi:"3008526",name:"SUNITINIB 25 CIPLA",strength:"25MG",form:"CAP",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX01",desc:"Sunitinib",nappi:"3008527",name:"SUNITINIB 50 CIPLA",strength:"50MG",form:"CAP",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX01",desc:"Sunitinib",nappi:"710179",name:"SUTENT",strength:"12.5MG",form:"CAP",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX01",desc:"Sunitinib",nappi:"710181",name:"SUTENT",strength:"25MG",form:"CAP",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX01",desc:"Sunitinib",nappi:"710182",name:"SUTENT",strength:"50MG",form:"CAP",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX01",desc:"Sunitinib",nappi:"3005698",name:"TISUMOR",strength:"12.5MG",form:"CAP",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX01",desc:"Sunitinib",nappi:"3005699",name:"TISUMOR",strength:"25MG",form:"CAP",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX01",desc:"Sunitinib",nappi:"3005700",name:"TISUMOR",strength:"37.5MG",form:"CAP",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX01",desc:"Sunitinib",nappi:"3005701",name:"TISUMOR",strength:"50MG",form:"CAP",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX02",desc:"Sorafenib",nappi:"3006494",name:"EUROSTIB",strength:"200MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX02",desc:"Sorafenib",nappi:"708482",name:"NEXAVAR",strength:"200MG",form:"TAB",pack:60,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX02",desc:"Sorafenib",nappi:"3009740",name:"SORAFENIB 200 DRL",strength:"200MG",form:"TAB",pack:112,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX03",desc:"Pazopanib",nappi:"720861",name:"VOTRIENT",strength:"200MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX03",desc:"Pazopanib",nappi:"720862",name:"VOTRIENT",strength:"400MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX04",desc:"Vandetanib",nappi:"3003555",name:"CAPRELSA (SECTION 21)",strength:"300MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX05",desc:"Regorafenib",nappi:"720787",name:"STIVARGA",strength:"40MG",form:"TAB",pack:84,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX07",desc:"Cabozantinib",nappi:"3005102",name:"CABOLONG (SECTION 21)",strength:"20MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX07",desc:"Cabozantinib",nappi:"3005103",name:"CABOLONG (SECTION 21)",strength:"40MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX07",desc:"Cabozantinib",nappi:"3005104",name:"CABOLONG (SECTION 21)",strength:"60MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX07",desc:"Cabozantinib",nappi:"3001326",name:"CABOMETYX (SECTION 21)",strength:"60MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX07",desc:"Cabozantinib",nappi:"3004582",name:"COMETRIQ (SECTION 21)",strength:"20MG",form:"CAP",pack:84,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX07",desc:"Cabozantinib",nappi:"3004518",name:"COMETRIQ (SECTION 21) 140MG PACK",strength:"140MG",form:"KIT",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX08",desc:"Lenvatinib",nappi:"3000113",name:"LENVIMA",strength:"10MG",form:"CAP",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX08",desc:"Lenvatinib",nappi:"3000114",name:"LENVIMA",strength:"4MG",form:"CAP",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX09",desc:"Nintedanib",nappi:"3003488",name:"NINTENA (SECTION 21)",strength:"150MG",form:"CAP",pack:10,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX10",desc:"Midostaurin",nappi:"3001753",name:"SOTAURIC",strength:"25MG",form:"CAP",pack:56,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX14",desc:"Entrectinib",nappi:"3006666",name:"ROZLYTREK",strength:"100MG",form:"CAP",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX14",desc:"Entrectinib",nappi:"3006667",name:"ROZLYTREK",strength:"200MG",form:"CAP",pack:90,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX18",desc:"Avapritinib",nappi:"3008633",name:"AYVAKIT (SECTION 21)",strength:"100MG",form:"TAB",pack:30,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX20",desc:"Pemigatinib",nappi:"3003203",name:"PEMAZYRE (SECTION 21)",strength:"13.5MG",form:"TAB",pack:14,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX20",desc:"Pemigatinib",nappi:"3003201",name:"PEMAZYRE (SECTION 21)",strength:"4.5MG",form:"TAB",pack:14,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX20",desc:"Pemigatinib",nappi:"3003202",name:"PEMAZYRE (SECTION 21)",strength:"9MG",form:"TAB",pack:14,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01EX22",desc:"Selpercatinib",nappi:"3007659",name:"RETSEVMO (SECTION 21)",strength:"80MG",form:"CAP",pack:112,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FA01",desc:"Rituximab",nappi:"3002656",name:"BLITZIMA CONCENTRATE FOR SOLUTION FOR INFUSION VIAL 10ML",strength:"100MG/10ML",form:"INF",pack:2,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FA01",desc:"Rituximab",nappi:"3002657",name:"BLITZIMA CONCENTRATE FOR SOLUTION FOR INFUSION VIAL 50ML",strength:"500MG/50ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FA01",desc:"Rituximab",nappi:"3001131",name:"MABTHERA SC SOLUTION FOR INJ VIAL",strength:"1400MG/11.7ML",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FA01",desc:"Rituximab",nappi:"853224",name:"MABTHERA VIAL 10ML",strength:"100MG",form:"INJ",pack:2,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FA01",desc:"Rituximab",nappi:"853232",name:"MABTHERA VIAL 50ML",strength:"500MG",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FA01",desc:"Rituximab",nappi:"3005178",name:"REDDITUX CONCENTRATE FOR SOLUTION FOR INFUSION VIAL 10ML",strength:"100MG/10ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FA01",desc:"Rituximab",nappi:"3005180",name:"REDDITUX CONCENTRATE FOR SOLUTION FOR INFUSION VIAL 50ML",strength:"500MG/50ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FA01",desc:"Rituximab",nappi:"3001754",name:"RISTOVA 100 VIAL 10ML",strength:"100MG/10ML",form:"INF",pack:2,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FA01",desc:"Rituximab",nappi:"3001755",name:"RISTOVA 500 VIAL 50ML",strength:"500MG/50ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FA01",desc:"Rituximab",nappi:"3009594",name:"RITUXIMAB 100 CIPLA CONCENTRATE SOLUTION",strength:"100MG/10ML",form:"INF",pack:2,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FA01",desc:"Rituximab",nappi:"3009595",name:"RITUXIMAB 500 CIPLA CONCENTRATE SOLUTION",strength:"500MG/50ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FA01",desc:"Rituximab",nappi:"3008709",name:"RIXATHON CONCENTRATE FOR SOLUTION FOR INFUSION VIAL 10ML",strength:"100MG/10ML",form:"INF",pack:2,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FA01",desc:"Rituximab",nappi:"3008710",name:"RIXATHON CONCENTRATE FOR SOLUTION FOR INFUSION VIAL 50ML",strength:"500MG/50ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FA03",desc:"Obinutuzumab",nappi:"3000053",name:"GAZYVA SOLUTION FOR INFUSION VIAL 40ML",strength:"1000MG/40MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FC01",desc:"Daratumumab",nappi:"3000779",name:"DARZALEX (SECTION 21) SOLUTION FOR INFUSION 20ML",strength:"400MG/20ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FC01",desc:"Daratumumab",nappi:"723209",name:"DARZALEX SOLUTION FOR INFUSION VIAL 20ML",strength:"400MG/20ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FC01",desc:"Daratumumab",nappi:"3002007",name:"DARZALEX SOLUTION FOR INFUSION VIAL 5ML",strength:"100MG/5ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FC01",desc:"Daratumumab",nappi:"3008258",name:"DARZALEX SOLUTION FOR INJECTION 15ML VIAL",strength:"1800MG/15ML",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FD01",desc:"Trastuzumab",nappi:"3009230",name:"EQUITUZ POWDER AND SOLVENT FOR INFUSION",strength:"440MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FD01",desc:"Trastuzumab",nappi:"723199",name:"HERCEPTIN SC VIAL 5ML",strength:"600MG/5ML",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FD01",desc:"Trastuzumab",nappi:"884055",name:"HERCEPTIN VIAL POWDER FOR RECONSTITUTION",strength:"440MG",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FD01",desc:"Trastuzumab",nappi:"3000927",name:"OGIVRI 21MG/ML IV VIAL POWDER FOR RECONSTITUTION + DILUENT",strength:"440MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FD01",desc:"Trastuzumab",nappi:"3002658",name:"TRASTUZUMAB CIPLA VIAL POWDER FOR RECON WITH DILUENT",strength:"440MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FD02",desc:"Pertuzumab",nappi:"720743",name:"PERJETA VIAL 14ML",strength:"420MG/14ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FD03",desc:"Trastuzumab Emtansine",nappi:"720656",name:"KADCYLA POWDER FOR INFUSION VIAL",strength:"100MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FD03",desc:"Trastuzumab Emtansine",nappi:"720657",name:"KADCYLA POWDER FOR INFUSION VIAL",strength:"160MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FE01",desc:"Cetuximab",nappi:"715052",name:"ERBITUX 20ML",strength:"5MG/1ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FE01",desc:"Cetuximab",nappi:"710034",name:"ERBITUX VIAL 50ML",strength:"2MG/1ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FE02",desc:"Panitumumab",nappi:"714612",name:"VECTIBIX VIAL 5ML",strength:"",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FF01",desc:"Nivolumab",nappi:"3005203",name:"OPDIVO (SECTION 21) VIAL 10ML",strength:"100MG/10MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FF01",desc:"Nivolumab",nappi:"721586",name:"OPDIVO (SECTION 21) VIAL 10ML",strength:"100MG/10ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FF01",desc:"Nivolumab",nappi:"721585",name:"OPDIVO (SECTION 21) VIAL 4ML",strength:"40MG/4ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FF01",desc:"Nivolumab",nappi:"3005202",name:"OPDIVO (SECTION 21) VIAL 4ML",strength:"40MG/4ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FF02",desc:"Pembrolizumab",nappi:"723729",name:"KEYTRUDA SOLUTION FOR INFUSION VIAL 4ML",strength:"100MG/4ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FF03",desc:"Durvalumab",nappi:"3003587",name:"IMFINZI CONCENTRATE SOLUTION FOR INFUSION 10ML VIAL",strength:"500MG/10ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FF03",desc:"Durvalumab",nappi:"3003588",name:"IMFINZI CONCENTRATE SOLUTION FOR INFUSION 2.4ML VIAL",strength:"120MG/2.4ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FF04",desc:"Avelumab",nappi:"3007509",name:"BAVENCIO (SECTION 21) CONC FOR SOLUTION FOR INF 10 ML VIAL",strength:"200MG/10ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FF05",desc:"Atezolizumab",nappi:"3000846",name:"TECENTRIQ 14ML VIAL",strength:"840MG/14ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FF05",desc:"Atezolizumab",nappi:"3001272",name:"TECENTRIQ 20ML VIAL",strength:"1200MG/20ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FF06",desc:"Cemiplimab",nappi:"3006783",name:"LIBTAYO (SECTION 21) SOLUTION FOR INFUSION 7ML VIAL",strength:"350MG/7ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG01",desc:"Bevacizumab",nappi:"3005441",name:"ABEVMY CONCENTRATE FOR SOLUTION FOR INFUSION VIAL 20ML",strength:"400MG/16ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG01",desc:"Bevacizumab",nappi:"3005442",name:"ABEVMY CONCENTRATE FOR SOLUTION FOR INFUSION VIAL 6ML",strength:"100MG/4ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG01",desc:"Bevacizumab",nappi:"706041",name:"AVASTIN VIAL 16ML",strength:"25MG/1ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG01",desc:"Bevacizumab",nappi:"706042",name:"AVASTIN VIAL 4ML",strength:"25MG/1ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG01",desc:"Bevacizumab",nappi:"3009314",name:"BEVACIZUMAB 100 CIPLA",strength:"100MG/4ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG01",desc:"Bevacizumab",nappi:"3009227",name:"BEVACIZUMAB 100 EQUITY",strength:"100MG/4ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG01",desc:"Bevacizumab",nappi:"3009315",name:"BEVACIZUMAB 400 CIPLA",strength:"400MG/16ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG01",desc:"Bevacizumab",nappi:"3009229",name:"BEVACIZUMAB 400 EQUITY",strength:"400MG/16ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG01",desc:"Bevacizumab",nappi:"3005459",name:"BEVAMYL CONCENTRATION FOR SOLUTION FOR INFUSION 20ML VIAL",strength:"400MG/16ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG01",desc:"Bevacizumab",nappi:"3005458",name:"BEVAMYL CONCENTRATION FOR SOLUTION FOR INFUSION 6ML VIAL",strength:"100MG/4ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG01",desc:"Bevacizumab",nappi:"3007990",name:"RIQVIVA CONCENTRATE FOR SOLUTION FOR INFUSION 20ML VIAL",strength:"400MG/16ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG01",desc:"Bevacizumab",nappi:"3007989",name:"RIQVIVA CONCENTRATE FOR SOLUTION FOR INFUSION 5ML VIAL",strength:"100MG/4ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG02",desc:"Ramucirumab",nappi:"3009257",name:"CYRAMZA (SECTION 21) SOLUTION FOR INFUSION",strength:"100MG/10ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG02",desc:"Ramucirumab",nappi:"3009258",name:"CYRAMZA (SECTION 21) SOLUTION FOR INFUSION",strength:"500MG/50ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG02",desc:"Ramucirumab",nappi:"724003",name:"CYRAMZA SOLUTION FOR INFUSION VIAL 10ML",strength:"",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FG02",desc:"Ramucirumab",nappi:"724004",name:"CYRAMZA SOLUTION FOR INFUSION VIAL 50ML",strength:"",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX02",desc:"Gemtuzumab",nappi:"3000692",name:"MYLOTARG (SECTION 21) POWDER FOR RECONSTITUTION VIAL",strength:"4.5MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX02",desc:"Gemtuzumab ozogamicin",nappi:"3005253",name:"MYLOTARG (SECTION 21) POWDER FOR SOLUTION FOR INFUSION VIAL",strength:"5MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX04",desc:"Ipilimumab",nappi:"720814",name:"YERVOY SOLUTION FOR INFUSION 10ML VIAL",strength:"5MG/1ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX04",desc:"Ipilimumab",nappi:"720815",name:"YERVOY SOLUTION FOR INFUSION 40ML VIAL",strength:"5MG/1ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX05",desc:"Brentuximab Vedotin",nappi:"723473",name:"ADCETRIS POWDER FOR RECONSTITUTION VIAL",strength:"50MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX06",desc:"Dinutuximab",nappi:"3004047",name:"QARZIBA (SECTION 21) CONC FOR SOLUTION FOR INF 4.5ML VIAL",strength:"20MG/4.5ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX06",desc:"Dinutuximab beta",nappi:"3004760",name:"QARZIBA (SECTION 21) CONC FOR SOLUTION FOR INF 4.5ML VIAL",strength:"20MG/4.5ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX06",desc:"Dinutuximab",nappi:"3003133",name:"QARZIBA VIAL (SECTION 21) CONC FOR SOL FOR INF 4.5ML",strength:"",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX07",desc:"Blinatumomab",nappi:"3000427",name:"BLINCYTO VIAL POWDER FOR RECONSTITUTION",strength:"38.5MCG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX09",desc:"Mogamulizumab",nappi:"3007517",name:"POTELIGEO (SECTION 21) SOLUTION FOR INFUSION 5ML VIAL",strength:"20MG/5ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX13",desc:"Enfortumab vedotin",nappi:"3008339",name:"PADCEV (SECTION 21) POWDER FOR SOLUTION FOR INFUSION VIAL",strength:"20MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX13",desc:"Enfortumab vedotin",nappi:"3008347",name:"PADCEV (SECTION 21) POWDER FOR SOLUTION FOR INFUSION VIAL",strength:"30MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX14",desc:"Polatuzumab vedotin",nappi:"3001699",name:"POLIVY VIAL POWDER FOR CONCENTRATE FOR SOLUTION FOR INFUSION",strength:"140MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX14",desc:"Polatuzumab vedotin",nappi:"3007522",name:"POLIVY VIAL POWDER FOR CONCENTRATE FOR SOLUTION FOR INFUSION",strength:"30MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX17",desc:"Sacituzumab govitecan",nappi:"3008957",name:"TRODELVY (SECTION 21) POWDER FOR SOLUTION FOR INFUSION",strength:"180MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX17",desc:"Sacituzumab govitecan",nappi:"3005885",name:"TRODELVY (SECTION 21) POWDER FOR SOLUTION FOR INFUSION VIAL",strength:"200MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX24",desc:"Teclistamab",nappi:"3008845",name:"TECVAYLI (SECTION 21) SOLUTION FOR INJECTION 1.7ML VIAL",strength:"153MG/1.7ML",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX24",desc:"Teclistamab",nappi:"3008844",name:"TECVAYLI (SECTION 21) SOLUTION FOR INJECTION 3ML VIAL",strength:"30MG/3ML",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX26",desc:"Mirvetuximab soravtansine",nappi:"3009210",name:"ELAHERE (SECTION 21) CONCENTRATE SOLUTION",strength:"100MG/20ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX27",desc:"Epcoritamab",nappi:"3007478",name:"EPKINLY (SECTION 21) SINGLE DOSE VIAL",strength:"48MG/.8ML",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX27",desc:"Epcoritamab",nappi:"3007479",name:"EPKINLY (SECTION 21) SINGLE DOSE VIAL",strength:"4MG/.8ML",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX29",desc:"Talquetamab",nappi:"3008570",name:"TALVEY (SECTION 21) SOLUTION FOR INJECTION 1.5ML VIAL",strength:"3MG/1.5MG",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX29",desc:"Talquetamab",nappi:"3008572",name:"TALVEY (SECTION 21) SOLUTION FOR INJECTION 1ML VIAL",strength:"40MG/1ML",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX33",desc:"Tarlatamab",nappi:"3009213",name:"IMDELLTRA (SECTION 21) POWDER FOR SOLUTION",strength:"10MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX33",desc:"Tarlatamab",nappi:"3009212",name:"IMDELLTRA (SECTION 21) POWDER FOR SOLUTION",strength:"1MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX33",desc:"Tarlatamab",nappi:"3009156",name:"IMDELLTRA (SECTION 21) POWDER FOR SOLUTION VIAL",strength:"10MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FX33",desc:"Tarlatamab",nappi:"3009154",name:"IMDELLTRA (SECTION 21) POWDER FOR SOLUTION VIAL",strength:"1MG",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FY01",desc:"Pertuzumab and trastuzumab",nappi:"3007536",name:"PHESGO FDC 1200 SOLUTION FOR INJECTION 15ML VIAL",strength:"1200MG/600MG",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FY01",desc:"Pertuzumab and trastuzumab",nappi:"3007535",name:"PHESGO FDC 600 SOLUTION FOR INJECTION 10ML VIAL",strength:"600MG/600MG",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01FY02",desc:"Nivolumab and relatlimab",nappi:"3010229",name:"OPDUALAG (SECTION 21) CONC FOR SOLN FOR INF",strength:"",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"3000842",name:"BERTRED LYOPHILISED POWDER FOR INJECTION VIAL",strength:"3.5MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"3004803",name:"BORTIV POWDER FOR SOLUTION FOR INJECTION VIAL",strength:"3.5MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"3001232",name:"BORTRAC VIAL POWDER FOR INJECTION",strength:"3.5MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"3002873",name:"BOTIGEN POWDER FOR SOLUTION FOR INJECTION VIAL",strength:"3.5MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"3000409",name:"MIBLEX VIAL POWDER FOR RECONSTITUTION",strength:"3.5MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"3002686",name:"ONBORT POWDER FOR SOLUTION FOR INJECTION VIAL",strength:"3.5MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"3006362",name:"VALOMA POWDER FOR SOLUTION FOR INJECTION VIAL",strength:"1MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"3006363",name:"VALOMA POWDER FOR SOLUTION FOR INJECTION VIAL",strength:"2.5MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"3004050",name:"VALOMA POWDER FOR SOLUTION FOR INJECTION VIAL",strength:"3.5MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"3006514",name:"VALTIB 2.5 SOLUTION FOR INJECTION 2ML VIAL",strength:"2.5MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"3006322",name:"VALTIB 3.5 SOLUTION FOR INJECTION 2ML VIAL",strength:"3.5MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"722781",name:"VALTIB POWDER FOR INJECTION VIAL",strength:"3.5MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"3003579",name:"VALTIB POWDER FOR SOLUTION FOR INJECTION VIAL",strength:"1MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"3004833",name:"VELBOR IV POWDER FOR SOLUTION FOR INJECTION VIAL",strength:"3.5MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"723386",name:"VELCADE VIAL POWDER FOR RECONSTITUTION",strength:"1MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"706787",name:"VELCADE VIAL POWDER FOR RECONSTITUTION",strength:"3.5MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG01",desc:"Bortezomib",nappi:"3004010",name:"VELZOMY POWDER FOR SOLUTION FOR INJECTION VIAL",strength:"3.5MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG02",desc:"Carfilzomib",nappi:"3003263",name:"CARFILNAT (SECTION 21) POWDER FOR RECON VIAL",strength:"60MG",form:"INF",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG02",desc:"Carfilzomib",nappi:"3005277",name:"CARFILNAT (SECTION 21) POWDER FOR RECON VIAL",strength:"60MG",form:"INF",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG02",desc:"Carfilzomib",nappi:"3001142",name:"KYPROLIS (SECTION 21) VIAL POWDER FOR RECONSTITUTION",strength:"60MG",form:"INF",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG02",desc:"Carfilzomib",nappi:"723290",name:"KYPROLIS POWDER FOR SOLUTION FOR INFUSION VIAL",strength:"60MG",form:"INF",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG03",desc:"Ixazomib",nappi:"3003021",name:"NINLARO",strength:"2.3MG",form:"CAP",pack:3,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG03",desc:"Ixazomib",nappi:"3003026",name:"NINLARO",strength:"3MG",form:"CAP",pack:3,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG03",desc:"Ixazomib",nappi:"3003027",name:"NINLARO",strength:"4MG",form:"CAP",pack:3,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XG03",desc:"Ixazomib",nappi:"3000969",name:"NINLARO (SECTION 21)",strength:"4MG",form:"CAP",pack:3,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XJ01",desc:"Vismodegib",nappi:"722592",name:"ERIVEDGE",strength:"150MG",form:"CAP",pack:28,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XK01",desc:"Olaparib",nappi:"3001823",name:"LYNPARZA",strength:"100MG",form:"TAB",pack:56,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XK01",desc:"Olaparib",nappi:"3001796",name:"LYNPARZA",strength:"150MG",form:"TAB",pack:56,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XK01",desc:"Olaparib",nappi:"3001654",name:"LYNPARZA (SECTION 21)",strength:"150MG",form:"TAB",pack:56,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XK01",desc:"Olaparib",nappi:"723524",name:"LYNPARZA (SECTION 21)",strength:"50MG",form:"CAP",pack:448,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XK01",desc:"Olaparib",nappi:"3004049",name:"OLANIB (SECTION 21)",strength:"150MG",form:"TAB",pack:120,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XK02",desc:"Niraparib",nappi:"3005372",name:"ZEJULA (SECTION 21)",strength:"100MG",form:"CAP",pack:56,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX02",desc:"Asparaginase",nappi:"736031",name:"LASPAR VIAL POWDER FOR RECONSTITUTION",strength:"10000IU",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX24",desc:"Pegaspargase",nappi:"3010079",name:"HAMSYL (SECTION 21) SOLUTION FOR INJECTION",strength:"3750IU/5ML",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX24",desc:"Pegaspargase",nappi:"3007899",name:"HAMSYL (SECTION 21) SOLUTION FOR INJECTION 5ML VIAL",strength:"3750IU/5ML",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX24",desc:"Pegaspargase",nappi:"717748",name:"ONCASPAR (SECTION 21) VIAL",strength:"3750IU/5ML",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX27",desc:"Arsenic trioxide",nappi:"722297",name:"ARSITRI (SECTION 21) VIAL 10ML",strength:"10MG/10ML",form:"INF",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX27",desc:"Arsenic trioxide",nappi:"3003998",name:"PHENASEN CONCENTRATED SOLUTION FOR INFUSION VIAL 10ML",strength:"10MG/10ML",form:"INF",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX41",desc:"Eribulin",nappi:"718840",name:"HALAVEN VIAL 2ML",strength:"",form:"INF",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX44",desc:"Aflibercept",nappi:"723716",name:"ZALTRAP (SECTION 21) VIAL 4ML",strength:"25MG/1ML",form:"INF",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX52",desc:"Venetoclax",nappi:"3000318",name:"VENCLEXTA",strength:"100MG",form:"TAB",pack:120,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX52",desc:"Venetoclax",nappi:"3002308",name:"VENCLEXTA",strength:"10MG",form:"TAB",pack:14,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX52",desc:"Venetoclax",nappi:"3002310",name:"VENCLEXTA",strength:"50MG",form:"TAB",pack:7,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX52",desc:"Venetoclax",nappi:"3000316",name:"VENCLEXTA 4X7 DAY WALLET",strength:"",form:"KIT",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX67",desc:"Tagraxofusp",nappi:"3008869",name:"ELZONRIS (SECTION 21) SOLUTION FOR INJECTION 1ML VIAL",strength:"1000MCG/1ML",form:"INJ",pack:1,bio:"Y",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX69",desc:"Lurbinectedin",nappi:"3008512",name:"ZEPZELCA (SECTION 21) POWDER FOR INJECTION VIAL",strength:"4MG",form:"INJ",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX73",desc:"Sotorasib",nappi:"3007657",name:"LUMYKRAS (SECTION 21)",strength:"120MG",form:"TAB",pack:240,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX73",desc:"Sotorasib",nappi:"3009413",name:"LUMYKRAS (SECTION 21)",strength:"240MG",form:"TAB",pack:120,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX74",desc:"Belzutifan",nappi:"3008635",name:"WELIREG (SECTION 21)",strength:"40MG",form:"TAB",pack:90,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  {atc:"L01XX75",desc:"Tebentafusp",nappi:"3009677",name:"KIMMTRAK (SECTION 21) SOLUTION FOR INFUSION",strength:"100MCG/.5ML",form:"INF",pack:1,bio:"",category:"ANTINEOPLASTIC AGENTS"},
  // L02 - ENDOCRINE THERAPY
  {atc:"L02BB04",desc:"Enzalutamide",nappi:"3007521",name:"ENZUTIX",strength:"40MG",form:"CAP",pack:112,bio:"",category:"ENDOCRINE THERAPY"},
  {atc:"L02BB04",desc:"Enzalutamide",nappi:"721978",name:"XTANDI",strength:"40MG",form:"CAP",pack:112,bio:"",category:"ENDOCRINE THERAPY"},
  {atc:"L02BB04",desc:"Enzalutamide",nappi:"3009312",name:"ZILADE",strength:"40MG",form:"CAP",pack:112,bio:"",category:"ENDOCRINE THERAPY"},
  {atc:"L02BB05",desc:"Apalutamide",nappi:"3002008",name:"ERLEADA",strength:"60MG",form:"TAB",pack:120,bio:"",category:"ENDOCRINE THERAPY"},
  {atc:"L02BB06",desc:"Darolutamide",nappi:"3004789",name:"NUBEQA",strength:"300MG",form:"TAB",pack:112,bio:"",category:"ENDOCRINE THERAPY"},
  {atc:"L02BX03",desc:"Abiraterone",nappi:"3002660",name:"ABIRATERONE CIPLA",strength:"250MG",form:"TAB",pack:120,bio:"",category:"ENDOCRINE THERAPY"},
  {atc:"L02BX03",desc:"Abiraterone",nappi:"3003663",name:"ABITIG",strength:"250MG",form:"TAB",pack:120,bio:"",category:"ENDOCRINE THERAPY"},
  {atc:"L02BX03",desc:"Abiraterone",nappi:"3006933",name:"ABIZISTA",strength:"250MG",form:"TAB",pack:120,bio:"",category:"ENDOCRINE THERAPY"},
  {atc:"L02BX03",desc:"Abiraterone",nappi:"3006934",name:"ABIZISTA",strength:"500MG",form:"TAB",pack:60,bio:"",category:"ENDOCRINE THERAPY"},
  {atc:"L02BX03",desc:"Abiraterone",nappi:"3004852",name:"HETERAN",strength:"250MG",form:"TAB",pack:120,bio:"",category:"ENDOCRINE THERAPY"},
  {atc:"L02BX03",desc:"Abiraterone",nappi:"3002487",name:"PROTYGA",strength:"250MG",form:"TAB",pack:120,bio:"",category:"ENDOCRINE THERAPY"},
  {atc:"L02BX03",desc:"Abiraterone",nappi:"3002439",name:"TERONRED",strength:"250MG",form:"TAB",pack:120,bio:"",category:"ENDOCRINE THERAPY"},
  {atc:"L02BX03",desc:"Abiraterone",nappi:"3007584",name:"TERONRED",strength:"500MG",form:"TAB",pack:60,bio:"",category:"ENDOCRINE THERAPY"},
  {atc:"L02BX03",desc:"Abiraterone",nappi:"720690",name:"ZYTIGA",strength:"250MG",form:"TAB",pack:120,bio:"",category:"ENDOCRINE THERAPY"},
  {atc:"L02BX03",desc:"Abiraterone",nappi:"3003125",name:"ZYTIGA",strength:"500MG",form:"TAB",pack:60,bio:"",category:"ENDOCRINE THERAPY"},
  {atc:"L02BX04",desc:"Relugolix",nappi:"3007235",name:"ORGOVYX (SECTION 21)",strength:"120MG",form:"TAB",pack:30,bio:"",category:"ENDOCRINE THERAPY"},
  // L03 - IMMUNOSTIMULANTS
  {atc:"L03AB04",desc:"Interferon alfa-2a",nappi:"3000825",name:"ROFERON A (SECTION 21) PRE-FILLED SYRINGE 0.5ML",strength:"3MIU/.5ML",form:"INJ",pack:6,bio:"Y",category:"IMMUNOSTIMULANTS"},
  {atc:"L03AB04",desc:"Interferon alfa-2a",nappi:"3000693",name:"ROFERON-A (SECTION 21) PRE-FILLED SYRINGE 0.5ML",strength:"6MIU/.5ML",form:"INJ",pack:6,bio:"Y",category:"IMMUNOSTIMULANTS"},
  {atc:"L03AB05",desc:"Interferon alfa-2b",nappi:"3000837",name:"INTRON A (SECTION 21) SOLUTION FOR INJECTION 2.5ML VIAL",strength:"25MIU/2.5ML",form:"INJ",pack:2,bio:"Y",category:"IMMUNOSTIMULANTS"},
  {atc:"L03AB05",desc:"Interferon alfa-2b",nappi:"722175",name:"INTRON A (SECTION 21) VIAL 3ML",strength:"",form:"INJ",pack:2,bio:"Y",category:"IMMUNOSTIMULANTS"},
  {atc:"L03AB05",desc:"Interferon alfa-2b",nappi:"3007699",name:"RELIFERON (SECTION 21) VIAL",strength:"",form:"INJ",pack:1,bio:"Y",category:"IMMUNOSTIMULANTS"},
  {atc:"L03AB11",desc:"Peginterferon alfa-2a",nappi:"704196",name:"PEGASYS PRE-FILLED SYRINGE 0.5ML",strength:"135MCG",form:"VIAL",pack:1,bio:"Y",category:"IMMUNOSTIMULANTS"},
  {atc:"L03AB11",desc:"Peginterferon alfa-2a",nappi:"704197",name:"PEGASYS PRE-FILLED SYRINGE 0.5ML",strength:"180MCG",form:"VIAL",pack:1,bio:"Y",category:"IMMUNOSTIMULANTS"},
  {atc:"L03AC01",desc:"Aldesleukin",nappi:"868620",name:"CHIRON IL-2 VIAL POWDER FOR RECONSTITUTION",strength:"",form:"INJ",pack:1,bio:"Y",category:"IMMUNOSTIMULANTS"},
  {atc:"L03AX16",desc:"Plerixafor",nappi:"3005177",name:"HETERIX VIAL 1.2ML",strength:"24MG/1.2ML",form:"INJ",pack:1,bio:"",category:"IMMUNOSTIMULANTS"},
  {atc:"L03AX16",desc:"Plerixafor",nappi:"715940",name:"MOZOBIL VIAL 1.2ML",strength:"20MG/1ML",form:"INJ",pack:1,bio:"",category:"IMMUNOSTIMULANTS"},
  // L04 - IMMUNOSUPPRESSANTS
  {atc:"L04AC11",desc:"Siltuximab",nappi:"3004506",name:"SYLVANT 100 POWDER FOR CONCENTRATE FOR SOLUTION VIAL",strength:"100MG",form:"INF",pack:1,bio:"Y",category:"IMMUNOSUPPRESSANTS"},
  {atc:"L04AC11",desc:"Siltuximab",nappi:"3004507",name:"SYLVANT 400 POWDER FOR CONCENTRATE FOR SOLUTION VIAL",strength:"400MG",form:"INF",pack:1,bio:"Y",category:"IMMUNOSUPPRESSANTS"},
  {atc:"L04AG06",desc:"Alemtuzumab",nappi:"722756",name:"LEMTRADA CONCENTRATE FOR SOLUTION VIAL 1.2ML",strength:"12MG/1.2ML",form:"INF",pack:1,bio:"Y",category:"IMMUNOSUPPRESSANTS"},
  {atc:"L04AJ02",desc:"Ravulizumab",nappi:"3009576",name:"ULTOMIRIS (SECTION 21) SOLUTION FOR INFUSION",strength:"300MG/3ML",form:"INF",pack:1,bio:"Y",category:"IMMUNOSUPPRESSANTS"},
  {atc:"L04AJ02",desc:"Ravulizumab",nappi:"3009577",name:"ULTOMIRIS (SECTION 21) SOLUTION FOR INFUSION",strength:"1100MG/11ML",form:"INF",pack:1,bio:"Y",category:"IMMUNOSUPPRESSANTS"},
  {atc:"L04AX06",desc:"Pomalidomide",nappi:"723221",name:"IMNOVID",strength:"1MG",form:"CAP",pack:21,bio:"",category:"IMMUNOSUPPRESSANTS"},
  {atc:"L04AX06",desc:"Pomalidomide",nappi:"723222",name:"IMNOVID",strength:"2MG",form:"CAP",pack:21,bio:"",category:"IMMUNOSUPPRESSANTS"},
  {atc:"L04AX06",desc:"Pomalidomide",nappi:"723224",name:"IMNOVID",strength:"3MG",form:"CAP",pack:21,bio:"",category:"IMMUNOSUPPRESSANTS"},
  {atc:"L04AX06",desc:"Pomalidomide",nappi:"722046",name:"IMNOVID",strength:"4MG",form:"CAP",pack:21,bio:"",category:"IMMUNOSUPPRESSANTS"},
  {atc:"L04AX06",desc:"Pomalidomide",nappi:"3001198",name:"POMALID (SECTION 21)",strength:"4MG",form:"CAP",pack:21,bio:"",category:"IMMUNOSUPPRESSANTS"},
  {atc:"L04AX06",desc:"Pomalidomide",nappi:"3006836",name:"POMALIDOMIDE 3MG CIPLA",strength:"3MG",form:"CAP",pack:21,bio:"",category:"IMMUNOSUPPRESSANTS"},
  {atc:"L04AX06",desc:"Pomalidomide",nappi:"3006837",name:"POMALIDOMIDE 4MG CIPLA",strength:"4MG",form:"CAP",pack:21,bio:"",category:"IMMUNOSUPPRESSANTS"},
  {atc:"L04AX06",desc:"Pomalidomide",nappi:"3008224",name:"POMAXEL",strength:"3MG",form:"CAP",pack:21,bio:"",category:"IMMUNOSUPPRESSANTS"},
  {atc:"L04AX06",desc:"Pomalidomide",nappi:"3008225",name:"POMAXEL",strength:"4MG",form:"CAP",pack:21,bio:"",category:"IMMUNOSUPPRESSANTS"},
  // M05 - BONE DISEASES
  {atc:"M05BX04",desc:"Denosumab",nappi:"716131",name:"PROLIA PREFILLED SYRINGE 1ML",strength:"60MG/1ML",form:"INJ",pack:1,bio:"Y",category:"BONE DISEASES"},
  {atc:"M05BX04",desc:"Denosumab",nappi:"718814",name:"PROLIA PREFILLED SYRINGE (SECTION 21)",strength:"60MG/1ML",form:"INJ",pack:1,bio:"Y",category:"BONE DISEASES"},
  {atc:"M05BX04",desc:"Denosumab",nappi:"716447",name:"XGEVA (SECTION 21) VIAL",strength:"",form:"VIA",pack:1,bio:"Y",category:"BONE DISEASES"},
  // V10 - THERAPEUTIC RADIOPHARMACEUTICALS
  {atc:"V10XX02",desc:"Ibrutumomab tiuxetan",nappi:"705892",name:"ZEVALIN",strength:"1.6MG/1ML",form:"KIT",pack:1,bio:"Y",category:"RADIOPHARMACEUTICALS"},
  {atc:"V10XX03",desc:"Radium (223Ra) dichloride",nappi:"722864",name:"XOFIGO SOLUTION FOR INJECTION 6ML VIAL",strength:"",form:"UNIT",pack:1,bio:"",category:"RADIOPHARMACEUTICALS"},
];

// Unique values for filters
const CATEGORIES = [...new Set(DRUGS.map(d => d.category))].sort();
const FORMULATIONS = [...new Set(DRUGS.map(d => d.form))].filter(Boolean).sort();
const UNIQUE_INNS = [...new Set(DRUGS.map(d => d.desc))].sort();

const GEMS_GREEN = "#006838";
const GEMS_DARK = "#004d2a";
const GEMS_GOLD = "#c5a028";
const GEMS_LIGHT = "#e8f5e9";

function highlight(text, query) {
  if (!query || !text) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} style={{ background: "#fff3cd", color: "#333", borderRadius: 2, padding: "0 1px" }}>{part}</mark>
      : part
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [formFilter, setFormFilter] = useState("All");
  const [bioFilter, setBioFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const inputRef = useRef(null);
  const PAGE_SIZE = 25;

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { setPage(1); }, [query, catFilter, formFilter, bioFilter]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return DRUGS.filter(d => {
      if (catFilter !== "All" && d.category !== catFilter) return false;
      if (formFilter !== "All" && d.form !== formFilter) return false;
      if (bioFilter === "Yes" && d.bio !== "Y") return false;
      if (bioFilter === "No" && d.bio === "Y") return false;
      if (!q) return true;
      const tokens = q.split(/\s+/);
      const searchable = `${d.atc} ${d.desc} ${d.nappi} ${d.name} ${d.strength} ${d.form} ${d.category}`.toLowerCase();
      return tokens.every(t => searchable.includes(t));
    });
  }, [query, catFilter, formFilter, bioFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const uniqueINNs = [...new Set(filtered.map(d => d.desc))].length;
  const uniqueProducts = [...new Set(filtered.map(d => d.name.split(" ")[0]))].length;

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(170deg, #f0f7f2 0%, #fff 40%, #fafaf5 100%)`,
      fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${GEMS_GREEN} 0%, ${GEMS_DARK} 100%)`,
        padding: "0",
        borderBottom: `4px solid ${GEMS_GOLD}`,
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 4 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: `linear-gradient(135deg, ${GEMS_GOLD}, #d4b02e)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 18, color: GEMS_DARK, letterSpacing: -0.5,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}>
              GEMS
            </div>
            <div>
              <h1 style={{ margin: 0, color: "#fff", fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>
                Specialised Oncology Drug List
              </h1>
              <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
                December 2025 &middot; Medical Advisory Services Reference Tool
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 24px 40px" }}>
        {/* Search Bar */}
        <div style={{
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 2px 12px rgba(0,104,56,0.08), 0 1px 3px rgba(0,0,0,0.06)",
          padding: "20px 24px",
          marginBottom: 16,
          border: `1px solid rgba(0,104,56,0.1)`,
        }}>
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
              color: "#999", fontSize: 18, pointerEvents: "none",
            }}>
              &#128269;
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by drug name, trade name, NAPPI code, ATC code, or strength..."
              style={{
                width: "100%", boxSizing: "border-box",
                padding: "14px 16px 14px 48px",
                fontSize: 15, border: `2px solid #e0e0e0`, borderRadius: 10,
                outline: "none", transition: "border-color 0.2s",
                background: "#fafffe",
              }}
              onFocus={e => e.target.style.borderColor = GEMS_GREEN}
              onBlur={e => e.target.style.borderColor = "#e0e0e0"}
            />
            {query && (
              <button
                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "#eee", border: "none", borderRadius: "50%", width: 28, height: 28,
                  cursor: "pointer", fontSize: 14, color: "#666", display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 14, alignItems: "center" }}>
            <FilterSelect label="Category" value={catFilter} onChange={setCatFilter} options={["All", ...CATEGORIES]} />
            <FilterSelect label="Formulation" value={formFilter} onChange={setFormFilter} options={["All", ...FORMULATIONS]} />
            <FilterSelect label="Biological" value={bioFilter} onChange={setBioFilter} options={["All", "Yes", "No"]} />

            {(catFilter !== "All" || formFilter !== "All" || bioFilter !== "All") && (
              <button onClick={() => { setCatFilter("All"); setFormFilter("All"); setBioFilter("All"); }}
                style={{
                  padding: "6px 14px", fontSize: 12, color: GEMS_GREEN, background: GEMS_LIGHT,
                  border: `1px solid ${GEMS_GREEN}33`, borderRadius: 6, cursor: "pointer", fontWeight: 600,
                }}>
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16,
        }}>
          <StatBadge label="Results" value={filtered.length} accent={GEMS_GREEN} />
          <StatBadge label="Unique INNs" value={uniqueINNs} accent={GEMS_DARK} />
          <StatBadge label="Products" value={uniqueProducts} accent={GEMS_GOLD} />
          <StatBadge label="Biologicals" value={filtered.filter(d => d.bio === "Y").length} accent="#e65100" />
        </div>

        {/* Table */}
        <div style={{
          background: "#fff", borderRadius: 14, overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,104,56,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          border: `1px solid rgba(0,104,56,0.08)`,
        }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: `linear-gradient(135deg, ${GEMS_GREEN}, ${GEMS_DARK})` }}>
                  {["ATC Code", "INN (Generic)", "Trade Name / Description", "Strength", "Form", "Pack", "Bio"].map((h, i) => (
                    <th key={i} style={{
                      padding: "12px 14px", textAlign: "left", color: "#fff", fontWeight: 600,
                      fontSize: 12, letterSpacing: 0.3, whiteSpace: "nowrap",
                      borderBottom: `3px solid ${GEMS_GOLD}`,
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: 48, textAlign: "center", color: "#999" }}>
                      <div style={{ fontSize: 36, marginBottom: 8 }}>&#128270;</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#666" }}>No drugs found</div>
                      <div style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your search terms or filters</div>
                    </td>
                  </tr>
                ) : paged.map((d, i) => {
                  const idx = (page - 1) * PAGE_SIZE + i;
                  const isExpanded = expandedRow === idx;
                  return (
                    <tr key={idx}
                      onClick={() => setExpandedRow(isExpanded ? null : idx)}
                      style={{
                        background: isExpanded ? GEMS_LIGHT : i % 2 === 0 ? "#fff" : "#fafffe",
                        cursor: "pointer",
                        transition: "background 0.15s",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                      onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = "#f0faf3"; }}
                      onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafffe"; }}
                    >
                      <td style={{ padding: "10px 14px", fontFamily: "monospace", fontSize: 12, color: "#555", whiteSpace: "nowrap" }}>
                        {highlight(d.atc, query)}
                      </td>
                      <td style={{ padding: "10px 14px", fontWeight: 600, color: GEMS_DARK }}>
                        {highlight(d.desc, query)}
                      </td>
                      <td style={{ padding: "10px 14px", maxWidth: 340 }}>
                        <div style={{ fontWeight: 500 }}>{highlight(d.name, query)}</div>
                        {isExpanded && (
                          <div style={{
                            marginTop: 8, padding: "10px 12px", background: "#fff",
                            borderRadius: 8, border: `1px solid ${GEMS_GREEN}22`,
                            fontSize: 12, lineHeight: 1.7,
                          }}>
                            <div><strong>NAPPI:</strong> {d.nappi}</div>
                            <div><strong>ATC Code:</strong> {d.atc}</div>
                            <div><strong>Category:</strong> {d.category}</div>
                            <div><strong>Strength:</strong> {d.strength || "—"}</div>
                            <div><strong>Formulation:</strong> {d.form}</div>
                            <div><strong>Pack Size:</strong> {d.pack}</div>
                            <div><strong>Biological:</strong> {d.bio === "Y" ? "Yes" : "No"}</div>
                            {d.name.includes("SECTION 21") && (
                              <div style={{ marginTop: 6, padding: "4px 8px", background: "#fff3e0", borderRadius: 4, color: "#e65100", fontWeight: 600, display: "inline-block" }}>
                                ⚠ Section 21 — Unregistered Medicine
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>{highlight(d.strength, query) || "—"}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <span style={{
                          padding: "3px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600,
                          background: d.form === "TAB" ? "#e3f2fd" : d.form === "CAP" ? "#f3e5f5" : d.form === "INJ" ? "#fce4ec" : d.form === "INF" ? "#fff3e0" : "#f5f5f5",
                          color: d.form === "TAB" ? "#1565c0" : d.form === "CAP" ? "#7b1fa2" : d.form === "INJ" ? "#c62828" : d.form === "INF" ? "#e65100" : "#616161",
                        }}>
                          {d.form}
                        </span>
                      </td>
                      <td style={{ padding: "10px 14px", textAlign: "center" }}>{d.pack}</td>
                      <td style={{ padding: "10px 14px", textAlign: "center" }}>
                        {d.bio === "Y" && (
                          <span style={{
                            display: "inline-block", padding: "3px 8px", borderRadius: 4,
                            fontSize: 11, fontWeight: 700, background: "#e8f5e9", color: GEMS_GREEN,
                            border: `1px solid ${GEMS_GREEN}44`,
                          }}>BIO</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
              borderTop: "1px solid #f0f0f0", background: "#fafffe",
            }}>
              <span style={{ fontSize: 12, color: "#888" }}>
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
              </span>
              <div style={{ display: "flex", gap: 6 }}>
                <PageBtn disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Prev</PageBtn>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let p;
                  if (totalPages <= 7) p = i + 1;
                  else if (page <= 4) p = i + 1;
                  else if (page >= totalPages - 3) p = totalPages - 6 + i;
                  else p = page - 3 + i;
                  return (
                    <PageBtn key={p} active={page === p} onClick={() => setPage(p)}>{p}</PageBtn>
                  );
                })}
                <PageBtn disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next →</PageBtn>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div style={{
          marginTop: 20, padding: "16px 20px", background: "#fffde7", borderRadius: 10,
          border: "1px solid #fff9c4", fontSize: 12, color: "#666", lineHeight: 1.7,
        }}>
          <strong style={{ color: "#f57f17" }}>&#9888; Disclaimer:</strong> Products included in this Specialised Drug List may be funded if authorised by the relevant Managed Healthcare Programme.
          Reimbursement is subject to clinical guidelines, protocols, and benefit limits as per scheme option.
          This is a reference tool for internal GEMS use — <strong>December 2025</strong> edition.
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#555" }}>{label}:</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          padding: "6px 10px", fontSize: 12, borderRadius: 6,
          border: "1px solid #ddd", background: "#fff", cursor: "pointer",
          color: "#333", outline: "none",
        }}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function StatBadge({ label, value, accent }) {
  return (
    <div style={{
      padding: "8px 16px", borderRadius: 8, background: "#fff",
      border: `1px solid ${accent}22`, display: "flex", alignItems: "center", gap: 8,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}>
      <span style={{ fontSize: 20, fontWeight: 800, color: accent, fontFamily: "monospace" }}>{value}</span>
      <span style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
    </div>
  );
}

function PageBtn({ children, disabled, active, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "6px 12px", fontSize: 12, fontWeight: active ? 700 : 500, borderRadius: 6, cursor: disabled ? "default" : "pointer",
        background: active ? GEMS_GREEN : disabled ? "#f5f5f5" : "#fff",
        color: active ? "#fff" : disabled ? "#ccc" : "#333",
        border: active ? "none" : "1px solid #ddd",
        transition: "all 0.15s",
      }}
    >
      {children}
    </button>
  );
}
