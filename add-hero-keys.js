// add-hero-keys.js
// Run once from your project root:  node add-hero-keys.js
//
// Adds the new hero step/feature/closing keys to every locale file
// (all languages except en) using English text as a placeholder,
// WITHOUT touching any existing translated keys. Safe to re-run —
// it skips any key that's already present in a file.

const fs = require("fs");
const path = require("path");

const LOCALES_DIR = path.join(__dirname, "locales");

// Source of truth for the new keys — same English text used in en.json.
// Edit this object if you want to tweak the placeholder wording.
const NEW_HOME_KEYS = {
  step1_title: "Upload your document",
  step1_tag: "PDF, JPG, PNG",
  step2_title: "Choose print settings",
  step2_tag: "Copies · Paper · Quality",
  step3_title: "Enter delivery address",
  step3_tag: "Across India",
  step4_title: "We print, dispatch & notify",
  step4_tag: "SMS / Email update",
  feature_economical_title: "Economical",
  feature_economical_desc: "Best prices always",
  feature_secure_title: "Secure",
  feature_secure_desc: "Your documents are safe",
  feature_fast_title: "Fast service",
  feature_fast_desc: "Quick printing & delivery",
  feature_reach_title: "All India reach",
  feature_reach_desc: "Delivering to every pincode",
  closing_line:
    "Documents, forms, certificates or anything important — we print and send it to your loved ones anywhere in India, economically.",
  closing_strong: "Simple steps. Trusted service. Right to your doorstep.",
};

function run() {
  const files = fs
    .readdirSync(LOCALES_DIR)
    .filter((f) => f.endsWith(".json"));

  let touched = 0;

  for (const file of files) {
    const filePath = path.join(LOCALES_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");

    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.error(`✗ ${file}: invalid JSON, skipped (${err.message})`);
      continue;
    }

    if (!data.home) data.home = {};

    let addedAny = false;
    for (const [key, value] of Object.entries(NEW_HOME_KEYS)) {
      if (!(key in data.home)) {
        data.home[key] = value;
        addedAny = true;
      }
    }

    if (addedAny) {
      // Pretty-print with 2-space indent, trailing newline, UTF-8 (no BOM)
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
      console.log(`✓ ${file}: added missing keys`);
      touched++;
    } else {
      console.log(`- ${file}: already up to date, skipped`);
    }
  }

  console.log(`\nDone. Updated ${touched} of ${files.length} files.`);
  console.log(
    "Note: new keys are in ENGLISH as a placeholder — have a native speaker translate them per language when possible."
  );
}

run();
