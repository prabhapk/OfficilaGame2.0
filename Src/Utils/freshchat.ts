import { NativeModules } from "react-native";
import { FRESHCHAT_APP_ID, FRESHCHAT_APP_KEY, FRESHCHAT_DOMAIN } from "../Config/freshchat";

type FreshchatUser = {
  firstName?: string;
  lastName?: string;
  name?: string; // convenience, will be split
  email?: string;
  phone?: string;
  phoneCountryCode?: string; // e.g. +91
  externalId?: string; // your user id
  properties?: Record<string, string | number | boolean>;
};

const hasNativeFreshchat = Boolean((NativeModules as any)?.RNFreshchatSdk);

function getSdk() {
  if (!hasNativeFreshchat) return null as any;
  // dynamic require to avoid crashes when running where native module is absent
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Freshchat, FreshchatConfig } = require("react-native-freshchat-sdk");
  return { Freshchat, FreshchatConfig };
}

export function initFreshchat(appId: string = FRESHCHAT_APP_ID, appKey: string = FRESHCHAT_APP_KEY, domain: string = FRESHCHAT_DOMAIN) {
  const sdk = getSdk();
  if (!sdk) return;
  const { Freshchat, FreshchatConfig } = sdk;
  const cfg = new FreshchatConfig(appId, appKey);
  if (domain) cfg.domain = domain;
  try {
    Freshchat.init(cfg);
  } catch {}
}

export async function setFreshchatUser(user: FreshchatUser) {
  const sdk = getSdk();
  if (!sdk) return;
  const { Freshchat } = sdk;

  const payload: any = {};
  if (user.firstName || user.lastName) {
    if (user.firstName) payload.firstName = user.firstName;
    if (user.lastName) payload.lastName = user.lastName;
  } else if (user.name) {
    const parts = user.name.split(" ");
    payload.firstName = parts.shift() || user.name;
    payload.lastName = parts.join(" ");
  }
  if (user.email) payload.email = user.email;
  if (user.phone) payload.phone = user.phone;
  if (user.phoneCountryCode) payload.phoneCountryCode = user.phoneCountryCode;

  try {
    if (Object.keys(payload).length > 0) {
      Freshchat.setUser(payload);
    }
    if (user.externalId) {
      // Pass null restoreId for first-time mapping; Freshchat will generate one
      Freshchat.identifyUser(user.externalId, null);
    }
    if (user.properties && Object.keys(user.properties).length) {
      Freshchat.setUserProperties(user.properties);
    }
  } catch {}
}

export function openFreshchat() {
  const sdk = getSdk();
  if (!sdk) return;
  const { Freshchat } = sdk;
  try {
    Freshchat.showConversations();
  } catch {}
}


