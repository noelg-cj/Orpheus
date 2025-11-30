export type themeName = "orpheus" | "light" | "dark";

export type Settings = {
    theme: themeName;
}

export type SettingsFile = {
    version: 1;
    settings: Settings;
}