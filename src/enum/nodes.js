export const FIELD_TYPES = {
    TEXT: "text",
    SELECT: "select"
}
export const FIELD_VALUES = {
    INPUT_NAME: "inputName",
    INPUT_TYPE: "inputType",
    TEXT: "text",
    URL: "url",
    FORMAT: "format",
    CONDITION: "condition",
    LEVEL: "level",
    ENDPOINT: "endpoint",
    METHOD: "method",
    EXPRESSION: "expression"
}

export const NODE_TYPES = {
    INPUT: "customInput",
    OUTPUT: "customOutput",
    LLM_NODES: "llm",
    TEXT_NODES: "text",
    DATA: "data",
    DECISION: "decision",
    LOGGER: "logger",
    API: "api",
    TRANSFORM: "transformer"
}

export const NODE_CONFIGS = {
    [NODE_TYPES.INPUT]: {
        title: "Input",
        fields: [
            { label: "Name", type: FIELD_TYPES.TEXT, key: FIELD_VALUES.INPUT_NAME },
            {
                label: "Type", type: FIELD_TYPES.SELECT, key: FIELD_VALUES.INPUT_TYPE, options: [
                    { key: 1, value: "Text", name: "Text" },
                    { key: 2, value: "File", name: "File" }
                ],
            },
        ],
        handles: [
            { id: "value", type: "source", position: "Right" }],
        defaultFieldsValue: {
            prev: "customInput-",
            curr: "input_"
        }
    },
    [NODE_TYPES.OUTPUT]: {
        title: "Output",
        fields: [
            { label: "Name", type: FIELD_TYPES.TEXT, key: FIELD_VALUES.INPUT_NAME },
            {
                label: "Type", type: FIELD_TYPES.SELECT, key: FIELD_VALUES.INPUT_TYPE, options: [
                    { key: 1, value: "Text", name: "Text" },
                    { key: 2, value: "File", name: "Image" }
                ],
            },
        ],
        handles: [
            { id: "value", type: "target", position: "Left" }],
        defaultFieldsValue: {
            prev: "customOutput-",
            curr: "output_"
        }
    },
    [NODE_TYPES.TEXT_NODES]: {
        title: "Text",
        fields: [
            { label: "Text", type: FIELD_TYPES.TEXT, key: FIELD_VALUES.TEXT }
        ],
        handles: [
            { id: "output", type: "source", position: "Right" }],
    },
    [NODE_TYPES.LLM_NODES]: {
        title: "LLM",
        fields: [
            { label: "This is a LLM" }
        ],
        handles: [
            { id: "system", type: "target", position: "Left", className: "handle_top" },
            { id: "prompt", type: "target", position: "Left", className: "handle_below" },
            { id: "response", type: "source", position: "Right" },
        ]
    },
    [NODE_TYPES.DATA]: {
        title: "Data Source",
        fields: [
            { label: "URL", type: FIELD_TYPES.TEXT, key: FIELD_VALUES.URL },
            {
                label: "Format",
                type: FIELD_TYPES.SELECT,
                key: FIELD_VALUES.FORMAT,
                options: [
                    { value: "json", name: "JSON" },
                    { value: "csv", name: "CSV" }
                ]
            }
        ],
        handles: [
            { id: "output", type: "source", position: "Right" }
        ]
    },

    [NODE_TYPES.DECISION]: {
        title: "Decision",
        fields: [
            { label: "Condition", type: FIELD_TYPES.TEXT, key: FIELD_VALUES.CONDITION }
        ],
        handles: [
            { id: "yes", type: "source", position: "Top" },
            { id: "no", type: "source", position: "Bottom" },
            { id: "input", type: "target", position: "Left" }
        ]
    },

    [NODE_TYPES.LOGGER]: {
        title: "Logger",
        fields: [
            {
                label: "Log Level",
                type: FIELD_TYPES.SELECT,
                key: FIELD_VALUES.LEVEL,
                options: [
                    { value: "info", name: "Info" },
                    { value: "warn", name: "Warning" },
                    { value: "error", name: "Error" }
                ]
            }
        ],
        handles: [
            { id: "input", type: "target", position: "Left" },
            { id: "output", type: "source", position: "Right" }
        ]
    },

    [NODE_TYPES.API]: {
        title: "API Call",
        fields: [
            { label: "Endpoint", type: FIELD_TYPES.TEXT, key: FIELD_VALUES.ENDPOINT },
            {
                label: "Method",
                type: FIELD_TYPES.SELECT,
                key: FIELD_VALUES.METHOD,
                options: [
                    { value: "GET", name: "GET" },
                    { value: "POST", name: "POST" }
                ]
            }
        ],
        handles: [
            { id: "input", type: "target", position: "Left" },
            { id: "response", type: "source", position: "Right" }
        ]
    },

    [NODE_TYPES.TRANSFORM]: {
        title: "Transformer",
        fields: [
            { label: "Expression", type: FIELD_TYPES.TEXT, key: FIELD_VALUES.EXPRESSION }
        ],
        handles: [
            { id: "input", type: "target", position: "Left" },
            { id: "output", type: "source", position: "Right" }
        ]
    }
}