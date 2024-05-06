var JUI = {};
JLIB.extensions.JUI = JUI;

var JUI_SRC = [
    {src: "canvas/uiCanvas", requirements: [], enabled: () => true},
    {src: "canvas/button", requirements: ["canvas/uiCanvas"], enabled: () => true},
    {src: "canvas/progressBar", requirements: ["canvas/uiCanvas"], enabled: () => true},
    {src: "canvas/checkBox", requirements: ["canvas/uiCanvas"], enabled: () => true},
    {src: "canvas/selectionBox", requirements: ["canvas/uiCanvas"], enabled: () => true},
    {src: "canvas/hoverText", requirements: ["canvas/uiCanvas"], enabled: () => true},
    {src: "canvas/appendedText", requirements: ["canvas/uiCanvas"], enabled: () => true},
];

JLIB_LOADER.LOAD_EXTENSION_SRC_LIST(JUI_SRC, "JUI");