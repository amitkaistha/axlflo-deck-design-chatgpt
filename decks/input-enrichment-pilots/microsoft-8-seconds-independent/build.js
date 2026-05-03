"use strict";

process.env.AXLFLO_DECK_DIR = "decks/input-enrichment-pilots/microsoft-8-seconds-independent";
process.env.AXLFLO_OUTPUT_BASENAME = "microsoft_8_seconds_independent_v3";

require("../../shift-to-scale-json/build_from_json");
