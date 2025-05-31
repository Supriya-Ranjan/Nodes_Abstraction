export const FIELD_TYPES = {
    TEXT: "text",
    SELECT: "select"
}
export const FIELD_VALUES = {
    INPUT_NAME: "inputName",
    INPUT_TYPE: "inputType",
    TEXT: "text"
}

export const NODE_TYPES = {
    INPUT: "customInput",
    OUTPUT: "customOutput",
    LLM_NODES: "llm",
    TEXT_NODES: "text"
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
        handle: [
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
        handle: [
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
        handle: [
            { id: "output", type: "source", position: "Right" }],
    },
    [NODE_TYPES.LLM_NODES]: {
        title: "LLM",
        fields: [
            { label: "This is a LLM" }
        ],
        handle: [
            { id: "system", type: "target", position: "Left", className: "handle_top" },
            { id: "prompt", type: "target", position: "Left", className: "handle_below" },
            { id: "response", type: "source", position: "Right" },
        ]
    }
}