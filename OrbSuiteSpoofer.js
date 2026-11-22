/**
 * @name OrbSuiteSpoofer
 * @description Opens a working menu to control Orbs, Nitro perks, and 100-device spoofer in Revenge/Vendetta.
 * @author KingSpikey
 * @version 3.0.0
 */
const api = globalThis.revenge ?? globalThis.vendetta ?? globalThis.bunny;

const TIER_LABEL = { 1: "Nitro Classic", 2: "Nitro", 3: "Nitro Basic" };
const TIER_CYCLE = { 2: 3, 3: 1, 1: 2 };

const BASE_DEVICES = [
  { id: "iphone-16-pro-max", label: "iPhone 16 Pro Max", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
  { id: "iphone-16-pro", label: "iPhone 16 Pro", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
  { id: "iphone-16", label: "iPhone 16", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
  { id: "iphone-15-pro-max", label: "iPhone 15 Pro Max", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
  { id: "iphone-15-pro", label: "iPhone 15 Pro", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
  { id: "iphone-15", label: "iPhone 15", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
  { id: "iphone-14-pro-max", label: "iPhone 14 Pro Max", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
  { id: "iphone-14-pro", label: "iPhone 14 Pro", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
  { id: "iphone-14", label: "iPhone 14", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
  { id: "iphone-13-pro", label: "iPhone 13 Pro", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
  { id: "iphone-13-mini", label: "iPhone 13 mini", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
  { id: "iphone-se-3", label: "iPhone SE (3rd Gen)", os: "iOS", browser: "Discord iOS", clientType: "Mobile" },
  { id: "ipad-pro-m4-13", label: "iPad Pro 13 (M4)", os: "iPadOS", browser: "Discord iOS", clientType: "Tablet" },
  { id: "ipad-pro-m4-11", label: "iPad Pro 11 (M4)", os: "iPadOS", browser: "Discord iOS", clientType: "Tablet" },
  { id: "ipad-air-m2", label: "iPad Air (M2)", os: "iPadOS", browser: "Discord iOS", clientType: "Tablet" },
  { id: "ipad-mini-7", label: "iPad mini (A17 Pro)", os: "iPadOS", browser: "Discord iOS", clientType: "Tablet" },
  { id: "galaxy-s25-ultra", label: "Galaxy S25 Ultra", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "galaxy-s25-plus", label: "Galaxy S25+", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "galaxy-s25", label: "Galaxy S25", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "galaxy-s24-ultra", label: "Galaxy S24 Ultra", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "galaxy-s24", label: "Galaxy S24", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "galaxy-z-fold-6", label: "Galaxy Z Fold6", os: "Android", browser: "Discord Android", clientType: "Foldable" },
  { id: "galaxy-z-flip-6", label: "Galaxy Z Flip6", os: "Android", browser: "Discord Android", clientType: "Foldable" },
  { id: "galaxy-a55-5g", label: "Galaxy A55 5G", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "galaxy-a35-5g", label: "Galaxy A35 5G", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "galaxy-a16-5g", label: "Galaxy A16 5G", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "galaxy-tab-s10-ultra", label: "Galaxy Tab S10 Ultra", os: "Android", browser: "Discord Android", clientType: "Tablet" },
  { id: "pixel-9-pro-xl", label: "Pixel 9 Pro XL", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "pixel-9-pro", label: "Pixel 9 Pro", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "pixel-9", label: "Pixel 9", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "pixel-9-pro-fold", label: "Pixel 9 Pro Fold", os: "Android", browser: "Discord Android", clientType: "Foldable" },
  { id: "pixel-8a", label: "Pixel 8a", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "oneplus-13", label: "OnePlus 13", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "oneplus-12", label: "OnePlus 12", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "nothing-phone-2a", label: "Nothing Phone (2a)", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "sony-xperia-1-vi", label: "Sony Xperia 1 VI", os: "Android", browser: "Discord Android", clientType: "Mobile" },
  { id: "rog-phone-8-pro", label: "ASUS ROG Phone 8 Pro", os: "Android", browser: "Discord Android", clientType: "Gaming Mobile" },
  { id: "redmagic-9s-pro", label: "RedMagic 9S Pro", os: "Android", browser: "Discord Android", clientType: "Gaming Mobile" },
  { id: "quest-2", label: "Meta Quest 2", os: "Android", browser: "Horizon OS", clientType: "VR" },
  { id: "quest-3", label: "Meta Quest 3", os: "Android", browser: "Horizon OS", clientType: "VR" },
  { id: "quest-3s", label: "Meta Quest 3S", os: "Android", browser: "Horizon OS", clientType: "VR" },
  { id: "quest-pro", label: "Meta Quest Pro", os: "Android", browser: "Horizon OS", clientType: "VR" },
  { id: "ps5-pro", label: "PlayStation 5 Pro", os: "Orbis", browser: "Discord Console", clientType: "Console" },
  { id: "ps5-slim", label: "PlayStation 5 Slim", os: "Orbis", browser: "Discord Console", clientType: "Console" },
  { id: "xbox-series-x", label: "Xbox Series X", os: "Xbox", browser: "Discord Console", clientType: "Console" },
  { id: "xbox-series-s", label: "Xbox Series S", os: "Xbox", browser: "Discord Console", clientType: "Console" },
  { id: "steam-deck-oled", label: "Steam Deck OLED", os: "Linux", browser: "Discord Client", clientType: "Handheld" },
  { id: "rog-ally-x", label: "ASUS ROG Ally X", os: "Windows", browser: "Discord Client", clientType: "Handheld" },
  { id: "win11-desktop", label: "Windows 11 Desktop", os: "Windows", browser: "Discord Client", clientType: "Desktop" },
  { id: "macos-sequoia-mbp", label: "MacBook Pro (macOS)", os: "Mac OS X", browser: "Discord Client", clientType: "Desktop" },
  { id: "ubuntu-desktop", label: "Ubuntu Linux Desktop", os: "Linux", browser: "Discord Client", clientType: "Desktop" },
  { id: "chrome-web", label: "Google Chrome Web", os: "Windows", browser: "Chrome", clientType: "Web" },
];

const EXTRA_MODELS = [
  ["iPhone 12 Pro", "iOS", "Discord iOS", "Mobile"],
  ["iPhone 11", "iOS", "Discord iOS", "Mobile"],
  ["iPad Air (5th Gen)", "iPadOS", "Discord iOS", "Tablet"],
  ["iPad (10th Gen)", "iPadOS", "Discord iOS", "Tablet"],
  ["Galaxy S23 Ultra", "Android", "Discord Android", "Mobile"],
  ["Galaxy S23+", "Android", "Discord Android", "Mobile"],
  ["Galaxy S23", "Android", "Discord Android", "Mobile"],
  ["Galaxy S22 Ultra", "Android", "Discord Android", "Mobile"],
  ["Galaxy A54 5G", "Android", "Discord Android", "Mobile"],
  ["Galaxy A25 5G", "Android", "Discord Android", "Mobile"],
  ["Galaxy A15 5G", "Android", "Discord Android", "Mobile"],
  ["Galaxy Z Fold5", "Android", "Discord Android", "Foldable"],
  ["Galaxy Z Flip5", "Android", "Discord Android", "Foldable"],
  ["Galaxy Tab S9", "Android", "Discord Android", "Tablet"],
  ["Galaxy Tab A9+", "Android", "Discord Android", "Tablet"],
  ["Pixel 8 Pro", "Android", "Discord Android", "Mobile"],
  ["Pixel 8", "Android", "Discord Android", "Mobile"],
  ["Pixel 7a", "Android", "Discord Android", "Mobile"],
  ["Pixel Fold", "Android", "Discord Android", "Foldable"],
  ["Pixel Tablet", "Android", "Discord Android", "Tablet"],
  ["OnePlus 12R", "Android", "Discord Android", "Mobile"],
  ["OnePlus Nord 4", "Android", "Discord Android", "Mobile"],
  ["Nothing Phone (2)", "Android", "Discord Android", "Mobile"],
  ["Nothing Phone (1)", "Android", "Discord Android", "Mobile"],
  ["Motorola Edge 50 Pro", "Android", "Discord Android", "Mobile"],
  ["Motorola Razr+ (2024)", "Android", "Discord Android", "Foldable"],
  ["Xiaomi 14 Ultra", "Android", "Discord Android", "Mobile"],
  ["Xiaomi 14", "Android", "Discord Android", "Mobile"],
  ["Redmi Note 13 Pro+", "Android", "Discord Android", "Mobile"],
  ["POCO F6 Pro", "Android", "Discord Android", "Mobile"],
  ["Realme GT 6", "Android", "Discord Android", "Mobile"],
  ["Vivo X100 Pro", "Android", "Discord Android", "Mobile"],
  ["OPPO Find X7 Ultra", "Android", "Discord Android", "Mobile"],
  ["Honor Magic6 Pro", "Android", "Discord Android", "Mobile"],
  ["Fairphone 5", "Android", "Discord Android", "Mobile"],
  ["Lenovo Legion Go", "Windows", "Discord Client", "Handheld"],
  ["MSI Claw A1M", "Windows", "Discord Client", "Handheld"],
  ["MacBook Air M3", "Mac OS X", "Discord Client", "Desktop"],
  ["Mac mini M4", "Mac OS X", "Discord Client", "Desktop"],
  ["iMac 24 M3", "Mac OS X", "Discord Client", "Desktop"],
  ["Windows 10 Workstation", "Windows", "Discord Client", "Desktop"],
  ["Windows 11 Gaming Rig", "Windows", "Discord Client", "Desktop"],
  ["Arch Linux Desktop", "Linux", "Discord Client", "Desktop"],
  ["Fedora Workstation", "Linux", "Discord Client", "Desktop"],
  ["ChromeOS Chromebook", "Chrome OS", "Chrome", "Web"],
  ["Firefox Web Client", "Windows", "Firefox", "Web"],
  ["Edge Web Client", "Windows", "Edge", "Web"],
  ["Safari iOS Web", "iOS", "Mobile Safari", "Web"],
];

const DEVICE_PRESETS = BASE_DEVICES.concat(
  EXTRA_MODELS.map(([label, os, browser, clientType], idx) => ({
    id: `dev-${String(idx + BASE_DEVICES.length + 1).padStart(3, "0")}`,
    label,
    os,
    browser,
    clientType,
  }))
).slice(0, 100);

const DEFAULTS = {
  enabled: true,
  orbBalance: 5000,
  nitroPerks: true,
  tier: 2,
  deviceSpoof: true,
  devicePreset: 0,
};

let state = { ...DEFAULTS };
let patches = [];
let unregisters = [];
let ownId = null;

function lookup(...candidates) {
  const findByProps = api?.metro?.findByProps;
  if (typeof findByProps !== "function") return null;
  for (const props of candidates) {
    try {
      const mod = findByProps(...props);
      if (mod) return mod;
    } catch {}
  }
  return null;
}

function toast(msg, icon) {
  try {
    if (typeof api?.ui?.showToast === "function") {
      api.ui.showToast(msg, icon);
      return;
    }
  } catch {}
  try {
    const Toasts = lookup(["showToast"], ["open"]);
    if (typeof Toasts?.showToast === "function") {
      Toasts.showToast({ content: msg });
      return;
    }
  } catch {}
  console.log("[OrbSuiteSpoofer]", msg);
}

function getOwnId(store) {
  try {
    const s = store ?? lookup(["getCurrentUser", "getUser"], ["getCurrentUser"]);
    const id = s?.getCurrentUser?.()?.id;
    if (id != null) ownId = id;
  } catch {}
  return ownId;
}

function hook(target, method, cb) {
  if (!target || typeof target[method] !== "function" || !api?.patcher) return false;
  try {
    const unpatch =
      typeof api.patcher.after === "function"
        ? api.patcher.after(target, method, (args, res) => cb(Array.isArray(args) ? args : [], res))
        : typeof api.patcher.hook === "function"
        ? api.patcher.hook(target, method, (_self, args, res) => cb(Array.isArray(args) ? args : [], res))
        : null;
    if (typeof unpatch === "function") {
      patches.push(unpatch);
      return true;
    }
  } catch {}
  return false;
}

function saveState() {
  try {
    if (typeof api?.storage?.set === "function") {
      api.storage.set("state", { ...state });
    } else if (api?.storage) {
      api.storage.state = { ...state };
    }
  } catch {}
}

function loadState() {
  try {
    if (typeof api?.storage?.get === "function") {
      const val = api.storage.get("state", DEFAULTS);
      if (val && typeof val === "object" && typeof val.then !== "function") {
        state = { ...DEFAULTS, ...val };
      }
    } else if (api?.storage?.state && typeof api.storage.state === "object") {
      state = { ...DEFAULTS, ...api.storage.state };
    }
  } catch {}
}

function applyEffects() {
  for (const fn of patches.splice(0)) {
    try {
      fn();
    } catch {}
  }

  globalThis.__ORB_SUITE__ = {
    orbBalance: state.orbBalance,
    nitroPerks: state.nitroPerks,
    tier: state.tier,
    deviceSpoof: state.deviceSpoof,
    device: DEVICE_PRESETS[state.devicePreset] ?? DEVICE_PRESETS[0],
  };

  if (!state.enabled || !api?.patcher || !api?.metro) return;

  const userStore = lookup(["getCurrentUser", "getUser"], ["getCurrentUser"]);
  if (userStore && state.nitroPerks) {
    getOwnId(userStore);
    const applyUser = (u) => {
      if (!u || typeof u !== "object" || u.id !== getOwnId(userStore)) return u;
      u.premiumType = state.tier;
      return u;
    };
    hook(userStore, "getCurrentUser", (_args, res) => applyUser(res));
    hook(userStore, "getUser", (args, res) => (args[0] === getOwnId(userStore) ? applyUser(res) : res));
  }

  if (state.nitroPerks) {
    const perkMod = lookup(
      ["canUseEmojisEverywhere"],
      ["canUseAnimatedEmojis"],
      ["canUseStickersEverywhere"],
      ["canStreamHighQuality"]
    );
    if (perkMod) {
      for (const m of [
        "canUseEmojisEverywhere",
        "canUseAnimatedEmojis",
        "canUseExternalEmojis",
        "canUseStickersEverywhere",
        "canUseExternalStickers",
        "canUseAppIcons",
        "canUseSoundboardEverywhere",
        "canStreamHighQuality",
      ]) {
        hook(perkMod, m, (_args, res) => (state.enabled && state.nitroPerks ? true : res));
      }
    }
  }

  if (state.deviceSpoof) {
    const dev = DEVICE_PRESETS[state.devicePreset] ?? DEVICE_PRESETS[0];
    const devMod = lookup(["getOS", "getDevice"], ["getPlatform", "isMobile"]);
    if (devMod) {
      for (const m of ["getOS", "getPlatformName", "getPlatform"]) {
        hook(devMod, m, (_args, res) => (state.enabled && state.deviceSpoof ? dev.os : res));
      }
      for (const m of ["getDevice", "getDeviceModel"]) {
        hook(devMod, m, (_args, res) => (state.enabled && state.deviceSpoof ? dev.label : res));
      }
    }
  }

  try {
    api?.flux?.dispatch?.({ type: "CURRENT_USER_UPDATE" });
  } catch {}
}

function addOrbs(amount, onDone) {
  state.orbBalance = Math.max(0, state.orbBalance + amount);
  saveState();
  applyEffects();
  toast(`Orbs: ${state.orbBalance.toLocaleString()}`);
  if (typeof onDone === "function") onDone();
}

function toggleNitroPerks(onDone) {
  state.nitroPerks = !state.nitroPerks;
  saveState();
  applyEffects();
  toast(`Nitro Perks: ${state.nitroPerks ? "ON" : "OFF"}`);
  if (typeof onDone === "function") onDone();
}

function cycleNitroTier(onDone) {
  state.tier = TIER_CYCLE[state.tier] ?? 2;
  saveState();
  applyEffects();
  toast(`Tier: ${TIER_LABEL[state.tier] ?? "Nitro"}`);
  if (typeof onDone === "function") onDone();
}

function cycleDevice(step = 1, onDone) {
  state.deviceSpoof = true;
  state.devicePreset = (state.devicePreset + step + DEVICE_PRESETS.length) % DEVICE_PRESETS.length;
  saveState();
  applyEffects();
  const d = DEVICE_PRESETS[state.devicePreset];
  toast(`Device (${state.devicePreset + 1}/100): ${d.label}`);
  if (typeof onDone === "function") onDone();
}

function openNativeMenu() {
  const dev = DEVICE_PRESETS[state.devicePreset] ?? DEVICE_PRESETS[0];
  const summary = [
    `Orbs: ${state.orbBalance.toLocaleString()}`,
    `Nitro Perks: ${state.nitroPerks ? "ON" : "OFF"} (${TIER_LABEL[state.tier] ?? "Nitro"})`,
    `Device Spoof (${state.devicePreset + 1}/100): ${state.deviceSpoof ? dev.label : "OFF"}`,
  ].join("
");

  const Alert = lookup(["alert", "prompt"], ["Alert"]) ?? globalThis.Alert;
  if (Alert && typeof Alert.alert === "function") {
    Alert.alert("OrbSuite Menu", summary, [
      { text: "+2,500 Orbs", onPress: () => addOrbs(2500) },
      { text: state.nitroPerks ? "Nitro Perks: OFF" : "Nitro Perks: ON", onPress: () => toggleNitroPerks() },
      { text: "Cycle Tier", onPress: () => cycleNitroTier() },
      { text: "Next Device", onPress: () => cycleDevice(1) },
      { text: "Close", style: "cancel" },
    ]);
    return true;
  }

  toast(summary.replace(/
/g, " · "));
  return true;
}

function getUI() {
  const React = api?.metro?.common?.React ?? globalThis.React ?? lookup(["createElement", "useState"]);
  const raw = api?.ui?.components ?? {};
  const RN = lookup(["ScrollView", "View", "Text"], ["TouchableOpacity"]) ?? {};

  const Row = (props = {}) => {
    if (!React?.createElement) return null;
    const Text = raw.FormText ?? raw.Text ?? RN.Text ?? "span";
    const View = raw.View ?? RN.View ?? "div";
    const Press = raw.TouchableOpacity ?? RN.TouchableOpacity ?? View;
    return React.createElement(
      Press,
      {
        onPress: props.onPress,
        style: {
          paddingVertical: 12,
          paddingHorizontal: 14,
          backgroundColor: "#14141e",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#2d2447",
          marginBottom: 8,
        },
      },
      React.createElement(Text, { style: { fontWeight: "700", color: "#f5f3ff" } }, props.label || ""),
      props.subLabel
        ? React.createElement(Text, { style: { color: "#c4b5fd", fontSize: 12, marginTop: 2 } }, props.subLabel)
        : null
    );
  };

  const SwitchRow = (props = {}) => {
    if (!React?.createElement) return null;
    const Text = raw.FormText ?? raw.Text ?? RN.Text ?? "span";
    const View = raw.View ?? RN.View ?? "div";
    const Press = raw.TouchableOpacity ?? RN.TouchableOpacity ?? View;
    return React.createElement(
      Press,
      {
        onPress: () => props.onValueChange?.(!props.value),
        style: {
          paddingVertical: 12,
          paddingHorizontal: 14,
          backgroundColor: props.value ? "#1e1536" : "#12121a",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: props.value ? "#7c3aed" : "#262638",
          marginBottom: 8,
        },
      },
      React.createElement(
        Text,
        { style: { fontWeight: "700", color: props.value ? "#ede9fe" : "#e5e7eb" } },
        `${props.label || ""}  [${props.value ? "ON" : "OFF"}]`
      ),
      props.subLabel
        ? React.createElement(Text, { style: { color: "#9ca3af", fontSize: 12, marginTop: 2 } }, props.subLabel)
        : null
    );
  };

  const Section = (props = {}) => {
    if (!React?.createElement) return null;
    const Text = raw.FormText ?? raw.Text ?? RN.Text ?? "span";
    const View = raw.View ?? RN.View ?? "div";
    const Scroll = raw.ScrollView ?? RN.ScrollView ?? View;
    return React.createElement(
      Scroll,
      {
        style: { flex: 1, backgroundColor: "#0a0a0f", padding: 12 },
        contentContainerStyle: { paddingBottom: 32 },
      },
      props.title
        ? React.createElement(
            Text,
            {
              style: {
                color: "#c4b5fd",
                fontSize: 12,
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: 0.8,
                marginTop: 6,
                marginBottom: 8,
              },
            },
            props.title
          )
        : null,
      props.children
    );
  };

  return {
    React,
    Section: raw.FormSection ?? Section,
    Row: raw.FormRow ?? Row,
    SwitchRow: raw.FormSwitchRow ?? SwitchRow,
  };
}

function Settings() {
  const { React, Section, Row, SwitchRow } = getUI();
  if (!React?.createElement) return null;

  const h = React.createElement;
  const [, bump] = React.useState(0);
  const refresh = () => bump((n) => n + 1);
  const dev = DEVICE_PRESETS[state.devicePreset] ?? DEVICE_PRESETS[0];

  return h(
    Section,
    { title: "OrbSuite Menu" },
    h(Row, {
      label: "Open Popup Menu",
      subLabel: "Opens native menu anywhere",
      onPress: () => openNativeMenu(),
    }),
    h(Row, {
      label: `Orbs: ${state.orbBalance.toLocaleString()}`,
      subLabel: "Tap to add +2,500 Orbs",
      onPress: () => addOrbs(2500, refresh),
    }),
    h(Row, {
      label: "Add +10,000 Orbs",
      subLabel: "Tap to add +10,000 Orbs",
      onPress: () => addOrbs(10000, refresh),
    }),
    h(SwitchRow, {
      label: "Nitro Perks",
      subLabel: "Toggle Nitro perks & tier preview",
      value: Boolean(state.nitroPerks),
      onValueChange: (v) => {
        state.nitroPerks = Boolean(v);
        saveState();
        applyEffects();
        refresh();
      },
    }),
    h(Row, {
      label: `Nitro Tier: ${TIER_LABEL[state.tier] ?? "Nitro"}`,
      subLabel: "Tap to cycle Nitro tier",
      onPress: () => cycleNitroTier(refresh),
    }),
    h(SwitchRow, {
      label: "Device Spoofer (100 Presets)",
      subLabel: `Preset ${state.devicePreset + 1}/100: ${dev.label} (${dev.os})`,
      value: Boolean(state.deviceSpoof),
      onValueChange: (v) => {
        state.deviceSpoof = Boolean(v);
        saveState();
        applyEffects();
        refresh();
      },
    }),
    h(Row, {
      label: `Next Device (${state.devicePreset + 1}/100)`,
      subLabel: `${dev.label} · ${dev.os} (${dev.clientType})`,
      onPress: () => cycleDevice(1, refresh),
    }),
    h(Row, {
      label: "Jump +10 Devices",
      subLabel: `Currently #${state.devicePreset + 1}: ${dev.label}`,
      onPress: () => cycleDevice(10, refresh),
    })
  );
}

function registerSlashCommand() {
  try {
    const reg = api?.commands?.registerCommand;
    if (typeof reg !== "function") return;
    const unreg = reg({
      name: "orbmenu",
      displayName: "orbmenu",
      description: "Open OrbSuite menu for Orbs, Nitro perks, and Device Spoofer",
      options: [],
      execute: () => {
        openNativeMenu();
        return { content: "Opened OrbSuite menu." };
      },
    });
    if (typeof unreg === "function") unregisters.push(unreg);
  } catch {}
}

export default {
  onLoad() {
    loadState();
    applyEffects();
    registerSlashCommand();
    globalThis.openOrbMenu = openNativeMenu;
  },
  onUnload() {
    for (const fn of patches.splice(0)) {
      try {
        fn();
      } catch {}
    }
    for (const fn of unregisters.splice(0)) {
      try {
        fn();
      } catch {}
    }
    delete globalThis.__ORB_SUITE__;
    delete globalThis.openOrbMenu;
  },
  openMenu: openNativeMenu,
  settings: Settings,
};
