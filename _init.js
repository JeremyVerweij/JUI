var JUI = {};
JLIB.extensions.JUI = JUI;

var JUI_SRC = [
    {src: "canvas/uiCanvas", requirements: [], enabled: () => true},
];

JLIB_LOADER.LOAD_EXTENSION_SRC_LIST(JUI_SRC, "JUI");