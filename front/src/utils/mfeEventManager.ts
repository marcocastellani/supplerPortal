import { MicrofrontendEventsManager } from "@remira/ucpaccelerator_unified_utils";
import i18n from "../i18n";

export const mfeEventManager = new MicrofrontendEventsManager();

i18n.on("languageChanged", (lng: string) => {
  mfeEventManager.emitLanguageChanged(lng);
});
